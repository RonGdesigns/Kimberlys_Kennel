// Editorial content used across pages. Centralized so copy is easy to revise
// and later move into a CMS for the client to manage.

export const adoptionSteps = [
  {
    title: "Browse our available puppies",
    body: "Explore current and upcoming litters. Each puppy has a profile with photos, temperament notes, and availability.",
  },
  {
    title: "Submit an adoption inquiry",
    body: "Tell us about your home and what you're looking for. This helps us match you with the right puppy for your family.",
  },
  {
    title: "Meet & reserve",
    body: "Schedule a visit or video call to meet your puppy. When it's the right fit, a reservation secures your place.",
  },
  {
    title: "Welcome home",
    body: "We prepare your puppy with early care, vet checks, and a smooth transition so they arrive happy and healthy.",
  },
];

export const values = [
  {
    title: "Health first",
    body: "Vet-checked, vaccinated, and raised with attentive early care so every puppy starts life strong.",
  },
  {
    title: "Raised with love",
    body: "Our puppies grow up underfoot in a warm home environment — well-socialized and ready to bond.",
  },
  {
    title: "The right match",
    body: "We take time to understand each family so puppies find a home where they'll truly thrive.",
  },
];

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  puppy: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah & Tom",
    location: "Portland, OR",
    puppy: "Adopted Cooper",
    quote:
      "From our first inquiry to bringing Cooper home, Kimberly made everything feel personal and caring. He's healthy, happy, and the heart of our home.",
  },
  {
    name: "The Alvarez Family",
    location: "Austin, TX",
    puppy: "Adopted Luna",
    quote:
      "We were nervous first-time owners, but the guidance we received was incredible. Luna was so well-socialized — she settled in within days.",
  },
  {
    name: "Margaret W.",
    location: "Asheville, NC",
    puppy: "Adopted Daisy",
    quote:
      "You can tell these puppies are raised with genuine love. Daisy is gentle, smart, and the sweetest companion I could have asked for.",
  },
];
