# حالة المشروع — مؤسسة حلم دمشقي

آخر تحديث: 2026-07-16 (بعد commit `3ed2d0f`)

## 1. الأساس (i18n)
- **Next.js 16.2.10 + Tailwind v4 + next-intl 4.13.2**، مسارات عربي/إنجليزي تحت `app/[locale]/`.
- `proxy.ts` (بديل `middleware` المُهمَل في Next 16) يكتشف اللغة ويوجّه `/` → `/ar` (الافتراضية) أو `/en`.
- `i18n/routing.ts` + `navigation.ts` + `request.ts`، والرسائل في `messages/ar.json` و`en.json`.
- `LayoutProps<"/[locale]">` مع `params` كـ`Promise` (تغيير جوهري في Next 16).
- [components/LocaleSwitcher.tsx](components/LocaleSwitcher.tsx) يبدّل اللغة مع حفظ المسار، ويقلب `dir="rtl/ltr"` على `<html>`.

## 2. الثيم
ثلاثة ألوان في `app/globals.css` (`@theme inline` — طريقة Tailwind v4):
- **`ink`** `#1A1410` (أسود دافئ) — الخلفيات.
- **`ivory`** `#EDE4D3` (عاجي) — خلفيات البطاقات/الأزرار الفاتحة.
- **`gold`** `#C9A24B` — التمييز (عناوين، حدود، شارات).

(استُبدلت ألوان أولية سابقة `navy`/`maroon` بالكامل بهذين اللونين، مع تصحيح تباين النصوص في كل موضع.)

## 3. الصفحة الرئيسية
- **Navbar**: شعار + 6 روابط أقسام + مبدّل اللغة، خلفية `bg-ink`.
- **Hero**: صورة خلفية (`public/images/hero-background.png`) عبر `next/image` (`fill` + `preload` بدل `priority` المُهمَل في Next 16) + تدرّج تعتيم + عنوان/وصف/زرّان.
- **نظرة عامة على الأقسام**: 5 بطاقات (استُبعدت "الرئيسية" لأنها ذاتية المرجع) بأيقونات SVG يدوية، تخطيط flexbox متجاوب (3 أعلى + 2 موسّطة على سطح المكتب)، روابط `Link` حقيقية إلى مسارات الأقسام (غير مبنية بعد).
- **Footer**: اسم المؤسسة، حقوق نشر ديناميكية، أيقونات تواصل اجتماعي placeholder.
- كل النصوص من ملفات الترجمة — لا نص ثابت.

## 4. قاعدة البيانات
- **Prisma 7.8.0** — تغييرات جوهرية عن الإصدارات المعروفة: مولّد `prisma-client` (لا `prisma-client-js`) مع `output` إلزامي، و`prisma.config.ts` إلزامي لتحميل متغيرات البيئة (لم يعد `.env`/`.env.local` يُحمَّل تلقائياً).
- **[prisma/schema.prisma](prisma/schema.prisma)**: 6 نماذج — `ArchiveItem`, `Artisan`, `TrainingProgram`, `NewsPost`, `Partner`, `ContactMessage` (مع علاقة `ArchiveItem → Artisan`).
- **عقبة الشبكة**: Neon فشل باستمرار (`P1001`) — أثبتنا عبر فحص TCP خام أن VPN المستخدم يُسقط بروتوكول Postgres الخام (`SSLRequest`) تماماً بغض النظر عن الخادم (فشل أيضاً مع Prisma Postgres عبر الاتصال المباشر منفذ 5432).
- **الحل الناجح**: تفعيل **Prisma Accelerate** (`prisma+postgres://accelerate.prisma-data.net/?api_key=...`) — يعمل عبر HTTPS منفذ 443، يتجاوز حجب الشبكة تماماً.
- **النتيجة**: `npx prisma migrate dev --name init` نجحت فعلياً — الجداول الستة مُنشأة في القاعدة الحقيقية (migration محفوظة في `prisma/migrations/20260715222309_init/`)، والـclient مولَّد في `generated/prisma`.
- ملاحظة: `@prisma/extension-accelerate` **غير مطلوبة** للاتصال الأساسي — فقط لميزات إضافية اختيارية (Edge caching). القاعدة "Prisma Postgres" تفهم بروتوكول `prisma+postgres://` أصلاً.

