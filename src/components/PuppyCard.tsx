import Image from "next/image";
import Link from "next/link";
import { Puppy, statusLabels } from "@/lib/puppies";

const statusStyles: Record<Puppy["status"], string> = {
  available: "bg-moss text-cream",
  reserved: "bg-caramel text-cocoa",
  adopted: "bg-clay text-cocoa",
  upcoming: "bg-terracotta text-cream",
};

export default function PuppyCard({ puppy }: { puppy: Puppy }) {
  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group flex flex-col overflow-hidden rounded-soft bg-white shadow-warm transition hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={puppy.image}
          alt={puppy.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[puppy.status]}`}
        >
          {statusLabels[puppy.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl text-cocoa">{puppy.name}</h3>
          <span className="text-sm text-bark/70">{puppy.sex}</span>
        </div>
        <p className="mt-1 text-sm text-bark/70">
          {puppy.color} · {puppy.size}
        </p>
        <p className="prose-warm mt-3 line-clamp-2 flex-1 text-sm">{puppy.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-bark">
            {puppy.status === "available" ? `From $${puppy.price.toLocaleString()}` : statusLabels[puppy.status]}
          </span>
          <span className="text-sm font-semibold text-caramel transition group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
