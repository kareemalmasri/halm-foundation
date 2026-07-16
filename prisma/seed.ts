import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../generated/prisma/client";

// Prisma 7 لم يعد يحمّل متغيرات البيئة تلقائياً — نحمّلها يدوياً كما في prisma.config.ts
loadEnv({ path: ".env.local" });

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is not set (expected in .env.local)");
}

// عنوان القاعدة هو `prisma+postgres://...` (Prisma Postgres عبر Accelerate)،
// لذا يُمرَّر كـ`accelerateUrl` كما يتطلّب عميل Prisma 7 المولَّد.
const prisma = new PrismaClient({ accelerateUrl });

// حرفيون وهميون (5) — بعضهم سيُربط بعناصر أرشيف
const artisans = [
  {
    key: "khattat",
    nameAr: "أبو خليل الخطّاط",
    nameEn: "Abu Khalil the Calligrapher",
    bioAr: "خطّاط دمشقي أمضى عمره في نسخ المصاحف وكتابة اللوحات.",
    bioEn: "A Damascene calligrapher who spent his life copying manuscripts and writing panels.",
    craftType: "calligraphy",
    city: "دمشق",
    status: "deceased",
  },
  {
    key: "nappas",
    nameAr: "المعلّم سليم النحّاس",
    nameEn: "Master Salim the Coppersmith",
    bioAr: "نحّاس من سوق النحّاسين، اشتهر بنقش الصواني والأباريق.",
    bioEn: "A coppersmith from the coppersmiths' souk, famed for engraving trays and ewers.",
    craftType: "copper",
    city: "دمشق",
    status: "living",
  },
  {
    key: "moujawhir",
    nameAr: "الحاجّة نظيرة",
    nameEn: "Hajja Nazira",
    bioAr: "صانعة فسيفساء ورثت الحرفة عن والدها، من روّاد التطعيم بالصدف.",
    bioEn: "A mosaic maker who inherited the craft from her father, a pioneer of mother-of-pearl inlay.",
    craftType: "mosaic",
    city: "دمشق",
    status: "living",
  },
  {
    key: "hariri",
    nameAr: "أستاذ فؤاد الحريري",
    nameEn: "Ustadh Fouad al-Hariri",
    bioAr: "حائك بروكار من آخر ممارسي حياكة الديباج الدمشقي على النول اليدوي.",
    bioEn: "A brocade weaver, among the last practitioners of Damascene damask on the hand loom.",
    craftType: "brocade",
    city: "دمشق",
    status: "living",
  },
  {
    key: "armani",
    nameAr: "كارابيت الفضّي",
    nameEn: "Karabet the Silversmith",
    bioAr: "صائغ فضة أرمني عُرف بدقّة نقوشه على الحلي التقليدية.",
    bioEn: "An Armenian silversmith known for the precision of his engravings on traditional jewelry.",
    craftType: "silver",
    city: "حلب",
    status: "deceased",
  },
];

