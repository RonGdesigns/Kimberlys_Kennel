import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import { getPuppy, puppies, statusLabels } from "@/lib/puppies";

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const puppy = getPuppy(slug);
  if (!puppy) return { title: "Puppy not found" };
  return {
    title: `${puppy.name} — ${puppy.color} ${puppy.size} Labradoodle`,
    description: puppy.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PuppyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const puppy = getPuppy(slug);
  if (!puppy) notFound();

  const canReserve = puppy.status === "available" || puppy.status === "upcoming";

  return (
    <section className="section">
      <div className="container-page">
        <Link href="/puppies" className="text-sm font-semibold text-bark hover:underline">
          ← Back to all puppies
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-soft shadow-warm">
            <Image
              src={puppy.image}
              alt={puppy.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="eyebrow">{puppy.litter}</span>
            <h1 className="heading-1 mt-2">{puppy.name}</h1>
            <p className="mt-2 text-lg text-bark/80">
              {puppy.color} · {puppy.size} · {puppy.sex}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {puppy.traits.map((t) => (
                <span key={t} className="rounded-full bg-sand px-3 py-1 text-sm text-bark">
                  {t}
                </span>
              ))}
            </div>

            <p className="prose-warm mt-6 text-lg">{puppy.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-soft bg-sand/60 p-6 text-sm">
              <div>
                <dt className="font-semibold text-bark">Status</dt>
                <dd className="text-cocoa">{statusLabels[puppy.status]}</dd>
              </div>
              <div>
                <dt className="font-semibold text-bark">Ready to go home</dt>
                <dd className="text-cocoa">{formatDate(puppy.readyDate)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-bark">Born</dt>
                <dd className="text-cocoa">{formatDate(puppy.birthDate)}</dd>
              </div>
              {canReserve && (
                <div>
                  <dt className="font-semibold text-bark">Adoption</dt>
                  <dd className="text-cocoa">From ${puppy.price.toLocaleString()}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Inquiry / reservation */}
        <div className="mt-16 max-w-2xl rounded-soft bg-white p-8 shadow-warm sm:p-10">
          {canReserve ? (
            <>
              <h2 className="heading-2">
                {puppy.status === "upcoming" ? `Join the waitlist for ${puppy.name}` : `Inquire about ${puppy.name}`}
              </h2>
              <p className="prose-warm mt-3">
                Tell us a little about your home and we&apos;ll be in touch about meeting{" "}
                {puppy.name} and next steps.
              </p>
              <div className="mt-8">
                <InquiryForm puppyName={puppy.name} />
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="heading-2">{puppy.name} has found a home 🏡</h2>
              <p className="prose-warm mt-3">
                This sweet pup is already matched. Browse our other puppies or contact us about upcoming
                litters.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/puppies" className="btn-primary">
                  See other puppies
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Ask about litters
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
