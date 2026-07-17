import { Amiri, Cormorant_Garamond } from "next/font/google";

// خط العناوين والنصوص العربية — Amiri يوفّر وزنين فقط فعلياً: عادي (400) وعريض (700)
export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

// خط العناوين والنصوص الإنجليزية — يغطي كل الأوزان المستخدمة بالموقع (عادي إلى عريض)
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
