const pinkDynastyImg = "https://ik.imagekit.io/jodiplease/pink-dynasty_compressed.png?updatedAt=1785590748796";
const expensiveTasteImg = "https://ik.imagekit.io/jodiplease/expensive-taste_compressed.png?updatedAt=1785590749988";
const richGirlImg = "https://ik.imagekit.io/jodiplease/rich-girl-energy_compressed.png?updatedAt=1785590749662";
const firstClassKissImg = "https://ik.imagekit.io/jodiplease/first-class-kiss_compressed.png?updatedAt=1785590750953";
const trophyWifeImg = "https://ik.imagekit.io/jodiplease/trophy-wife_compressed.png?updatedAt=1785590749918";
const ceoKissesImg = "https://ik.imagekit.io/jodiplease/ceo-kisses.png";
const mochaLatteImg = "https://ik.imagekit.io/jodiplease/mocha-latte.png";
const classyAndSassyImg = "https://ik.imagekit.io/jodiplease/classy-and-sassy.png";
const firstLadyImg = "https://ik.imagekit.io/jodiplease/first-lady.png";
const mascaraImg = "https://ik.imagekit.io/jodiplease/mascara.png";
const nudePaletteImg = "https://ik.imagekit.io/jodiplease/timeless-nude-pallet_compressed.png?updatedAt=1785590753053";
const royalPaletteImg = "https://ik.imagekit.io/jodiplease/royal-reign_compressed.png?updatedAt=1785590753514";
const linerImg = "https://ik.imagekit.io/jodiplease/mascara-precision.png";
const ceoLipstickImg = "https://ik.imagekit.io/jodiplease/ceo-lip-collection_compressed.png?updatedAt=1785590745539";
const breezeLashesImg = "https://ik.imagekit.io/jodiplease/breeze-cluster_compressed.png?updatedAt=1785590752852";
const timelessLipKitImg = "https://ik.imagekit.io/jodiplease/timeless-beauty-kit_compressed.png?updatedAt=1785590752827";
const heroImg = "https://ik.imagekit.io/jodiplease/hero.jpg";

export type Category =
  | "Matte Liquid Gloss"
  | "Lip Gloss"
  | "Lipstick"
  | "Palette"
  | "Mascara"
  | "Liner"
  | "Lashes"
  | "Lip Kit";

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
  colors?: string[];
}

