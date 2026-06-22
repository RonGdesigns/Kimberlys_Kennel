import { NextResponse } from "next/server";

// Receives adoption inquiries and booking requests from the site forms.
//
// Phase 1: validates and logs the submission. To go live, wire this to an email
// provider (e.g. Resend) and/or store leads in a CRM/database. The payload shape
// is stable, so adding delivery later won't change the front end.
//
// When the adoption model is confirmed, a reservation path can create a Stripe
// Checkout/Payment Intent here before confirming the lead.

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.email || !data?.firstName) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // TODO(iron-digital): send notification email to the kennel + store the lead.
    console.log("New inquiry:", {
      type: data.type,
      name: `${data.firstName} ${data.lastName ?? ""}`.trim(),
      email: data.email,
      puppy: data.puppyName ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
