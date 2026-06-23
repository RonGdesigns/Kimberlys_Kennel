import { NextResponse } from "next/server";
import { runSeed } from "@/lib/seed";

// One-time seeding endpoint, guarded by SEED_SECRET. Safe to call repeatedly —
// it skips creating records that already exist. Supports GET (so you can just
// visit the URL from a phone browser) and POST.
//
//   https://<your-site>/api/seed?secret=<SEED_SECRET>
//
// Remove this route (or leave it; it's a no-op once seeded) after going live.
async function handle(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSeed();
    return NextResponse.json(result);
  } catch (err) {
    console.error("Seed failed:", err);
    return NextResponse.json({ error: "Seed failed", detail: String(err) }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