// عناصر أرشيف وهمية (14) — أنواع/عصور/مواضيع متنوعة
// artisanKey يربط العنصر بحرفيّ (اختياري)
const items = [
  {
    type: "photo",
    titleAr: "سوق الحميدية في الأربعينيات",
    titleEn: "Al-Hamidiyah Souk in the 1940s",
    descriptionAr: "صورة نادرة للسوق المسقوف تُظهر المحال القديمة والزوّار.",
    descriptionEn: "A rare photograph of the covered souk showing the old shops and visitors.",
    era: "ottoman-late",
    theme: "urban-life",
    location: "دمشق القديمة",
    artisanKey: null,
  },
  {
    type: "photo",
    titleAr: "خطّاط عند عمله",
    titleEn: "A Calligrapher at Work",
    descriptionAr: "توثيق مصوّر لأبي خليل وهو ينسخ لوحة بخط الثلث.",
    descriptionEn: "A photographic record of Abu Khalil copying a panel in Thuluth script.",
    era: "mandate",
    theme: "crafts",
    location: "دمشق",
    artisanKey: "khattat",
  },
  {
    type: "document",
    titleAr: "عقد بيع دار دمشقية",
    titleEn: "Deed of Sale of a Damascene House",
    descriptionAr: "وثيقة عثمانية بخط اليد لبيع دار في حي القيمرية.",
    descriptionEn: "A handwritten Ottoman document for the sale of a house in the Qaymariyya quarter.",
    era: "ottoman-late",
    theme: "documents",
    location: "القيمرية",
    artisanKey: null,
  },
  {
    type: "audio",
    titleAr: "رواية شفهية عن مهنة النحاسة",
    titleEn: "Oral Account of the Coppersmithing Trade",
    descriptionAr: "تسجيل صوتي للمعلّم سليم يروي أصول مهنة النحّاسين.",
    descriptionEn: "An audio recording of Master Salim recounting the origins of the coppersmiths' trade.",
    era: "contemporary",
    theme: "crafts",
    location: "سوق النحّاسين",
    artisanKey: "nappas",
  },
  {
    type: "photo",
    titleAr: "صينية نحاسية منقوشة",
    titleEn: "Engraved Copper Tray",
    descriptionAr: "قطعة من عمل المعلّم سليم بزخارف نباتية دقيقة.",
    descriptionEn: "A piece by Master Salim with fine floral ornamentation.",
    era: "contemporary",
    theme: "crafts",
    location: "دمشق",
    artisanKey: "nappas",
  },
  {
    type: "document",
    titleAr: "مخطوط في أصول الفسيفساء",
    titleEn: "Manuscript on Mosaic Fundamentals",
    descriptionAr: "كرّاس يدوي يشرح طريقة تجميع قطع الصدف والخشب.",
    descriptionEn: "A handwritten booklet explaining how to assemble shell and wood pieces.",
    era: "mandate",
    theme: "crafts",
    location: "دمشق",
    artisanKey: "moujawhir",
  },
  {
    type: "photo",
    titleAr: "نول حياكة البروكار",
    titleEn: "The Brocade Weaving Loom",
    descriptionAr: "صورة للنول اليدوي في ورشة الأستاذ فؤاد الحريري.",
    descriptionEn: "A photograph of the hand loom in Ustadh Fouad al-Hariri's workshop.",
    era: "contemporary",
    theme: "crafts",
    location: "دمشق",
    artisanKey: "hariri",
  },
  {
    type: "audio",
    titleAr: "أهزوجة شعبية دمشقية",
    titleEn: "A Damascene Folk Chant",
    descriptionAr: "تسجيل لأهزوجة كانت تُردَّد في أعراس المدينة القديمة.",
    descriptionEn: "A recording of a chant once sung at weddings in the old city.",
    era: "mandate",
    theme: "folklore",
    location: "دمشق القديمة",
    artisanKey: null,
  },
  {
    type: "photo",
    titleAr: "الجامع الأموي عند الفجر",
    titleEn: "The Umayyad Mosque at Dawn",
    descriptionAr: "صورة للصحن الرخامي في ساعة مبكّرة من النهار.",
    descriptionEn: "A photograph of the marble courtyard in the early hours of the day.",
    era: "ottoman-late",
    theme: "architecture",
    location: "الجامع الأموي",
    artisanKey: null,
  },
  {
    type: "document",
    titleAr: "رسالة تجارية بين دمشق وحلب",
    titleEn: "Trade Letter between Damascus and Aleppo",
    descriptionAr: "مراسلة تجارية توثّق طرق نقل الحرير بين المدينتين.",
    descriptionEn: "A commercial correspondence documenting silk transport routes between the two cities.",
    era: "ottoman-late",
    theme: "documents",
    location: "دمشق",
    artisanKey: null,
  },
  {
    type: "photo",
    titleAr: "حلي فضية أرمنية",
    titleEn: "Armenian Silver Jewelry",
    descriptionAr: "قطع من صياغة كارابيت تُظهر دقّة النقش التقليدي.",
    descriptionEn: "Pieces from Karabet's craft showing the precision of traditional engraving.",
    era: "mandate",
    theme: "crafts",
    location: "حلب",
    artisanKey: "armani",
  },
  {
    type: "audio",
    titleAr: "مقابلة مع الحاجّة نظيرة",
    titleEn: "Interview with Hajja Nazira",
    descriptionAr: "حديث مسجّل عن رحلتها مع حرفة الفسيفساء والتطعيم.",
    descriptionEn: "A recorded conversation about her journey with mosaic and inlay craft.",
    era: "contemporary",
    theme: "crafts",
    location: "دمشق",
    artisanKey: "moujawhir",
  },
  {
    type: "photo",
    titleAr: "بيت دمشقي بفنائه الداخلي",
    titleEn: "A Damascene House and Its Courtyard",
    descriptionAr: "صورة لفناء تقليدي ببحرته وأشجار النارنج.",
    descriptionEn: "A photograph of a traditional courtyard with its fountain and bitter-orange trees.",
    era: "mandate",
    theme: "architecture",
    location: "دمشق القديمة",
    artisanKey: null,
  },
  {
    type: "document",
    titleAr: "برنامج احتفال مدرسي قديم",
    titleEn: "An Old School Celebration Program",
    descriptionAr: "ورقة مطبوعة توثّق فعالية مدرسية في أربعينيات القرن الماضي.",
    descriptionEn: "A printed sheet documenting a school event in the 1940s.",
    era: "mandate",
    theme: "urban-life",
    location: "دمشق",
    artisanKey: null,
  },
];

async function main() {
  console.log("🌱 بدء عملية الإدخال (seed)...");

  // تنظيف البيانات القديمة أولاً (ArchiveItem قبل Artisan بسبب المفتاح الأجنبي)
  await prisma.archiveItem.deleteMany();
  await prisma.artisan.deleteMany();

  // إدخال الحرفيين والاحتفاظ بخريطة key -> id
  const artisanIdByKey = new Map<string, string>();
  for (const { key, ...data } of artisans) {
    const created = await prisma.artisan.create({ data });
    artisanIdByKey.set(key, created.id);
  }
  console.log(`✓ أُدخل ${artisans.length} حرفيين.`);

  // إدخال عناصر الأرشيف مع ربط الحرفيّ حين يوجد
  for (const { artisanKey, ...data } of items) {
    await prisma.archiveItem.create({
      data: {
        ...data,
        fileUrl: "/archive/placeholder", // placeholder — لا ملفات فعلية بعد
        artisanId: artisanKey ? artisanIdByKey.get(artisanKey) : null,
      },
    });
  }
  console.log(`✓ أُدخل ${items.length} عنصر أرشيف.`);

  console.log("🌱 اكتملت العملية بنجاح.");
}

main()
  .catch((e) => {
    console.error("❌ فشل الإدخال:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
