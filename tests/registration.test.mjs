import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
function loadModule(path, overrides = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, { exports, module: { exports }, require, Response, Request, URL, AbortSignal, ...overrides });
  return exports;
}
const validation = loadModule("../src/lib/registration.ts");
const valid = {
  submissionId: "b98667b4-ae33-4c18-9bfa-3d73c60a348f", surname: "Test",
  firstName: "Supporter", phone: "0801 234 5678", email: "", address: "",
  localGovernment: "Uyo", consent: true, website: "",
};
function route(fetch, configured = true) {
  return loadModule("../src/app/api/registrations/route.ts", {
    require: (id) => id === "@/lib/registration" ? validation : require(id),
    fetch,
    process: { env: configured ? { SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "test-server-key" } : {} },
  }).POST;
}
function request(body = valid, headers = {}) {
  return new Request("http://localhost:3100/api/registrations", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
test("normalizes names and email and permits optional fields", () => {
  const result = validation.validateRegistration({ ...valid, surname: " Test ", email: "PERSON@EXAMPLE.COM" });
  assert.equal(Object.keys(result.errors).length, 0);
  assert.equal(result.data.surname, "Test");
  assert.equal(result.data.email, "person@example.com");
});
test("requires consent, valid contact details and a known local government", () => {
  const result = validation.validateRegistration({ ...valid, consent: false, phone: "123", email: "bad", localGovernment: "Unknown" });
  assert.deepEqual(Object.keys(result.errors).sort(), ["consent", "email", "localGovernment", "phone"]);
});
test("rejects automated honeypot submissions", () => {
  assert.ok(validation.validateRegistration({ ...valid, website: "spam" }).errors.website);
});
test("rejects foreign origins without calling storage", async () => {
  const response = await route(() => { throw Error("Storage must not run"); })(request(valid, { Origin: "https://another.example" }));
  assert.equal(response.status, 403);
});
test("rejects malformed and oversized requests", async () => {
  const post = route(() => { throw Error("Storage must not run"); });
  assert.equal((await post(request("{"))).status, 400);
  assert.equal((await post(request(" ".repeat(9000)))).status, 413);
});
test("invalid fields return validation errors without storage", async () => {
  const response = await route(() => { throw Error("Storage must not run"); })(request({ ...valid, consent: false }));
  assert.equal(response.status, 400);
  assert.ok((await response.json()).fields.consent);
});
test("unconfigured storage cannot report success", async () => {
  assert.equal((await route(() => {}, false)(request())).status, 503);
});
test("storage rejection and network failures cannot report success", async () => {
  assert.equal((await route(async () => new Response("", { status: 500 }))(request())).status, 502);
  assert.equal((await route(async () => { throw Error("offline"); })(request())).status, 502);
});
test("success requires a matching saved ID and excludes honeypot data", async () => {
  let saved;
  const response = await route(async (_url, options) => {
    saved = JSON.parse(options.body);
    return Response.json([{ id: valid.submissionId }]);
  })(request());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).id, valid.submissionId);
  assert.equal(saved.first_name, "Supporter");
  assert.equal(saved.consent_version, "2026-10-08");
  assert.equal("website" in saved, false);
});
test("retry confirms the earlier record without adding a duplicate", async () => {
  let calls = 0;
  const response = await route(async (_url, options) => {
    calls++;
    if (calls === 1) {
      assert.ok(options.headers.Prefer.includes("ignore-duplicates"));
      return Response.json([]);
    }
    assert.equal(options.method, undefined);
    return Response.json([{ id: valid.submissionId }]);
  })(request());
  assert.equal(calls, 2);
  assert.equal(response.status, 201);
});
test("missing or mismatched receipts cannot report success", async () => {
  assert.equal((await route(async () => Response.json([{ id: "wrong" }]))(request())).status, 502);
});
