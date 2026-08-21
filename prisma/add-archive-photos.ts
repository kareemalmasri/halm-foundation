import { readdirSync } from "node:fs";
import { join } from "node:path";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../generated/prisma/client";

loadEnv({ path: ".env.local" });

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is not set (expected in .env.local)");
}

const prisma = new PrismaClient({ accelerateUrl });

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function importYear(year: number) {
  const dirRelative = `public/archive/photos/${year}`;
  const dirAbsolute = join(process.cwd(), dirRelative);

  const files = readdirSync(dirAbsolute)
    .filter((f) => IMAGE_EXTENSIONS.has(f.slice(f.lastIndexOf(".")).toLowerCase()))
    .sort();

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const fileUrl = `/archive/photos/${year}/${file}`;
    const thumbnailUrl = `/archive/photos/${year}/thumbs/${file}`;

    const existing = await prisma.archiveItem.findFirst({ where: { fileUrl } });
    if (existing) {
      if (existing.thumbnailUrl !== thumbnailUrl) {
        await prisma.archiveItem.update({
          where: { id: existing.id },
          data: { thumbnailUrl },
        });
        updated++;
      } else {
        skipped++;
      }
      continue;
    }

    await prisma.archiveItem.create({
      data: {
        type: "photo",
        year,
        fileUrl,
        thumbnailUrl,
        titleAr: "",
        titleEn: "",
        descriptionAr: "",
        descriptionEn: "",
      },
    });
    created++;
  }

  const total = await prisma.archiveItem.count({ where: { type: "photo", year } });
  console.log(
    `✓ ${year}: ${files.length} ملف — أُدخل ${created}، حُدّث ${updated}، تُخطّي ${skipped} — المجموع بالقاعدة: ${total}`
  );
  return total;
}

async function main() {
  const years = process.argv.slice(2).map(Number);
  if (years.length === 0 || years.some((y) => !Number.isInteger(y))) {
    throw new Error(
      "مطلوب تمرير سنة واحدة على الأقل، مثال:  npx tsx prisma/add-archive-photos.ts 2016 2017"
    );
  }

  let grandTotal = 0;
  for (const year of years) {
    grandTotal += await importYear(year);
  }
  console.log(`\n══ مجموع صور الأرشيف في القاعدة: ${grandTotal}`);
}

main()
  .catch((e) => {
    console.error("❌ فشل الإدخال:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
