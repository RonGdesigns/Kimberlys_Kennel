import Image from "next/image";
import Link from "next/link";
import PuppyCard from "@/components/PuppyCard";
import { getPuppies } from "@/lib/data";
import { values, adoptionSteps } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const puppies = await getPuppies();
  const featured = puppies.filter((p) => p.status === "available").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand">
        <div className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Family-raised labradoodles</p>
            <h1 className="heading-1 mt-4">
              Healthy, happy puppies — ready for their happily ever after.
            </h1>
            <p className="prose-warm mt-6 max-w-lg text-lg">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/puppies" className="btn-primary">
                Meet our puppies
              </Link>
              <Link href="/adoption-process" className="btn-secondary">
                How adoption works
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-soft shadow-warm">
            <Image
              src="https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=1400&q=80"
              alt="A happy labradoodle puppy"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Why families choose us</p>
            <h2 className="heading-2 mt-3">Raised with love, matched with care</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-soft bg-white p-8 shadow-warm">
                <h3 className="font-serif text-xl text-cocoa">{v.title}</h3>
                <p className="prose-warm mt-3">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured puppies */}
      <section className="section bg-sand/50">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Available now</p>
              <h2 className="heading-2 mt-3">Featured puppies</h2>
            </div>
            <Link href="/puppies" className="hidden text-sm font-semibold text-bark hover:underline sm:block">
              View all puppies →
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((puppy) => (
              <PuppyCard key={puppy.slug} puppy={puppy} />
            ))}
          </div>
          <div className="mt-10 sm:hidden">
            <Link href="/puppies" className="btn-secondary">
              View all puppies
            </Link>
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Simple & supportive</p>
            <h2 className="heading-2 mt-3">The adoption journey</h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {adoptionSteps.map((step, i) => (
              <li key={step.title} className="relative rounded-soft border border-clay/50 p-7">
                <span className="font-serif text-3xl text-caramel">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-lg text-cocoa">{step.title}</h3>
                <p className="prose-warm mt-2 text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cocoa">
        <div className="container-page text-center">
          <h2 className="font-serif text-3xl text-cream sm:text-4xl">
            Ready to find your new best friend?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">
            Browse our available puppies or book a visit — we&apos;d love to help you find the perfect match.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/puppies" className="btn-primary bg-cream text-cocoa hover:bg-sand">
              Browse puppies
            </Link>
            <Link href="/booking" className="btn-secondary border-cream text-cream hover:bg-cream hover:text-cocoa">
              Book a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
