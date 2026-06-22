// Central site configuration. Edit these values to update contact details,
// navigation, and social links across the whole site.

export const site = {
  name: "Kimberly Labradoodle Kennel",
  shortName: "Kimberly Labradoodles",
  tagline: "Raising healthy, happy labradoodles — and matching them with families for their happily ever after.",
  email: "kimberlylabradoodlekennel@gmail.com",
  phone: "", // Add when provided by the client
  location: "", // Add city/state when provided by the client
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/puppies", label: "Available Puppies" },
  { href: "/adoption-process", label: "Adoption Process" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
] as const;
