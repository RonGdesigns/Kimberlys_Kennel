import { getPayload } from "payload";
import config from "@payload-config";
import type { Puppy } from "./puppies";

// Reads puppies from Payload (the admin-managed source of truth) and maps them
// into the `Puppy` view model the UI components already use. The static array in
// puppies.ts is kept only as seed data.

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  sizes?: Record<string, { url?: string | null } | undefined>;
};

type PuppyDoc = {
  name: string;
  slug: string;
  sex: Puppy["sex"];
  color: string;
  size: Puppy["size"];
  litter?: string | null;
  birthDate?: string | null;
  readyDate?: string | null;
  status: Puppy["status"];
  price: number;
  deposit?: number | null;
  description: string;
  photo?: MediaLike | string | null;
  traits?: { trait?: string | null }[] | null;
};

function photoUrl(photo: PuppyDoc["photo"]): string {
  if (!photo || typeof photo === "string") return "/media/placeholder.png";
  return photo.sizes?.card?.url || photo.sizes?.feature?.url || photo.url || "/media/placeholder.png";
}

function mapPuppy(doc: PuppyDoc): Puppy {
  return {
    slug: doc.slug,
    name: doc.name,
    litter: doc.litter ?? "",
    sex: doc.sex,
    color: doc.color,
    size: doc.size,
    birthDate: doc.birthDate ?? "",
    readyDate: doc.readyDate ?? "",
    status: doc.status,
    price: doc.price,
    deposit: doc.deposit ?? 0,
    image: photoUrl(doc.photo),
    description: doc.description,
    traits: (doc.traits ?? []).map((t) => t.trait ?? "").filter(Boolean),
  };
}

export async function getPuppies(): Promise<Puppy[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "puppies",
    depth: 1,
    limit: 100,
    sort: "name",
  });
  return (docs as unknown as PuppyDoc[]).map(mapPuppy);
}

export async function getPuppyBySlug(slug: string): Promise<Puppy | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "puppies",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  if (!docs.length) return null;
  return mapPuppy(docs[0] as unknown as PuppyDoc);
}
