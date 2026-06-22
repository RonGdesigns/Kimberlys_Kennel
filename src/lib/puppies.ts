// Puppy catalog. In Phase 2 this can be sourced from a headless CMS (e.g. Sanity)
// so Kimberly can add/edit puppies herself. The shape below is intentionally
// "reservation-ready": it carries price/deposit/status fields so we can switch on
// inquiry-only, deposit, or full checkout once the adoption model is confirmed.

export type PuppyStatus = "available" | "reserved" | "adopted" | "upcoming";

export interface Puppy {
  slug: string;
  name: string;
  litter: string;
  sex: "Male" | "Female";
  color: string;
  size: "Mini" | "Medium" | "Standard";
  birthDate: string; // ISO date
  readyDate: string; // ISO date — when they can go home
  status: PuppyStatus;
  price: number; // full adoption price in USD
  deposit: number; // refundable reservation deposit in USD
  image: string;
  description: string;
  traits: string[];
}

export const puppies: Puppy[] = [
  {
    slug: "hazel",
    name: "Hazel",
    litter: "Autumn Litter",
    sex: "Female",
    color: "Caramel",
    size: "Medium",
    birthDate: "2026-04-02",
    readyDate: "2026-05-28",
    status: "available",
    price: 2800,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hazel is a gentle, people-loving girl with a soft wavy coat. She's the first to greet visitors and loves a warm lap after a play session.",
    traits: ["Calm", "Affectionate", "Great with kids"],
  },
  {
    slug: "biscuit",
    name: "Biscuit",
    litter: "Autumn Litter",
    sex: "Male",
    color: "Cream",
    size: "Mini",
    birthDate: "2026-04-02",
    readyDate: "2026-05-28",
    status: "available",
    price: 3000,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Biscuit is a curious, playful little explorer. He's confident, smart, and quick to learn — a wonderful fit for an active household.",
    traits: ["Playful", "Smart", "Sociable"],
  },
  {
    slug: "willow",
    name: "Willow",
    litter: "Autumn Litter",
    sex: "Female",
    color: "Chocolate",
    size: "Standard",
    birthDate: "2026-04-02",
    readyDate: "2026-05-28",
    status: "reserved",
    price: 2800,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=1200&q=80",
    description:
      "Willow is a sweet, easygoing girl with a rich chocolate coat. She has already found her family — but her littermates are waiting to meet you!",
    traits: ["Gentle", "Easygoing", "Loyal"],
  },
  {
    slug: "maple",
    name: "Maple",
    litter: "Winter Litter",
    sex: "Female",
    color: "Apricot",
    size: "Medium",
    birthDate: "2026-06-10",
    readyDate: "2026-08-05",
    status: "upcoming",
    price: 2900,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Maple is part of our upcoming Winter Litter. Join the waitlist to be among the first families notified when she's ready to reserve.",
    traits: ["Coming soon", "Waitlist open"],
  },
];

export function getPuppy(slug: string): Puppy | undefined {
  return puppies.find((p) => p.slug === slug);
}

export const statusLabels: Record<PuppyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  adopted: "Adopted",
  upcoming: "Coming soon",
};
