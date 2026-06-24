import { NextResponse } from "next/server";
import { getBlobToken } from "@/lib/blob";

// Secret-guarded diagnostics: reports whether the key services are wired in,
// without exposing any secret values. Visit:
//   https://<your-site>/api/diag?secret=<SEED_SECRET>
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUri =
    process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  const dbKind = /^postg(res|resql):\/\//.test(dbUri) ? "postgres" : dbUri ? "sqlite/other" : "none";

  // Names only — never values — so we can see what the blob/storage env vars
  // are actually called in this environment.
  const blobEnvKeys = Object.keys(process.env).filter((k) =>
    /BLOB|READ_WRITE|TOKEN/i.test(k),
  );

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV ?? null,
    hasPayloadSecret: !!process.env.PAYLOAD_SECRET,
    hasSeedSecret: !!process.env.SEED_SECRET,
    database: dbKind,
    hasBlobToken: !!getBlobToken(),
    blobEnvKeys,
  });
}
