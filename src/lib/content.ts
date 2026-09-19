// Centralized content for Helder Bespoke.
// Image sources: Unsplash (royalty-free), sized via the standard
// images.unsplash.com query params for responsive delivery.





export type ProcessStep = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    label: "Measure",
    title: "Twenty-six points, taken by hand",
    description:
      "Every commission starts with a sit-down fitting — in our Lagos atelier or wherever you are. We record twenty-six measurements, not the six a ready-to-wear house relies on.",
  },
  {
    id: "02",
    label: "Select",
    title: "Fabric, weight, and weather",
    description:
      "From aso-oke and George to tropical wool and Italian linen, we match fabric to climate and occasion before a single thread is cut.",
  },
  {
    id: "03",
    label: "Cut",
    title: "A pattern drafted for one body",
    description:
      "No house block, no size run. Your pattern is drafted from your measure alone, then cut by hand by a tailor who has done this for decades.",
  },
  {
    id: "04",
    label: "Stitch",
    title: "Built on the body, not the mannequin",
    description:
      "Two fittings minimum. We baste, fit, adjust, and only then close the seams — so the finished piece moves the way you do.",
  },
  {
    id: "05",
    label: "Finish",
    title: "Pressed, detailed, delivered",
    description:
      "Final pressing, hand-finished buttonholes, and a garment bag built for travel. Lagos delivery in person; everywhere else, insured shipping.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Adebayo K.",
    role: "Groom, Lagos",
    quote:
      "My agbada held its shape all day. Zero regrets — people still ask who made it.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Chioma N.",
    role: "Bought for her husband",
    quote:
      "The shoulder sits better than suits we bought in London — ready in three weeks.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Tunde O.",
    role: "Repeat client, four years",
    quote:
      "They remember my measurements and preferences. Never feels like a transaction.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
  },
];

export const craftImages = {
  fabric:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
  hands:
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
  measuring:
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
  detail:
    "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=1200&auto=format&fit=crop",
};

export const aboutImage =
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1600&auto=format&fit=crop";