## 5. مركز التدريب
- **[app/[locale]/training/page.tsx](app/[locale]/training/page.tsx)**: صفحة رئيسية بنفس نمط `/about` — نبذة + 4 بطاقات `CardLink` (الحرف الدمشقية، الحرف الأرمنية، أرشيف البرامج، برنامج 2026).
- **`/training/damascene`** و **`/training/armenian`**: قوائم تخصصات وهمية (5 و4 على التوالي) ببطاقات بسيطة (عنوان + وصف سطر واحد).
- **`/training/archive`**: قائمة زمنية (2016–2025) بتصميم خط جانبي (`border-s-2`) يدعم RTL/LTR تلقائياً.
- **`/training/2026`**: وصف فقرة + قائمة مكوّنات مرقّمة + زر "تحميل دليل التدريب" (placeholder بلا ملف فعلي).
- كل المحتوى تحت namespace `training` في `messages/ar.json`/`en.json` — نصوص مؤقتة (placeholder) ستُستبدل لاحقاً.
- أيقونات جديدة أُضيفت في [components/icons.tsx](components/icons.tsx): `ChiselIcon`, `KnotIcon`, `DownloadIcon`.
- رابط Navbar لـ"مركز التدريب" كان جاهزاً مسبقاً عبر `nav-sections.ts` (`SECTION_HREFS.training = "/training"`) — لم يحتج تعديل.

## 6. التنقّل الداخلي (Breadcrumb)
- مكوّن جديد [components/Breadcrumb.tsx](components/Breadcrumb.tsx): قائمة "الرئيسية > القسم > الصفحة الحالية"، آخر عنصر بلا رابط (الصفحة الحالية) بلون `gold`، البقية روابط قابلة للنقر.
- طُبِّق على كل الصفحات الفرعية الموجودة: `/about/story`, `/about/team`, `/about/vision`, و`/training/damascene`, `/training/armenian`, `/training/archive`, `/training/2026`.
- **الحالة**: تم حل الملاحظة المعلّقة السابقة بخصوص التنقّل (كانت مسجّلة أدناه) — أصبحت نمطاً قياسياً يُطبَّق تلقائياً عند بناء أي صفحة فرعية جديدة (Memory Bank, News لاحقاً).

## تحسينات بصرية مؤجَّلة (بعد اكتمال كل الأقسام الوظيفية)
- [ ] إضافة تأثيرات hover فخمة عبر الموقع (بطاقات، أزرار، روابط) — توهج ذهبي، انتقالات ناعمة، لا تأثيرات بسيطة افتراضية.
- [ ] إعادة تصميم زر تبديل اللغة (AR/EN) ليكون أكثر تميزاً بصرياً بدل الزر النصي البسيط الحالي.
- [ ] إعادة تصميم قائمة الهمبرغر على الشاشات الصغيرة — تصميمها الحالي بسيط وغير احترافي بصرياً (بلا أيقونات، بلا تنظيم مميز)؛ يحتاج تصميماً أكثر احترافية عند التنفيذ اللاحق.

## للمتابعة في الجلسة القادمة
- **مشكلة Navbar على الجوال** (< ~420px): الروابط لا تلتفّ بشكل صحيح، تحتاج معالجة منفصلة (لم تُحل بعد).
- صفحات الأقسام المتبقية (`/memory`, `/news`, `/contact`) غير مبنية بعد — فقط الروابط جاهزة. عند بنائها، طبّق نفس نمط `Breadcrumb` المستخدم في `/about` و`/training`.
- ربط النماذج الستة فعلياً بواجهات المستخدم (لا يوجد استهلاك حقيقي للـPrisma Client في الواجهة بعد).
- زر "تحميل دليل التدريب" في `/training/2026` بلا وظيفة فعلية بعد (لا ملف مرفق) — يحتاج ربطاً بملف PDF حقيقي لاحقاً.
