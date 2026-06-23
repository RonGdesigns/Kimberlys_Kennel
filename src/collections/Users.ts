import type { CollectionConfig } from "payload";

// Account(s) that can log into the admin panel (e.g. Kimberly).
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
