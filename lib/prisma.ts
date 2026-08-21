import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is not set (expected in .env.local)");
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ accelerateUrl });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
