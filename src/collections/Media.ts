import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Uploaded images (puppy photos, etc.). Files are stored on disk under
// /public/media so they're served statically. For serverless/scaled hosting,
// swap this for a cloud storage adapter (e.g. @payloadcms/storage-s3 or Vercel Blob).
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
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
