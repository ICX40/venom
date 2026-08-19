export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Venom Tribal Tee',
    price: 45.00,
    image: '/brand/1.png',
    category: 'T-Shirts',
    description: 'Crafted from heavyweight premium cotton, the Venom Tribal Tee features custom distressed graphics and a boxy, modern silhouette designed for ultimate comfort and dark aesthetic appeal.',
    features: ['100% Heavyweight Cotton', 'Custom Graphic Print', 'Pre-shrunk Fabric', 'Boxy Fit'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p2',
    name: 'Oblivion Long Sleeve',
    price: 55.00,
    image: '/brand/2.png',
    category: 'T-Shirts',
    description: 'Engineered with a signature fit and breathable ribbed fabric, the Oblivion Long Sleeve delivers effortless layering for an uncompromising dark aesthetic.',
    features: ['Signature Fit', 'Ribbed Cuffs', 'Ultra-soft Cotton Blend', 'Durable Stitching'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p3',
    name: 'Void Heavy',
    price: 85.00,
    image: '/brand/1.png',
    category: 'T-Shirts',
    description: 'Constructed from heavy French terry cotton, the Void Heavy Hoodie offers structured warmth and a deep, immersive hood designed for the shadows.',
    features: ['French Terry Cotton', 'Double-layered Hood', 'Kangaroo Pocket', 'Heavyweight Feel'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'h1',
    name: 'Abyss Graphic Hoodie',
    price: 95.00,
    image: 'https://i.pinimg.com/1200x/09/18/d1/0918d17903faacb4185ff82f502b4834.jpg',
    category: 'Hoodies',
    description: 'Featuring intricate dark graphics on heavy fleece, the Abyss Graphic Hoodie stands as a centerpiece for cold-weather streetwear.',
    features: ['Overweight Fleece', 'Graphic Back Print', 'Ribbed Hem and Cuffs'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'h2',
    name: 'Venom Eclipse Zip',
    price: 110.00,
    image: 'https://i.pinimg.com/1200x/61/57/95/6157952f83b3c4a8ac486cecb40a901b.jpg',
    category: 'Hoodies',
    description: 'A full-zip construction built with brushed cotton for maximum texture and durability, customized with metallic hardware.',
    features: ['Brushed Cotton', 'Heavy-duty Metal Zipper', 'Structured Hood'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'h3',
    name: 'Obsidian Pullover',
    price: 90.00,
    image: 'https://i.pinimg.com/736x/1b/b6/97/1bb697c94155ff4319765bde29c62d09.jpg',
    category: 'Hoodies',
    description: 'Custom knit dark aesthetic pullover designed for seamless daily wear with unmatched tactile luxury.',
    features: ['Custom Knit Fabric', 'Relaxed Drop Shoulder', 'Minimalist Styling'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];