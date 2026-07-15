import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // اللغات المدعومة: عربي (افتراضي، RTL) وإنجليزي (LTR)
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  // 'always' يعني أن كل المسارات مسبوقة باللغة: /ar و /en
  localePrefix: 'always',
});
