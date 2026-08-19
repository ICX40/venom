import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "VENOM | Dark Wear",
  description: "Exclusive dark aesthetic clothing brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cinzel.className} bg-black text-white antialiased`}>
        <CartProvider>
          <SmoothScroll>
            {children}
            <Cart />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}