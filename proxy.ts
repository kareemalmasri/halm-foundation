import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// في Next.js 16 أُعيدت تسمية "middleware" إلى "proxy".
// معالج next-intl هو دالة (request) => NextResponse نمرّرها كتصدير افتراضي للـ proxy.
export default createMiddleware(routing);

export const config = {
  // يُشغّل على كل المسارات عدا api و _next و _vercel والملفات الساكنة
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
