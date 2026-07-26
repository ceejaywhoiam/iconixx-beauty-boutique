import pinkDynasty from "@/assets/pink-dynasty.jpg";
import expensiveTaste from "@/assets/expensive-taste.jpg";
import richGirl from "@/assets/rich-girl-energy.jpg";
import firstClassKiss from "@/assets/first-class-kiss.jpg";
import trophyWife from "@/assets/trophy-wife.jpg";
import mascara from "@/assets/mascara.jpg";
import nudePalette from "@/assets/nude-palette.jpg";
import royalPalette from "@/assets/royal-palette.jpg";
import liner from "@/assets/liner.jpg";
import ceoLipstick from "@/assets/ceo-lipstick.jpg";
import breezeLashes from "@/assets/breeze-cluster-lashes-kit.jpg";
import timelessLipKit from "@/assets/timeless-beauty-lip-kit.jpg";

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
    price: 10,
    quantity: 11,
    image: pinkDynasty,
    description:
      "A soft luxury pink created for the girls who know their worth and wear confidence effortlessly. Pink Dynasty is the perfect baby pink matte gloss that delivers smooth, velvety color with a lightweight feel and an elegant finish. Feminine, classy, and timeless — made for soft glam days, brunch dates, selfies, boss moves, and being that girl everywhere you go.",
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
    price: 10,
    quantity: 9,
    image: expensiveTaste,
    description:
      "A rich caramel nude designed for the woman who loves luxury, confidence, and timeless beauty. Expensive Taste delivers a smooth velvet-matte finish with a lightweight feel that melts perfectly onto the lips while giving effortless soft glam energy. Classy, bold, and sophisticated — perfect for everyday luxury, date nights, business looks, vacations, and iconic selfies.",
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
    price: 10,
    quantity: 14,
    image: richGirl,
    description:
      "A bold royal pink made for the girls who expect luxury, confidence, and attention the moment they walk in the room. Rich Girl Energy delivers rich color with a smooth velvet-matte finish that feels lightweight while giving full glam energy. Feminine, classy, playful, and powerful all at once — perfect for date nights, brunches, vacations, selfies, and soft luxury looks.",
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
    price: 10,
    quantity: 9,
    image: firstClassKiss,
    description:
      "A rich luxurious red shade designed for the woman who carries herself like a VIP everywhere she goes. First Class Kiss delivers bold feminine energy with a smooth velvet-matte finish that feels lightweight yet unforgettable. A glamorous statement color made for soft luxury, date nights, vacations, selfies, girls' nights, and walking in confidence.",
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
    price: 10,
    quantity: 7,
    image: trophyWife,
    description:
      "A rich mauve nude made for the woman who walks with confidence, elegance, and boss energy. Trophy Wife delivers a smooth velvet-matte finish with a luxurious lightweight feel that speaks power, beauty, and sophistication in every swipe. A timeless shade for business meetings, brunch dates, soft glam nights, luxury selfies, and everyday Timeless Iconixx beauty.",
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
    image: mascara,
    description:
      "Turn every blink into a statement with the Timeless Iconixx Beauty Mascara — designed to deliver bold volume, dramatic length, and flawless definition in every stroke. This luxury formula lifts and separates each lash effortlessly while creating a soft glamorous finish that lasts all day without clumping or flaking. The sleek black and rose gold packaging brings timeless elegance to your beauty routine while the precision wand coats every lash from root to tip for a fuller, eye-opening effect.",
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
    price: 9.99,
    quantity: 10,
    image: nudePalette,
    description:
      "The Timeless Nude Luxe Palette is the definition of effortless beauty. Featuring warm caramel tones, rich chocolate browns, golden shimmer shades, and smooth transition colors, this palette delivers soft glam perfection every time. Whether you want a natural daytime look or a sultry nighttime beat, this palette does it all beautifully.",
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
    price: 9.99,
    quantity: 10,
    image: royalPalette,
    description:
      "A luxury neutral palette designed for soft glam lovers who want elegance, warmth, and rich pigment all in one. Featuring creamy matte browns, caramel tones, champagne shimmer, and golden bronze sparkle shades, this palette creates effortless beauty for everyday wear or full glam nights.",
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
    image: liner,
    description:
      "Create bold, flawless eyes with the Midnight Precision Liquid Liner by Timeless Iconixx Beauty — the ultimate luxury eyeliner designed for smooth, effortless application. This ultra-black formula glides on like silk with a precision tip that delivers sharp wings, dramatic cat-eyes, or sleek everyday definition in just one stroke. Smudge-resistant, long-lasting, and richly pigmented — made for beauty queens who want their eyes to speak before they do.",
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
    image: ceoLipstick,
    description:
      "The CEO Lip Collection is the ultimate statement set designed for the woman who walks in confidence and leaves a lasting impression. This ultra-smooth lipstick trio delivers rich pigment, a velvety matte finish, and luxurious all-day wear without feeling dry. From brunch dates to boss meetings, this collection was made to stand out.",
    highlights: [
      "Three signature shades",
      "Velvet matte finish",
      "Rich all-day pigment",
      "Comfortable non-drying wear",
      "Luxury rose gold casing",
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