export const products: Product[] = [
  {
    id: "pink-dynasty",
    name: "Pink Dynasty",
    tagline: "1 of 5 — Matte Lip Gloss",
    category: "Matte Liquid Gloss",
    price: 12,
    quantity: 11,
    image: pinkDynastyImg,
    description:
      "A soft luxury pink created for the girls who know their worth and wear confidence effortlessly. Pink Dynasty is a baby pink matte gloss that delivers smooth, velvety color with long-lasting[...]",
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
    category: "Matte Liquid Gloss",
    price: 12,
    quantity: 9,
    image: expensiveTasteImg,
    description:
      "A rich caramel nude designed for the woman who loves luxury, confidence, and timeless beauty. Expensive Taste delivers a smooth velvet-matte finish with a lightweight feel and deep, buildab[...]",
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
    category: "Matte Liquid Gloss",
    price: 12,
    quantity: 14,
    image: richGirlImg,
    description:
      "A bold royal pink made for the girls who expect luxury, confidence, and attention. Rich Girl Energy delivers rich, vibrant color with a smooth velvet-matte finish and comfortable all-day we[...]",
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
    category: "Matte Liquid Gloss",
    price: 12,
    quantity: 9,
    image: firstClassKissImg,
    description:
      "A rich luxurious red shade designed for the woman who carries herself like a VIP. First Class Kiss delivers bold feminine energy with a smooth velvet-matte finish and long-lasting, comfort[...]",
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
    category: "Matte Liquid Gloss",
    price: 12,
    quantity: 7,
    image: trophyWifeImg,
    description:
      "A rich mauve nude made for the woman who walks with confidence, elegance, and boss energy. Trophy Wife offers a smooth velvet-matte finish, luxurious lightweight feel, and rich color payof[...]",
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
    id: "ceo-kisses",
    name: "CEO Kisses",
    category: "Lip Gloss",
    price: 10,
    quantity: 8,
    image: ceoKissesImg,
    description:
      "Wrap your lips in luxurious shine with Iconixx Beauty Vegan Lip Gloss. This silky-smooth, non-sticky formula delivers a beautiful wash of color while leaving your lips feeling soft, hydrated, and comfortable all day. Designed for effortless glamour, it glides on evenly to create a radiant, high-shine finish that's perfect for everyday wear or layering over your favorite lipstick.\n\nInfused with nourishing vegan ingredients, this gloss helps lock in moisture while giving your lips a fuller, healthier-looking appearance. Whether you're going for a natural glow or a glamorous finish, Iconixx Beauty adds the perfect touch of confidence to every look.",
    highlights: [
      "Silky-smooth, non-sticky formula",
      "Radiant high-shine finish",
      "Helps lock in moisture",
      "Comfortable all-day wear",
      "Vegan ingredients",
    ],
  },
  {
    id: "mocha-latte",
    name: "Mocha Latte",
    category: "Lip Gloss",
    price: 10,
    quantity: 8,
    image: mochaLatteImg,
    description:
      "Wrap your lips in luxurious shine with Iconixx Beauty Vegan Lip Gloss. This silky-smooth, non-sticky formula delivers a beautiful wash of color while leaving your lips feeling soft, hydrated, and comfortable all day. Designed for effortless glamour, it glides on evenly to create a radiant, high-shine finish that's perfect for everyday wear or layering over your favorite lipstick.\n\nInfused with nourishing vegan ingredients, this gloss helps lock in moisture while giving your lips a fuller, healthier-looking appearance. Whether you're going for a natural glow or a glamorous finish, Iconixx Beauty adds the perfect touch of confidence to every look.",
    highlights: [
      "Silky-smooth, non-sticky formula",
      "Radiant high-shine finish",
      "Helps lock in moisture",
      "Comfortable all-day wear",
      "Vegan ingredients",
    ],
  },
  {
    id: "classy-and-sassy",
    name: "Classy & Sassy",
    category: "Lip Gloss",
    price: 10,
    quantity: 9,
    image: classyAndSassyImg,
    description:
      "Wrap your lips in luxurious shine with Iconixx Beauty Vegan Lip Gloss. This silky-smooth, non-sticky formula delivers a beautiful wash of color while leaving your lips feeling soft, hydrated, and comfortable all day. Designed for effortless glamour, it glides on evenly to create a radiant, high-shine finish that's perfect for everyday wear or layering over your favorite lipstick.\n\nInfused with nourishing vegan ingredients, this gloss helps lock in moisture while giving your lips a fuller, healthier-looking appearance. Whether you're going for a natural glow or a glamorous finish, Iconixx Beauty adds the perfect touch of confidence to every look.",
    highlights: [
      "Silky-smooth, non-sticky formula",
      "Radiant high-shine finish",
      "Helps lock in moisture",
      "Comfortable all-day wear",
      "Vegan ingredients",
    ],
  },
  {
    id: "first-lady",
    name: "First Lady",
    category: "Lip Gloss",
    price: 10,
    quantity: 8,
    image: firstLadyImg,
    description:
      "Wrap your lips in luxurious shine with Iconixx Beauty Vegan Lip Gloss. This silky-smooth, non-sticky formula delivers a beautiful wash of color while leaving your lips feeling soft, hydrated, and comfortable all day. Designed for effortless glamour, it glides on evenly to create a radiant, high-shine finish that's perfect for everyday wear or layering over your favorite lipstick.\n\nInfused with nourishing vegan ingredients, this gloss helps lock in moisture while giving your lips a fuller, healthier-looking appearance. Whether you're going for a natural glow or a glamorous finish, Iconixx Beauty adds the perfect touch of confidence to every look.",
    highlights: [
      "Silky-smooth, non-sticky formula",
      "Radiant high-shine finish",
      "Helps lock in moisture",
      "Comfortable all-day wear",
      "Vegan ingredients",
    ],
  },
  {
    id: "timeless-mascara",
    name: "The Timeless Collection",
    tagline: "Luxury Mascara",
    category: "Mascara",
    price: 14.99,
    quantity: 20,
    quantityNote: "10 Black Tubes • 10 Gold Tubes",
    image: mascaraImg,
    colors: ["Black", "Gold"],
    description:
      "Turn every blink into a statement with the Timeless Iconixx Beauty Mascara — designed to deliver bold volume, dramatic length, and flawless definition. Our precision wand and clump-free [...]",
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
      "The Timeless Nude Luxe Palette is the definition of effortless beauty. Featuring warm caramel tones, rich chocolate browns, golden shimmer accents, and buttery transition shades, this pale[...]",
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
      "A luxury neutral palette designed for soft glam lovers who want elegance, warmth, and rich pigment all in one. Creamy matte browns, champagne shimmer, and golden bronze accents create vers[...]",
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
      "Create bold, flawless eyes with the Midnight Precision Liquid Liner — the ultimate luxury eyeliner for smooth, effortless application. The ultra-black pigment and precision tip make shar[...]",
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
    colors: ["Nude Blush Millionaire", "Purple Passenger Princess", "Peach Impulsive"],
    description:
      "The CEO Lip Collection is a signature trio designed for the woman who walks in confidence and leaves a lasting impression. Ultra-smooth, velvet-matte formulas deliver rich pigment and comf[...]",
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
      "Get the salon lash look without the salon price. The Breeze Cluster Lashes Kit provides soft, fluffy, and realistic lashes that blend seamlessly with your natural lashes. Includes tools fo[...]",
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
