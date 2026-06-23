import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// In production we store photos in Vercel Blob (BLOB_READ_WRITE_TOKEN set), so
// local disk must be disabled — the serverless filesystem is read-only. Locally
// (no token) we keep files on disk under /public/media.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

// Uploaded images (puppy photos, etc.).
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    ...(useBlob
      ? { disableLocalStorage: true }
      : { staticDir: path.resolve(dirname, "../../public/media") }),
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 576, position: "centre" },
      { name: "feature", width: 1200, height: 900, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text (for accessibility)",
    },
  ],
};
