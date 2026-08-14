-- AlterTable
-- استبدال حقل العصر (era) بحقل السنة (year): الفلترة في بنك الذاكرة صارت
-- بالسنة لأرشيف الصور. قيم era القديمة كانت بيانات تجريبية (seed) فقط.
ALTER TABLE "ArchiveItem" DROP COLUMN "era";
ALTER TABLE "ArchiveItem" ADD COLUMN     "year" INTEGER;
