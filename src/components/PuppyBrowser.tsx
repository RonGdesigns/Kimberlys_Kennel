"use client";

import { useMemo, useState } from "react";
import PuppyCard from "@/components/PuppyCard";
import { Puppy, PuppyStatus, statusLabels } from "@/lib/puppies";

const statusFilters: { value: PuppyStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: statusLabels.available },
  { value: "upcoming", label: statusLabels.upcoming },
  { value: "reserved", label: statusLabels.reserved },
];

export default function PuppyBrowser({ puppies }: { puppies: Puppy[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PuppyStatus | "all">("all");
  const [size, setSize] = useState<string>("all");

  const sizes = useMemo(
    () => ["all", ...Array.from(new Set(puppies.map((p) => p.size)))],
    [puppies],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return puppies.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.color, p.size, p.litter, ...p.traits]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus = status === "all" || p.status === status;
      const matchesSize = size === "all" || p.size === size;
      return matchesQuery && matchesStatus && matchesSize;
    });
  }, [puppies, query, status, size]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-soft bg-white p-5 shadow-warm sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search puppies</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, color, or trait…"
            className="w-full rounded-full border border-clay bg-cream px-5 py-3 text-cocoa focus:border-caramel focus:outline-none"
          />
        </label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="rounded-full border border-clay bg-cream px-5 py-3 text-cocoa focus:border-caramel focus:outline-none"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All sizes" : s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setStatus(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              status === f.value
                ? "bg-bark text-cream"
                : "bg-sand text-bark hover:bg-clay"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((puppy) => (
            <PuppyCard key={puppy.slug} puppy={puppy} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-soft bg-sand p-10 text-center text-bark">
          No puppies match your search right now. Try adjusting your filters, or{" "}
          <a href="/contact" className="font-semibold underline">
            contact us
          </a>{" "}
          about upcoming litters.
        </p>
      )}
    </div>
  );
}
