export const ARCHIVE_TYPES = [
  "photo",
  "document",
  "audio",
  "video",
  "event",
] as const;

export const ARCHIVE_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
] as const;

export const YEAR_FILTER_TYPE = "photo";

export type ArchiveType = (typeof ARCHIVE_TYPES)[number];
export type ArchiveYear = (typeof ARCHIVE_YEARS)[number];

export function normalizeType(value?: string): ArchiveType | "" {
  return (ARCHIVE_TYPES as readonly string[]).includes(value ?? "")
    ? (value as ArchiveType)
    : "";
}

export function normalizeYear(value?: string): ArchiveYear | null {
  const parsed = Number(value);
  return (ARCHIVE_YEARS as readonly number[]).includes(parsed)
    ? (parsed as ArchiveYear)
    : null;
}
