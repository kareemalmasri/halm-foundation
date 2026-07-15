import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// مغلّفات تنقّل واعية باللغة (تحافظ على بادئة اللغة في المسار)
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
