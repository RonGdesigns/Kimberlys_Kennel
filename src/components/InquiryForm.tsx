"use client";

import { useState } from "react";

interface InquiryFormProps {
  // When set, the form is acting as a reservation request for a specific puppy.
  puppyName?: string;
  // Heading + intro can be customized per placement.
  variant?: "inquiry" | "booking";
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function InquiryForm({ puppyName, variant = "inquiry" }: InquiryFormProps) {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, puppyName, type: variant }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-soft bg-moss/10 p-8 text-center">
        <h3 className="heading-2 text-moss">Thank you!</h3>
        <p className="prose-warm mt-3">
          We&apos;ve received your {variant === "booking" ? "booking request" : "inquiry"} and will be in touch
          very soon. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {puppyName && (
        <p className="rounded-lg bg-sand px-4 py-3 text-sm text-bark">
          You&apos;re inquiring about <strong>{puppyName}</strong>.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name" name="lastName" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      {variant === "booking" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date" name="date" type="date" />
          <div className="flex flex-col gap-2">
            <label htmlFor="visitType" className="text-sm font-medium text-bark">
              Visit type
            </label>
            <select
              id="visitType"
              name="visitType"
              className="rounded-lg border border-clay bg-white px-4 py-3 text-cocoa focus:border-caramel focus:outline-none"
            >
              <option>In-person visit</option>
              <option>Video call</option>
              <option>Phone consultation</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-bark">
          Tell us about your home
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Your family, lifestyle, and what you're looking for in a puppy…"
          className="rounded-lg border border-clay bg-white px-4 py-3 text-cocoa focus:border-caramel focus:outline-none"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-terracotta">
          Something went wrong. Please try again, or email us directly.
        </p>
      )}

      <button type="submit" className="btn-primary w-fit" disabled={state === "submitting"}>
        {state === "submitting"
          ? "Sending…"
          : variant === "booking"
            ? "Request booking"
            : "Submit inquiry"}
      </button>

      <p className="text-xs text-cocoa/60">
        {/* Payment step is intentionally deferred until the adoption model is confirmed with the client.
            When ready, a Stripe deposit/checkout step can be added here for reservations. */}
        We&apos;ll review your inquiry and reach out about next steps and availability.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-bark">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-clay bg-white px-4 py-3 text-cocoa focus:border-caramel focus:outline-none"
      />
    </div>
  );
}
