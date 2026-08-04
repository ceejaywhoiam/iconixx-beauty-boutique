import pinkDynastyImg from "@/assets/pink-dynasty.jpg";
import expensiveTasteImg from "@/assets/expensive-taste.jpg";
import richGirlImg from "@/assets/rich-girl-energy.jpg";
import firstClassKissImg from "@/assets/first-class-kiss.jpg";
import trophyWifeImg from "@/assets/trophy-wife.jpg";
import mascaraImg from "@/assets/mascara.jpg";
import nudePaletteImg from "@/assets/nude-palette.jpg";
import royalPaletteImg from "@/assets/royal-palette.jpg";
import linerImg from "@/assets/liner.jpg";
import ceoLipstickImg from "@/assets/ceo-lipstick.jpg";
import breezeLashesImg from "@/assets/breeze-cluster.png";
import timelessLipKitImg from "@/assets/timeless-beauty-lip-kit.jpg";
import heroImg from "@/assets/hero.jpg";

export type Category = "Gloss" | "Lipstick" | "Palette" | "Mascara" | "Liner" | "Lashes" | "Lip Kit";

export interface Product {
  id: string;
  name: string;
  tagline?: string;
  category: Category;
  price: number;
  quantity: number;
  quantityNote?: string;
  image: string;
  description: string;
  highlights: string[];
}

