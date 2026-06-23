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
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Accept the common Postgres env var names that Vercel/Neon inject automatically,
// falling back to local SQLite for development.
const databaseUri =
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  "file:./kennel.db";
const usePostgres = /^postg(res|resql):\/\//.test(databaseUri);

// Database: Postgres in production (e.g. Neon on Vercel), SQLite for local dev.
const db = usePostgres
  ? // `prodMigrations` runs the committed migrations automatically on the first
    // production connect, so the schema is created on deploy without a separate
    // migration step. Locally (dev) Payload still auto-pushes the schema.
    postgresAdapter({
      pool: { connectionString: databaseUri },
      migrationDir: path.resolve(dirname, "migrations"),
      prodMigrations: migrations,
    })
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
