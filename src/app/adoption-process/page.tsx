import Link from "next/link";
import { adoptionSteps } from "@/lib/content";

export const metadata = { title: "Adoption Process" };

export default function AdoptionProcessPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">Simple & supportive</p>
          <h1 className="heading-1 mt-4">How adoption works</h1>
          <p className="prose-warm mt-4 max-w-2xl text-lg">
            We&apos;ve made adopting a puppy warm, clear, and stress-free. Here&apos;s what to expect from your
            first inquiry to bringing your new family member home.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <ol className="space-y-8">
            {adoptionSteps.map((step, i) => (
              <li key={step.title} className="flex gap-6 rounded-soft bg-white p-7 shadow-warm sm:p-9">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-caramel font-serif text-2xl text-cocoa">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-cocoa">{step.title}</h2>
                  <p className="prose-warm mt-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-soft bg-sand/60 p-8">
            <h2 className="font-serif text-xl text-cocoa">A note on reservations</h2>
            <p className="prose-warm mt-3 max-w-2xl">
              The exact reservation details — including any deposit — will be confirmed with you directly so
              everything feels transparent and comfortable. Our goal is always the right match, not a rushed
              decision.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/puppies" className="btn-primary">
              Browse available puppies
            </Link>
            <Link href="/booking" className="btn-secondary">
              Book a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
