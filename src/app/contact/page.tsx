import InquiryForm from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">We&apos;d love to hear from you</p>
          <h1 className="heading-1 mt-4">Get in touch</h1>
          <p className="prose-warm mt-4 max-w-2xl text-lg">
            Questions about a puppy, our process, or upcoming litters? Send us a message and we&apos;ll get
            back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-soft bg-white p-7 shadow-warm">
              <h2 className="font-serif text-xl text-cocoa">Email</h2>
              <a
                href={`mailto:${site.email}`}
                className="prose-warm mt-2 inline-block font-medium text-bark hover:underline"
              >
                {site.email}
              </a>
            </div>
            {site.phone && (
              <div className="rounded-soft bg-white p-7 shadow-warm">
                <h2 className="font-serif text-xl text-cocoa">Phone</h2>
                <p className="prose-warm mt-2">{site.phone}</p>
              </div>
            )}
            <div className="rounded-soft bg-sand/60 p-7">
              <h2 className="font-serif text-xl text-cocoa">Response time</h2>
              <p className="prose-warm mt-2 text-sm">
                We typically reply within 1–2 business days. For the fastest match, let us know what
                you&apos;re looking for in your message.
              </p>
            </div>
          </div>

          <div className="rounded-soft bg-white p-8 shadow-warm sm:p-10">
            <h2 className="heading-2">Send a message</h2>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
