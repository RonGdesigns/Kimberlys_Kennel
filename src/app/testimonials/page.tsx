import Link from "next/link";
import { testimonials } from "@/lib/content";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">Happy families</p>
          <h1 className="heading-1 mt-4">Their happily ever after</h1>
          <p className="prose-warm mt-4 max-w-2xl text-lg">
            Nothing makes us happier than hearing from the families who&apos;ve welcomed one of our puppies home.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-soft bg-white p-8 shadow-warm">
                <blockquote className="prose-warm flex-1 text-lg italic">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-clay/40 pt-4">
                  <p className="font-semibold text-cocoa">{t.name}</p>
                  <p className="text-sm text-bark/70">
                    {t.location} · {t.puppy}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 rounded-soft bg-cocoa p-10 text-center">
            <h2 className="font-serif text-2xl text-cream sm:text-3xl">
              Adopted from us? We&apos;d love to hear your story.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/80">
              Share a photo and a few words about life with your labradoodle — we may feature it here.
            </p>
            <Link href="/contact" className="btn-primary mt-6 bg-cream text-cocoa hover:bg-sand">
              Share your story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
