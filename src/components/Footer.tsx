import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-clay/40 bg-sand/60">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="font-serif text-xl text-cocoa">{site.name}</p>
          <p className="prose-warm mt-3 max-w-sm">{site.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bark">Explore</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cocoa/70 transition hover:text-bark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bark">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm text-cocoa/70">
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-bark">
                {site.email}
              </a>
            </li>
            {site.phone && <li>{site.phone}</li>}
            {site.location && <li>{site.location}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-clay/40">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-cocoa/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Website by Iron Digital</p>
        </div>
      </div>
    </footer>
  );
}
