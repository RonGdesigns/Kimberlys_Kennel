import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="heading-1 mt-4">This pup wandered off.</h1>
        <p className="prose-warm mx-auto mt-4 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/puppies" className="btn-secondary">
            Browse puppies
          </Link>
        </div>
      </div>
    </section>
  );
}
