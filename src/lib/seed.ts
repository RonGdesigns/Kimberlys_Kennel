import { getPayload } from "payload";
import config from "@payload-config";
import sharp from "sharp";
import { puppies as seedPuppies } from "./puppies";

// Seeds an admin user + starter puppies so the site has content out of the box.
// Triggered (once) via POST /api/seed. Placeholder photos are generated locally
// with sharp — no network needed. Kimberly replaces them by uploading real photos
// in the admin panel.

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "kimberlylabradoodlekennel@gmail.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

const palette = ["#C9A26A", "#C2734A", "#8A9A6B", "#7A5C3E", "#D9C3A9"];

async function placeholder(name: string, i: number): Promise<Buffer> {
  const bg = palette[i % palette.length];
  const svg = `
    <svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="900" fill="${bg}"/>
      <text x="600" y="470" font-family="Georgia, serif" font-size="90"
            fill="#FBF7F0" text-anchor="middle">${name}</text>
    </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function runSeed() {
  const payload = await getPayload({ config });
  const log: string[] = [];

  // 1. Admin user
  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Kimberly" },
    });
    log.push(`Created admin user: ${ADMIN_EMAIL}`);
  } else {
    log.push("Admin user already exists — skipped.");
  }

  // 2. Puppies
  const existingPuppies = await payload.find({ collection: "puppies", limit: 1 });
  if (existingPuppies.totalDocs > 0) {
    log.push("Puppies already exist — skipped.");
    return { ok: true, log };
  }

  for (let i = 0; i < seedPuppies.length; i++) {
    const p = seedPuppies[i];
    const buffer = await placeholder(p.name, i);

    const media = await payload.create({
      collection: "media",
      data: { alt: `${p.name} the labradoodle` },
      file: {
        data: buffer,
        mimetype: "image/png",
        name: `${p.slug}.png`,
        size: buffer.length,
      },
    });

    await payload.create({
      collection: "puppies",
      data: {
        name: p.name,
        slug: p.slug,
        litter: p.litter,
        sex: p.sex,
        color: p.color,
        size: p.size,
        birthDate: p.birthDate,
        readyDate: p.readyDate,
        status: p.status,
        price: p.price,
        deposit: p.deposit,
        description: p.description,
        photo: media.id,
        traits: p.traits.map((t) => ({ trait: t })),
      },
    });
    log.push(`Seeded puppy: ${p.name}`);
  }

  return { ok: true, log };
}
