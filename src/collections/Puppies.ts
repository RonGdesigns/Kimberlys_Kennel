import type { CollectionConfig } from "payload";

// Everything Kimberly can manage about a puppy from the admin panel.
export const Puppies: CollectionConfig = {
  slug: "puppies",
  labels: {
    singular: "Puppy",
    plural: "Puppies",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "color", "size", "price", "readyDate"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            width: "50%",
            description: "Used in the page URL, e.g. /puppies/hazel. Lowercase, no spaces.",
          },
        },
      ],
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Main photo shown on the site." },
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "available",
          options: [
            { label: "Available", value: "available" },
            { label: "Reserved", value: "reserved" },
            { label: "Adopted", value: "adopted" },
            { label: "Coming soon", value: "upcoming" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "sex",
          type: "select",
          required: true,
          options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ],
          admin: { width: "33%" },
        },
        {
          name: "size",
          type: "select",
          required: true,
          options: [
            { label: "Mini", value: "Mini" },
            { label: "Medium", value: "Medium" },
            { label: "Standard", value: "Standard" },
          ],
          admin: { width: "34%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "color",
          type: "text",
          required: true,
          admin: { width: "50%", description: "e.g. Caramel, Cream, Chocolate" },
        },
        {
          name: "litter",
          type: "text",
          admin: { width: "50%", description: "e.g. Autumn Litter" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "birthDate",
          type: "date",
          admin: { width: "50%", date: { pickerAppearance: "dayOnly" } },
        },
        {
          name: "readyDate",
          type: "date",
          label: "Ready to go home",
          admin: { width: "50%", date: { pickerAppearance: "dayOnly" } },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "number",
          required: true,
          min: 0,
          admin: { width: "50%", description: "Adoption price in USD." },
        },
        {
          name: "deposit",
          type: "number",
          min: 0,
          admin: { width: "50%", description: "Refundable reservation deposit in USD." },
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { description: "A warm few sentences about this puppy's personality." },
    },
    {
      name: "traits",
      type: "array",
      label: "Personality traits",
      labels: { singular: "Trait", plural: "Traits" },
      fields: [{ name: "trait", type: "text" }],
      admin: { description: "Short tags, e.g. Calm, Playful, Great with kids." },
    },
  ],
};
