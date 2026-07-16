// القيم المسموحة للفلاتر — تُطابق بذور قاعدة البيانات (seed) ومفاتيح الترجمة.
// تُستخدم أيضاً للتحقّق من مدخلات URL قبل بنائها في شرط WHERE.
export const ARCHIVE_TYPES = ["photo", "document", "audio"] as const;
export const ARCHIVE_ERAS = [
  "ottoman-late",
  "mandate",
  "contemporary",
] as const;

export type ArchiveType = (typeof ARCHIVE_TYPES)[number];
export type ArchiveEra = (typeof ARCHIVE_ERAS)[number];

// يعيد القيمة فقط إن كانت ضمن القائمة البيضاء، وإلا سلسلة فارغة (= بلا فلتر)
export function normalizeType(value?: string): ArchiveType | "" {
  return (ARCHIVE_TYPES as readonly string[]).includes(value ?? "")
    ? (value as ArchiveType)
    : "";
}

export function normalizeEra(value?: string): ArchiveEra | "" {
  return (ARCHIVE_ERAS as readonly string[]).includes(value ?? "")
    ? (value as ArchiveEra)
    : "";
}
