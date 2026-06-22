import Image from "next/image";
import Link from "next/link";
import { values } from "@/lib/content";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">Our story</p>
          <h1 className="heading-1 mt-4 max-w-3xl">
            A home where every labradoodle begins life loved.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-soft shadow-warm">
            <Image
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80"
              alt="A labradoodle resting at home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="heading-2">Built on health, heart, and the right match</h2>
            <p className="prose-warm mt-6">
              At Kimberly Labradoodle Kennel, raising puppies isn&apos;t just what we do — it&apos;s who we are.
              Our labradoodles grow up in a warm family setting, surrounded by gentle handling, early
              socialization, and the everyday sounds of a loving home.
            </p>
            <p className="prose-warm mt-4">
              We believe a healthy, well-adjusted puppy starts long before adoption day. From careful health
              checks to thoughtful early care, every detail is designed to give our puppies the strongest
              possible start — and to help them settle quickly into your family.
            </p>
            <p className="prose-warm mt-4">
              Above all, we care about the match. We take the time to understand each family so that every
              puppy finds a home where they&apos;ll truly thrive — their own happily ever after.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-sand/50">
        <div className="container-page">
          <h2 className="heading-2 max-w-xl">What we stand for</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-soft bg-white p-8 shadow-warm">
                <h3 className="font-serif text-xl text-cocoa">{v.title}</h3>
                <p className="prose-warm mt-3">{v.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/puppies" className="btn-primary">
              Meet our available puppies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
