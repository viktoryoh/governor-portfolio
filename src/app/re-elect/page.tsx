"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { localGovernments, validateRegistration, type FieldErrors } from "@/lib/registration";

export default function ReElectPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "confirmed">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (status !== "confirmed" || !dialog) return;
    dialog.showModal();
    router.prefetch("/movement");
    successRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [status, router]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { errors: validation } = validateRegistration({
      ...Object.fromEntries(form), submissionId: crypto.randomUUID(), consent: form.get("consent") === "on",
    });
    setErrors(validation);
    if (Object.keys(validation).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    // Frontend confirmation only until registration storage is connected.
    setStatus("confirmed");
  };
  const fieldError = (name: keyof FieldErrors) => errors[name] && <span id={`${name}-error`} className="mt-2 block text-sm text-[#b42318]">{errors[name]}</span>;

  return (
    <main className="bg-[#f8faf8] pt-20">
      <Navbar />
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[320px] overflow-hidden bg-[#0B6B3A] px-5 pb-8 pt-16 sm:px-8 lg:min-h-[900px] lg:px-12">
          <Image src="/images/projects/umoeno6.jpg" alt="Governor Umo Eno" fill sizes="(min-width: 1024px) 45vw, 100vw" loading="eager" className="object-cover object-top" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(6,20,13,0.88)_100%)]" />
          <div className="relative flex h-full min-h-[240px] flex-col justify-end text-white">
            <p className="mb-4 text-sm font-bold">Governor Umo Eno</p>
            <h1 className="text-[40px] font-black leading-[1.05] sm:text-5xl">Re-Elect 2027</h1>
            <p className="mt-5 max-w-[360px] text-base leading-7 text-white/85">Register your support for continued progress and development.</p>
          </div>
        </div>
        <section aria-labelledby="register-heading" className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
            <h2 id="register-heading" className="mb-2 text-2xl font-bold text-[#0B6B3A]">Join the Movement</h2>
            <p className="mb-8 text-sm text-slate-600">Fields marked * are required.</p>
            <form ref={formRef} onSubmit={submit} noValidate className="grid min-w-0 gap-5 sm:grid-cols-2">
              <fieldset className="contents">
                <label className="block min-w-0 text-sm font-semibold text-slate-700">Surname *
                  <input name="surname" autoComplete="family-name" required maxLength={80} aria-invalid={!!errors.surname} aria-describedby={errors.surname ? "surname-error" : undefined} className="registration-field mt-2" />{fieldError("surname")}
                </label>
                <label className="block min-w-0 text-sm font-semibold text-slate-700">First name *
                  <input name="firstName" autoComplete="given-name" required maxLength={80} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} className="registration-field mt-2" />{fieldError("firstName")}
                </label>
                <label className="block min-w-0 text-sm font-semibold text-slate-700">Phone number *
                  <input name="phone" type="tel" autoComplete="tel" required maxLength={24} placeholder="0801 234 5678" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className="registration-field mt-2" />{fieldError("phone")}
                </label>
                <label className="block min-w-0 text-sm font-semibold text-slate-700">Email <span className="font-normal text-slate-500">(optional)</span>
                  <input name="email" type="email" autoComplete="email" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className="registration-field mt-2" />{fieldError("email")}
                </label>
                <label className="block min-w-0 text-sm font-semibold text-slate-700 sm:col-span-2">Local government area *
                  <span className="relative mt-2 block">
                    <select name="localGovernment" required defaultValue="" aria-invalid={!!errors.localGovernment} aria-describedby={errors.localGovernment ? "localGovernment-error" : undefined} className="registration-field appearance-none pr-12">
                      <option value="">Select local government</option>
                      {localGovernments.map((lga) => <option key={lga} value={lga}>{lga}</option>)}
                    </select>
                    <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-4 top-4 text-slate-500" />
                  </span>{fieldError("localGovernment")}
                </label>
                <label className="block min-w-0 text-sm font-semibold text-slate-700 sm:col-span-2">House address <span className="font-normal text-slate-500">(optional)</span>
                  <textarea name="address" autoComplete="street-address" maxLength={500} rows={3} aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} className="registration-field mt-2 resize-y" />{fieldError("address")}
                </label>
                <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <details className="border-y border-slate-200 py-4 text-sm text-slate-600 sm:col-span-2">
                  <summary className="cursor-pointer font-semibold text-[#0B6B3A]">Privacy note</summary>
                  <p className="mt-3 leading-6">Registration is voluntary. Your details are not sent or stored at this stage. Email and house address are optional. Do not include identity numbers or financial information.</p>
                </details>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                    <input name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-1 h-4 w-4 shrink-0 accent-[#038347]" />
                    <span>I confirm my support for the movement and have read the privacy note. *</span>
                  </label>{fieldError("consent")}
                </div>
              </fieldset>
              {errors.submissionId && <p role="alert" className="text-sm text-[#b42318] sm:col-span-2">{errors.submissionId}</p>}
              <button ref={submitRef} type="submit" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-[#0B6B3A] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#09552e] sm:col-span-2">
                Register Support<ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </form>
        </section>
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby="thank-you-heading"
        aria-describedby="thank-you-message"
        onClose={() => { setStatus("idle"); submitRef.current?.focus(); }}
        className="m-auto max-h-[calc(100svh-32px)] w-[calc(100%-32px)] max-w-[500px] overflow-y-auto rounded-3xl border-[20px] border-[#038347] bg-[#06140d] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%,rgba(230,120,23,0.08))] px-6 py-10 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop:bg-black/80 sm:border-[32px] sm:px-8"
      >
        <div className="mx-auto mb-6 flex h-[82px] w-[82px] items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_45px_rgba(3,131,71,0.35)]">
          <Check size={40} strokeWidth={3} className="text-[#e67817]" aria-hidden="true" />
        </div>
        <p className="mb-3 text-xs font-semibold uppercase text-[#e67817]">Support Confirmed</p>
        <h2 id="thank-you-heading" ref={successRef} tabIndex={-1} className="mb-4 text-[32px] font-black text-white sm:text-4xl">Thank You!</h2>
        <p id="thank-you-message" className="mx-auto max-w-[300px] text-sm leading-7 text-white/70">Thank you for your trust and support.</p>
        <button type="button" onClick={() => { dialogRef.current?.close(); router.push("/movement"); }} style={{ fontSize: 14, fontWeight: 900 }} className="mt-8 inline-flex h-[54px] items-center justify-center rounded-full bg-white px-8 text-sm font-black uppercase text-[#038347] shadow-[0_18px_40px_rgba(255,255,255,0.12)] transition-[transform,background-color,color] duration-200 hover:scale-[1.04] hover:bg-[#e67817] hover:text-white active:scale-95">Close</button>
      </dialog>
    </main>
  );
}
