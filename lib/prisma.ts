import { PrismaClient } from "@/generated/prisma/client";

// نمط singleton لتفادي إنشاء اتصالات متعددة أثناء إعادة التحميل الساخن (HMR) في وضع dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is not set (expected in .env.local)");
}

// عنوان القاعدة `prisma+postgres://...` يُمرَّر كـ`accelerateUrl`
// كما يتطلّب عميل Prisma 7 المولَّد (بديل `datasourceUrl` المُزال).
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ accelerateUrl });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
