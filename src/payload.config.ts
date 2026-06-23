import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Puppies } from "./collections/Puppies";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = process.env.DATABASE_URI || "file:./kennel.db";
const usePostgres = /^postg(res|resql):\/\//.test(databaseUri);

// Database: Postgres in production (e.g. Neon on Vercel), SQLite for local dev.
const db = usePostgres
  ? // `push: true` auto-syncs the schema on connect, so no separate migration
    // step is needed to deploy. For a hardened production setup, switch to
    // committed migrations (payload migrate) and remove push.
    postgresAdapter({ pool: { connectionString: databaseUri }, push: true })
  : sqliteAdapter({ client: { url: databaseUri } });

// Photo storage: Vercel Blob when a token is present (serverless hosting),
// otherwise local disk under /public/media for local dev.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const plugins = blobToken
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: blobToken,
      }),
    ]
  : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Kimberly Labradoodle Kennel",
    },
  },
  collections: [Puppies, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
  plugins,
  sharp,
});
