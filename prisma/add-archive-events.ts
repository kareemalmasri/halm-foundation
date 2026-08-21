import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../generated/prisma/client";

loadEnv({ path: ".env.local" });

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is not set (expected in .env.local)");
}

const prisma = new PrismaClient({ accelerateUrl });

const items = [
  {
    type: "event",
    titleAr: "معرض دعم التراث الدمشقي بخان أسعد باشا",
    titleEn: "Damascene Heritage Support Exhibition at Khan As'ad Pasha",
    descriptionAr:
      "معرض لدعم التراث الحرفي الدمشقي، أُقيم بخان تاريخي في دمشق.",
    descriptionEn:
      "An exhibition supporting Damascene artisanal heritage, held at a historic khan in Damascus.",
    fileUrl: "/archive/events/khan-asaad-pasha-exhibition.mp4",
  },
  {
    type: "event",
    titleAr: "برومو جامعة الحواش",
    titleEn: "Al-Hawash University Promo",
    descriptionAr: "فيديو ترويجي بالتعاون مع جامعة الحواش.",
    descriptionEn: "A promotional video in collaboration with Al-Hawash University.",
    fileUrl: "/archive/events/hawash-university-promo.mp4",
  },
  {
    type: "event",
    titleAr: "مبادرة هوا شامي",
    titleEn: "Hawa Shami Initiative",
    descriptionAr: "مبادرة ثقافية باسم \"هوا شامي\".",
    descriptionEn: "A cultural initiative titled \"Hawa Shami.\"",
    fileUrl: "/archive/events/hawa-shami-initiative.mp4",
  },
  {
    type: "event",
    titleAr: "مبادرة هوى شام",
    titleEn: "Hawa Sham Initiative",
    descriptionAr: "مبادرة \"هوى شام\" بالتعاون مع فريق تصوير احترافي.",
    descriptionEn:
      "The \"Hawa Sham\" initiative in collaboration with a professional videography team.",
    fileUrl: "/archive/events/hawa-sham-initiative.mp4",
  },
];

async function main() {
  console.log("📥 إضافة عناصر أرشيف حقيقية (فعالية ومعرض)...");

  let created = 0;
  let skipped = 0;

  for (const item of items) {
    const existing = await prisma.archiveItem.findFirst({
      where: { titleEn: item.titleEn },
    });
    if (existing) {
      console.log(`  ↷ موجود مسبقاً، تخطّي: ${item.titleEn}`);
      skipped++;
      continue;
    }
    await prisma.archiveItem.create({ data: item });
    console.log(`  ✓ أُدخل: ${item.titleEn}`);
    created++;
  }

  console.log(`\n✓ اكتمل: ${created} عنصر جديد، ${skipped} تم تخطّيه.`);
}

main()
  .catch((e) => {
    console.error("❌ فشل الإدخال:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
