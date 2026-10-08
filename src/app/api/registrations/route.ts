import { validateRegistration } from "@/lib/registration";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "This registration request is not allowed." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Send a valid registration." }, { status: 415 });
  }
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 8192) return Response.json({ error: "Registration is too large." }, { status: 413 });
    input = JSON.parse(body);
  } catch {
    return Response.json({ error: "Send a valid registration." }, { status: 400 });
  }
  const { data, errors } = validateRegistration(input);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please check the highlighted fields.", fields: errors }, { status: 400 });
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return Response.json({ error: "Registration is temporarily unavailable. Please try again later." }, { status: 503 });
  }
  try {
    const endpoint = new URL("/rest/v1/supporter_registrations", url);
    endpoint.searchParams.set("on_conflict", "id");
    endpoint.searchParams.set("select", "id");
    const saved = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      body: JSON.stringify({
        id: data.submissionId, surname: data.surname, first_name: data.firstName,
        email: data.email || null, phone: data.phone, address: data.address || null,
        local_government: data.localGovernment, consent_version: "2026-10-08",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!saved.ok) throw new Error("Storage rejected registration");
    let rows = await saved.json();
    // A retry with the same ID must confirm the earlier durable record.
    if (Array.isArray(rows) && rows.length === 0) {
      endpoint.searchParams.delete("on_conflict");
      endpoint.searchParams.set("id", `eq.${data.submissionId}`);
      const previous = await fetch(endpoint, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store", signal: AbortSignal.timeout(10000),
      });
      if (!previous.ok) throw new Error("Could not confirm registration");
      rows = await previous.json();
    }
    if (!Array.isArray(rows) || rows[0]?.id !== data.submissionId) throw new Error("Missing storage receipt");
    return Response.json({ id: data.submissionId }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not save your registration. Please try again." }, { status: 502 });
  }
}
