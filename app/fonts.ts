import { Amiri, Cormorant_Garamond } from "next/font/google";

export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "swap",
});