export const products: Product[] = [
  {
    id: "pink-dynasty",
    name: "Pink Dynasty",
    tagline: "1 of 5 — Matte Lip Gloss",
    category: "Gloss",
    price: 12,
    quantity: 11,
    image: pinkDynastyImg,
    description:
      "A soft luxury pink created for the girls who know their worth and wear confidence effortlessly. Pink Dynasty is the perfect baby pink matte gloss that delivers smooth, velvety color with a [...]",
    highlights: [
      "Soft luxury baby pink",
      "Smooth velvet matte finish",
      "Lightweight & comfortable wear",
      "Highly pigmented color payoff",
      "Feminine soft glam essential",
      "Beautiful on every skin tone",
    ],
  },
  {
    id: "expensive-taste",
    name: "Expensive Taste",
    tagline: "2 of 5 — Matte Lip Gloss",
    category: "Gloss",
    price: 12,
    quantity: 9,
    image: expensiveTasteImg,
    description:
      "A rich caramel nude designed for the woman who loves luxury, confidence, and timeless beauty. Expensive Taste delivers a smooth velvet-matte finish with a lightweight feel that melts perfec[...]",
    highlights: [
      "Rich caramel nude tone",
      "Smooth velvet matte finish",
      "Lightweight & comfortable wear",
      "Highly pigmented luxury color",
      "Sophisticated soft glam essential",
      "Beautiful on every skin tone",
    ],
  },
  {
    id: "rich-girl-energy",
    name: "Rich Girl Energy",
    tagline: "3 of 5 — Matte Lip Gloss",
    category: "Gloss",
    price: 12,
    quantity: 14,
    image: richGirlImg,
    description:
      "A bold royal pink made for the girls who expect luxury, confidence, and attention the moment they walk in the room. Rich Girl Energy delivers rich color with a smooth velvet-matte finish th[...]",
    highlights: [
      "Rich vibrant princess pink",
      "Smooth velvet matte finish",
      "Lightweight comfortable wear",
      "Highly pigmented color payoff",
      "Glamorous statement shade",
      "Perfect for all skin tones",
    ],
  },
  {
    id: "first-class-kiss",
    name: "First Class Kiss",
    tagline: "4 of 5 — Matte Lip Gloss",
    category: "Gloss",
    price: 12,
    quantity: 9,
    image: firstClassKissImg,
    description:
      "A rich luxurious red shade designed for the woman who carries herself like a VIP everywhere she goes. First Class Kiss delivers bold feminine energy with a smooth velvet-matte finish that [...]",
    highlights: [
      "Rich vibrant red tone",
      "Smooth velvet matte finish",
      "Lightweight comfortable wear",
      "Highly pigmented luxury color",
      "Glamorous bold feminine energy",
      "Perfect for all skin tones",
    ],
  },
  {
    id: "trophy-wife",
    name: "Trophy Wife",
    tagline: "5 of 5 — Matte Lip Gloss",
    category: "Gloss",
    price: 12,
    quantity: 7,
    image: trophyWifeImg,
    description:
      "A rich mauve nude made for the woman who walks with confidence, elegance, and boss energy. Trophy Wife delivers a smooth velvet-matte finish with a luxurious lightweight feel that speaks p[...]",
    highlights: [
      "Sophisticated mauve nude tone",
      "Smooth velvet matte finish",
      "Lightweight & comfortable wear",
      "Rich highly pigmented color",
      "Soft luxury boss-girl energy",
      "Beautiful on every skin tone",
    ],
  },
  {
    id: "timeless-mascara",
    name: "The Timeless Collection",
    tagline: "Luxury Mascara",
    category: "Mascara",
    price: 14.99,
    quantity: 20,
    quantityNote: "10 Black Tubes • 10 Rose Gold Tubes",
    image: mascaraImg,
    description:
      "Turn every blink into a statement with the Timeless Iconixx Beauty Mascara — designed to deliver bold volume, dramatic length, and flawless definition in every stroke. This luxury formul[...]",
    highlights: [
      "Intense volume & dramatic length",
      "Smooth clump-free application",
      "Lightweight comfortable wear",
      "Long-lasting all-day glam",
      "Precision wand for flawless definition",
      "Vegan & cruelty-free",
    ],
  },
  {
    id: "timeless-nude-palette",
    name: "Timeless Nude Luxe Palette",
    tagline: "Tan Case",
    category: "Palette",
    price: 24.99,
    quantity: 10,
    image: nudePaletteImg,
    description:
      "The Timeless Nude Luxe Palette is the definition of effortless beauty. Featuring warm caramel tones, rich chocolate browns, golden shimmer shades, and smooth transition colors, this palett[...]",
    highlights: [
      "Warm caramel & chocolate tones",
      "Golden shimmer accents",
      "Buttery blendable formula",
      "Day-to-night versatility",
      "Luxury tan compact",
    ],
  },
  {
    id: "royal-reign-palette",
    name: "Royal Reign Palette",
    tagline: "Black Case",
    category: "Palette",
    price: 24.99,
    quantity: 10,
    image: royalPaletteImg,
    description:
      "A luxury neutral palette designed for soft glam lovers who want elegance, warmth, and rich pigment all in one. Featuring creamy matte browns, caramel tones, champagne shimmer, and golden b[...]",
    highlights: [
      "Creamy matte browns",
      "Champagne shimmer shades",
      "Golden bronze sparkle",
      "High-payoff pigment",
      "Sleek black luxury case",
    ],
  },
  {
    id: "midnight-precision-liner",
    name: "Midnight Precision Liquid Liner",
    tagline: "Ultra-Black Precision Tip",
    category: "Liner",
    price: 8,
    quantity: 20,
    image: linerImg,
    description:
      "Create bold, flawless eyes with the Midnight Precision Liquid Liner by Timeless Iconixx Beauty — the ultimate luxury eyeliner designed for smooth, effortless application. This ultra-blac[...]",
    highlights: [
      "Ultra-black intense pigment",
      "Precision tip for sharp wings",
      "Smudge-resistant & long-lasting",
      "One-stroke application",
      "Luxury sleek design",
    ],
  },
  {
    id: "ceo-lip-collection",
    name: "CEO Lip Collection",
    tagline: "Bare • Plum • Pink",
    category: "Lipstick",
    price: 22,
    quantity: 30,
    quantityNote: "10 of each shade",
    image: ceoLipstickImg,
    description:
      "The CEO Lip Collection is the ultimate statement set designed for the woman who walks in confidence and leaves a lasting impression. This ultra-smooth lipstick trio delivers rich pigment, [...]",
    highlights: [
      "Three signature shades",
      "Velvet matte finish",
      "Rich all-day pigment",
      "Comfortable non-drying wear",
      "Luxury rose gold casing",
    ],
  },
  {
    id: "breeze-cluster-lashes-kit",
    name: "Breeze Cluster Lashes Kit",
    tagline: "Salon Look at Home",
    category: "Lashes",
    price: 14.99,
    quantity: 30,
    image: breezeLashesImg,
    description:
      "Get the salon lash look without the salon price! The Breeze Cluster Lashes Kit gives you soft, fluffy, and incredibly realistic lashes that blend seamlessly with your natural lashes. Light[...]",
    highlights: [
      "Soft, fluffy, realistic cluster lashes",
      "Lightweight & comfortable wear",
      "Lasts up to 7–10 days with proper care",
      "Blends seamlessly with natural lashes",
      "Perfect for everyday glow or full glam",
      "Kit includes lash tray, bond & lock adhesive, remover, precision applicator, and mini curler",
    ],
  },
  {
    id: "timeless-beauty-lip-kit",
    name: "Timeless Beauty Lip Kit",
    tagline: "Coming Soon",
    category: "Lip Kit",
    price: 24.99,
    quantity: 0,
    image: timelessLipKitImg,
    description: "Coming Soon",
    highlights: [],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const heroImage = heroImg;
