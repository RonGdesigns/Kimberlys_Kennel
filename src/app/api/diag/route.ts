import { NextResponse } from "next/server";

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

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV ?? null,
    hasPayloadSecret: !!process.env.PAYLOAD_SECRET,
    hasSeedSecret: !!process.env.SEED_SECRET,
    database: dbKind,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
  });
}
