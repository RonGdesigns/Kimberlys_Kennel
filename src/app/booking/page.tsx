import InquiryForm from "@/components/InquiryForm";

export const metadata = { title: "Booking" };

export default function BookingPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">Come say hello</p>
          <h1 className="heading-1 mt-4">Book a visit or consultation</h1>
          <p className="prose-warm mt-4 max-w-2xl text-lg">
            Meeting a puppy in person (or over video) is the best way to find your match. Pick a time that
            works for you and we&apos;ll confirm the details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-soft bg-white p-8 shadow-warm sm:p-10">
            <h2 className="heading-2">Request a booking</h2>
            <p className="prose-warm mt-3">
              Share your preferred date and visit type below. We&apos;ll reply to confirm your appointment.
            </p>
            <div className="mt-8">
              <InquiryForm variant="booking" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-soft bg-sand/60 p-7">
              <h3 className="font-serif text-xl text-cocoa">What to expect</h3>
              <ul className="prose-warm mt-4 space-y-3 text-sm">
                <li>· A relaxed visit to meet available puppies</li>
                <li>· Time to ask questions about care and temperament</li>
                <li>· Guidance on the adoption process and next steps</li>
              </ul>
            </div>
            <div className="rounded-soft border border-clay/50 p-7">
              <h3 className="font-serif text-xl text-cocoa">Can&apos;t make it in person?</h3>
              <p className="prose-warm mt-3 text-sm">
                We&apos;re happy to arrange a video call so you can meet your puppy from anywhere. Just choose
                &ldquo;Video call&rdquo; when you request a booking.
              </p>
            </div>
            {/* Phase 2: connect a real scheduling backend (Cal.com / Calendly / custom availability)
                so visitors can pick from live open slots instead of requesting a date. */}
          </aside>
        </div>
      </section>
    </>
  );
}
