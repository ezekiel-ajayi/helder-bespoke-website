import { StaticImageData } from "next/image";
import agbada from "@/public/assets/images/agbadaStyle1.png";
import senatorwear from "@/public/assets/images/senator.png";
import kaftan from "@/public/assets/images/kaftan.jpg";
import dansiki from "@/public/assets/images/danshiki.svg"

export type Collection = {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string | StaticImageData;
  price: string;
};

export const collections: Collection[] = [
  {
    id: "agbada-royale",
    name: "Agbada Royale",
    tag: "Native — Heritage",
    description:
      "A hand-embroidered flowing robe crafted for timeless ceremonies and elegance.",
    image: agbada,
    price: "From ₦450,000",
  },
  {
    id: "kaftan-noir",
    name: "Kaftan Noir",
    tag: "Native — Evening",
    description:
      "A sleek raw silk kaftan designed for understated luxury and evening refinement.",
    image: kaftan,
    price: "From ₦210,000",
  },
  {
    id: "senator-fuse",
    name: "Senator Fuse",
    tag: "Native — Modern",
    description:
      "A refined senator silhouette blending traditional style with modern sophistication.",
    image: senatorwear,
    price: "From ₦185,000",
  },
  {
    id: "dan-shiki",
    name: "Dan Shiki Luxe",
    tag: "Nigerian Native — Casual",
    description:
      "A stylish Dan Shiki outfit blending cultural heritage with contemporary Nigerian fashion.",
    image: dansiki,
    price: "From ₦150,000",
  },
  {
    id: "double-breasted-lagos",
    name: "Double-Breasted Lagos",
    tag: "International — Suiting",
    description:
      "A bold double-breasted suit crafted for movement, confidence, and distinction.",
    image:
      "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1400&auto=format&fit=crop",
    price: "From ₦340,000",
  },
  {
    id: "the-tie-bar",
    name: "The Tie Bar",
    tag: "Accessories",
    description:
      "Handcrafted silk ties and pocket squares that complete every refined look.",
    image:
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=1400&auto=format&fit=crop",
    price: "From ₦35,000",
  },
];
