import { StaticImageData } from "next/image";
import agbada from "@/public/assets/images/agbadaStyle1.png";
import senatorwear from "@/public/assets/images/senator.png";
import kaftan2 from "@/public/assets/images/kaftan.jpg";
import kaftan from "@/public/assets/images/kaftan.jpeg";
import dansiki from "@/public/assets/images/danshiki.svg";
import suit from "@/public/assets/images/suit.png";
import twopiece from "@/public/assets/images/two-piece.png";

export type Collection = {
  id: string;
  name: string;
  description: string;
  image: string | StaticImageData;
  price: string;
};

export const collections: Collection[] = [
  {
    id: "agbada-royale",
    name: "Agbada Royale",
    description:
      "A hand-embroidered flowing robe crafted for timeless ceremonies and elegance.",
    image: agbada,
    price: "From ₦450,000",
  },
  {
    id: "kaftan",
    name: "Kaftan",
    description:
      "A sleek raw silk kaftan designed for understated luxury and evening refinement.",
    image: kaftan,
    price: "From ₦210,000",
  },
  {
    id: "senator",
    name: "Senator",
    description:
      "A refined senator silhouette blending traditional style with modern sophistication.",
    image: senatorwear,
    price: "From ₦185,000",
  },
  {
    id: "dan-shiki",
    name: "Dan Shiki Luxe",
    description:
      "A stylish Dan Shiki outfit blending cultural heritage with contemporary Nigerian fashion.",
    image: dansiki,
    price: "From ₦150,000",
  },
  {
    id: "double-breasted-lagos",
    name: "Double-Breasted Lagos",
    description:
      "A bold double-breasted suit crafted for movement, confidence, and distinction.",
    image: suit,
    price: "From ₦340,000",
  },
  {
    id: "two-piece",
    name: "Two piece",
    description:
      "A versatile two-piece ensemble designed for both casual and formal occasions, offering comfort and style.",
    image: twopiece,
    price: "From ₦35,000",
  },
  {
    id: "kaftan2",
    name: "Kaftan",
    description:
      "A sleek raw silk kaftan designed for understated luxury and evening refinement.",
    image: kaftan2,
    price: "From ₦210,000",
  },
];
