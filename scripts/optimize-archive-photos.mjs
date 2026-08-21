import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SOURCE_BASE = "C:/Users/Kareem/Desktop/The Datawebsite/برامج 2016 -2026";
const OUTPUT_BASE = join(process.cwd(), "public", "archive", "photos");

const DISPLAY_WIDTH = 1920;
const DISPLAY_QUALITY = 82;
const THUMB_WIDTH = 600;
const THUMB_QUALITY = 78;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);

async function optimizeYear(year) {
  const sourceDir = join(SOURCE_BASE, String(year));
  if (!existsSync(sourceDir)) {
    console.log(`⚠️  ${year}: لا يوجد مجلد مصدر — تخطّي`);
    return null;
  }

  const outDir = join(OUTPUT_BASE, String(year));
  const thumbDir = join(outDir, "thumbs");
  mkdirSync(thumbDir, { recursive: true });

  const files = readdirSync(sourceDir)
    .filter((f) => IMAGE_EXTENSIONS.has(f.slice(f.lastIndexOf(".")).toLowerCase()))
    .sort();

  let sourceBytes = 0;
  let outputBytes = 0;
  let index = 0;

  for (const file of files) {
    index++;
    const sourcePath = join(sourceDir, file);
    sourceBytes += statSync(sourcePath).size;

    const name = `${year}-${String(index).padStart(3, "0")}.jpg`;
    const displayPath = join(outDir, name);
    const thumbPath = join(thumbDir, name);

    await sharp(sourcePath)
      .rotate()
      .resize({ width: DISPLAY_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: DISPLAY_QUALITY, mozjpeg: true })
      .toFile(displayPath);

    await sharp(sourcePath)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);

    outputBytes += statSync(displayPath).size + statSync(thumbPath).size;

    if (index % 25 === 0) console.log(`   ... ${index}/${files.length}`);
  }

  console.log(
    `✓ ${year}: ${files.length} صورة — ${mb(sourceBytes)}MB ← ${mb(outputBytes)}MB ` +
      `(توفير ${(100 - (outputBytes / sourceBytes) * 100).toFixed(0)}%)`
  );

  return { year, count: files.length, sourceBytes, outputBytes };
}

const years = process.argv.slice(2);
if (years.length === 0) {
  console.error("مطلوب تمرير سنة واحدة على الأقل، مثال: node scripts/optimize-archive-photos.mjs 2017");
  process.exit(1);
}

let totalSource = 0;
let totalOutput = 0;
let totalCount = 0;

for (const year of years) {
  const result = await optimizeYear(year);
  if (result) {
    totalSource += result.sourceBytes;
    totalOutput += result.outputBytes;
    totalCount += result.count;
  }
}

console.log(
  `\n══ المجموع: ${totalCount} صورة — ${mb(totalSource)}MB ← ${mb(totalOutput)}MB ` +
    `(توفير ${(100 - (totalOutput / totalSource) * 100).toFixed(0)}%)`
);
