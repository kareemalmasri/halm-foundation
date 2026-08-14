// القيم المسموحة للفلاتر — تُطابق بذور قاعدة البيانات (seed) ومفاتيح الترجمة.
// تُستخدم أيضاً للتحقّق من مدخلات URL قبل بنائها في شرط WHERE.
export const ARCHIVE_TYPES = [
  "photo",
  "document",
  "audio",
  "video",
  "event",
] as const;

// سنوات أرشيف الصور — تنازلياً (الأحدث أولاً) كما تظهر في القائمة المنسدلة
export const ARCHIVE_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
] as const;

// فلتر السنة يخصّ أرشيف الصور فقط، فلا يظهر إلا مع هذا النوع
export const YEAR_FILTER_TYPE = "photo";

export type ArchiveType = (typeof ARCHIVE_TYPES)[number];
export type ArchiveYear = (typeof ARCHIVE_YEARS)[number];

// يعيد القيمة فقط إن كانت ضمن القائمة البيضاء، وإلا سلسلة فارغة (= بلا فلتر)
export function normalizeType(value?: string): ArchiveType | "" {
  return (ARCHIVE_TYPES as readonly string[]).includes(value ?? "")
    ? (value as ArchiveType)
    : "";
}

// السنة تصل كنص من الـURL؛ تُقبل فقط إن طابقت إحدى السنوات المسموحة،
// ويُعاد الرقم جاهزاً لشرط WHERE (الحقل Int في القاعدة) أو null بلا فلتر.
export function normalizeYear(value?: string): ArchiveYear | null {
  const parsed = Number(value);
  return (ARCHIVE_YEARS as readonly number[]).includes(parsed)
    ? (parsed as ArchiveYear)
    : null;
}
