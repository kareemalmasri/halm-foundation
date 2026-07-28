# حالة المشروع — مؤسسة حلم دمشقي

آخر تحديث: 2026-07-18

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

## 7. بنك الذاكرة — الجزء الأول (الأرشيف + الفلاتر)
- **أول استهلاك فعلي لـPrisma Client في الواجهة.** Singleton في [lib/prisma.ts](lib/prisma.ts).
- **اكتشاف مهم في عميل Prisma 7 المولَّد**: الخيار `datasourceUrl` **أُزيل** — العميل يقبل إمّا `adapter` وإمّا `accelerateUrl`. بما أن `DATABASE_URL` هو `prisma+postgres://...` (Prisma Postgres عبر Accelerate)، يُمرَّر كـ`new PrismaClient({ accelerateUrl: ... })`. (schema.prisma بلا `url` في datasource، فلا قراءة تلقائية للبيئة.)
- **[prisma/seed.ts](prisma/seed.ts)**: يُدخل 5 حرفيين + 14 عنصر أرشيف (photo/document/audio، 3 عصور، مواضيع متنوعة)، 7 عناصر مرتبطة بحرفيين. يُشغَّل بـ`npx tsx prisma/seed.ts`. سُجِّل في `prisma.config.ts` تحت `migrations.seed`. **تم إدخاله فعلياً في القاعدة الحقيقية** (تأكيد مباشر: total=14, artisans=5).
- **تبعية جديدة**: `tsx` (devDependency) لتشغيل سكربتات TS مثل seed.
- **[app/[locale]/memory-bank/page.tsx](app/[locale]/memory-bank/page.tsx)**: Server Component async يجلب من القاعدة عبر `prisma.archiveItem.findMany({ where })`. `params`/`searchParams` كـ`Promise` (نمط Next 16).
- **الفلاتر تعمل فعلياً عبر URL search params — لا فلترة عميل وهمية**: النوع (`type`) والعصر (`era`) يُبنيان في شرط `WHERE` حقيقي. القيم تُتحقَّق عبر قائمة بيضاء في [lib/archive-filters.ts](lib/archive-filters.ts) (مدخل غير صالح = يُتجاهَل، بلا فلتر). شريط الفلاتر [components/MemoryFilterBar.tsx](components/MemoryFilterBar.tsx) نموذج `GET` أصلي (Server Component)، وجهته المسار المُلغَّم باللغة عبر `getPathname`.
- **تُحقِّق يدوياً**: عدد بطاقات `<article>` المُصيَّرة يطابق تماماً `count` من القاعدة لكل فلتر (photo=7, document=4, audio=3, mandate=6, contemporary=4, audio+mandate=1, document+contemporary=0). حالة "لا نتائج" تظهر بنصها الصحيح بالعربية والإنجليزية.
- بطاقة أرشيف [components/ArchiveCard.tsx](components/ArchiveCard.tsx) بنفس أسلوب `bg-ivory` مع شارة النوع وعنوان العصر. أيقونات جديدة: `PhotoIcon`, `DocumentIcon`, `AudioIcon` + خريطة `ARCHIVE_TYPE_ICONS`.
- namespace `memoryBank` في ملفي الترجمة. Breadcrumb مضاف. `SECTION_HREFS.memory` عُدِّل من `/memory` إلى `/memory-bank` (رابط Navbar يعمل).
- **لم تُبنَ** باقي الأقسام الفرعية لبنك الذاكرة (التراث المهدَّد، كنوز بشرية حية، المعرض، الأرشيف الصوتي، الخط الزمني) — عمداً، ستُبنى تباعاً.

## 8. صفحة الأخبار (/news)
- **[app/[locale]/news/page.tsx](app/[locale]/news/page.tsx)**: قائمة 6 أخبار وهمية (placeholder ثابت بالكود، **بلا اتصال بقاعدة البيانات** — نموذج `NewsPost` موجود للمستقبل لكن غير مستخدَم بعد).
- مكوّن جديد [components/NewsCard.tsx](components/NewsCard.tsx): بطاقة أفقية (`sm:flex-row`) — أيقونة `NewspaperIcon` في شارة + تاريخ ذهبي + عنوان + ملخّص. تحوي `min-w-0 flex-1` على حاوية النص (إصلاح طفح flexbox على الجوال).
- namespace `news` في ملفي الترجمة: `hero` + 6 عناصر (`item1..item6`) لكل منها `date`/`title`/`summary` بتواريخ منطقية موزّعة على آخر ~6 أشهر، بترجمة عربي/إنجليزي متسقة (لا آلية).
- Breadcrumb مضاف. رابط Navbar لـ"الأخبار" (`SECTION_HREFS.news = "/news"`) يعمل فعلياً الآن.

## 9. صفحة التواصل (/contact) — نموذج بريد فعلي عبر Resend
- **[app/[locale]/contact/page.tsx](app/[locale]/contact/page.tsx)** + [components/ContactForm.tsx](components/ContactForm.tsx) (Client، `useActionState` + `useFormStatus` pattern) + **[app/[locale]/contact/actions.ts](app/[locale]/contact/actions.ts)** (Server Action، ليس API route).
- الحقول: الاسم، البريد، الموضوع (اختياري)، الرسالة. تحقّق أساسي عبر **`zod`** (حقول مطلوبة + صيغة بريد صحيحة) بلغتين. حالة تحميل على الزر، رسالة نجاح (وتفريغ الحقول)، رسالة خطأ + تسجيل الخطأ الفعلي في console.
- **تبعية جديدة**: `resend` (v6.17.2). واجهة العميل: `new Resend(apiKey)` ثم `resend.emails.send({from, to, replyTo, subject, text})` — تُعيد `{data, error}` (لا ترمي استثناءً على أخطاء الـAPI، فنفحص `error` صراحةً + try/catch للأعطال الشبكية).
- **قيد الخطة المجانية**: بلا نطاق موثّق، الإرسال فقط من `onboarding@resend.dev` إلى **البريد المسجَّل بحساب Resend نفسه**. لذا `CONTACT_EMAIL` حالياً بريد شخصي مؤقت (`almasrikarem@gmail.com`) — يُبدَّل لاحقاً ببريد المؤسسة. الخطة المجانية: 3000 بريد/شهر، 100/يوم.
- متغيّرات بيئة جديدة في `.env.local`: `RESEND_API_KEY` + `CONTACT_EMAIL`. كل النصوص من namespace `contact` بالترجمة.

## 10. حل عطل قاعدة البيانات النهائي (Prisma Accelerate — حادثة eu-central-1)
- **الحادثة**: بعد إعداد Accelerate بنجاح (القسم 4)، بدأت الاستعلامات تفشل فجأة بخطأ **`P6008`** ("Accelerate was not able to connect to your database... error requesting Query Engine from pool").
- **التشخيص الكامل**: تأكدنا أن كل شيء من طرفنا سليم — القاعدة حية وفيها بيانات (عبر Prisma Studio من المتصفح)، Accelerate مفعّل، المفتاح صحيح (جرّبنا مفتاحاً جديداً)، صيغة الكود صحيحة، وحتى بلا VPN نفس الخطأ. صفحة حالة Prisma الرسمية أكّدت **عطلاً حقيقياً معلناً في منطقة `eu-central-1`** ("allocations of new query engines in eu-central-1"، Workarounds: none).
- **الاكتشاف الحاسم**: أداة `npx create-db` تختار منطقة القاعدة تلقائياً **حسب الموقع الجغرافي لـIP** (الـVPN). القواعد الجديدة كانت تقع في `eu-central-1` المعطوبة، وحتى القاعدة الأقدم في `eu-west-3` تأثّرت.
- **الحل النهائي**: تبديل موقع الـVPN إلى **الولايات المتحدة** → `create-db` أنشأ القاعدة في **`us-east-1`** (منطقة سليمة). ثم `migrate dev` + `seed` نجحا فوراً بلا أي خطأ.
- **الحالة الحالية**: القاعدة الفعّالة في `us-east-1`، و`DATABASE_URL` الحالي في `.env.local` يشير إليها عبر Accelerate. القاعدة تعمل وبنك الذاكرة يجلب منها فعلياً.

## 11. الخطوط (Amiri عربي / Cormorant Garamond إنجليزي)
- **[app/fonts.ts](app/fonts.ts)** (جديد): تحميل `Amiri` و`Cormorant_Garamond` عبر **`next/font/google`** (لا CDN، لا `@import`). أُزيلت حزمة `geist` القديمة بالكامل (`npm uninstall geist`) وحُذفت استيراداتها من الـlayout.
- **التبديل حسب اللغة عبر متغيّر CSS واحد**: في `globals.css`، `--font-body` يساوي Cormorant افتراضياً، ويُستبدل بـ Amiri عبر محدِّد `html[lang="ar"]` — فيُطبَّق تلقائياً على كل الموقع بلا تكرار في المكوّنات.
- **إصلاح خطأ مرجع دائري**: كان `--font-sans: var(--font-sans)` داخل `@theme inline` (مرجع ذاتي دائري) يُسقط الخط للافتراضي (sans-serif عادي). الحل: استخدام اسمين مختلفين — `--font-body` للتبديل و`--font-sans` يشير إليه. (تحقّقنا عبر CDP أن `getComputedStyle` يُرجع الخط الصحيح فعلياً في كلا اللغتين.)
- أُزيلت قاعدة `body { font-family: Arial... }` القديمة التي كانت تحجب أي خط مخصّص.
- **أوزان مؤكَّدة من توثيق next/font المرفق**: Amiri يوفّر (400, 700) فقط؛ Cormorant Garamond يوفّر (300–700 + variable).

## 12. إصلاحات بصرية دقيقة (أحجام + تخطيط)
- **حجم الخط عبر الموقع**: كُبِّر خطوة كاملة على كل الصفحات/المكوّنات، ثم صُغِّر خطوة بناءً على المراجعة البصرية (استقرّ على مقاسات متوازنة).
- **إصلاح Hero يكبر عند تبديل اللغة**: السبب — العنوان الإنجليزي أطول فينكسر لسطرين بينما العربي بسطر واحد، فيطول القسم والصورة (`fill`) معه. الحل: ارتفاع أدنى ثابت على `<section>` (`min-h-[560px] sm:min-h-[640px]`) مع توسيط عمودي. النتيجة: القسم **640px بالضبط في كلا اللغتين** (تحقّق رقمي عبر CDP).
- **إصلاح Navbar يتغيّر حجمه عند تبديل اللغة**: السبب — قياساته كانت بوحدات `rem` التي تتبع حجم جذر الصفحة، وهو مختلف بين اللغتين (`html` بـ `1rem` إنجليزي / `1.1rem` عربي). الحل: تحويل كل قياسات [components/Navbar.tsx](components/Navbar.tsx) و[components/LocaleSwitcher.tsx](components/LocaleSwitcher.tsx) من `rem` إلى **بكسل ثابت** (الشعار `88px`، المسافات، الحشو، حجم الخط) — فبقي الشريط متطابقاً 100% بين اللغتين (تحقّق رقمي: header 124px، logo 88px، gaps 66px في كليهما). ثم كُبِّر خط الروابط إلى `20px` بطلب المستخدم.
- **ملاحظة**: زر تبديل اللغة (`LocaleSwitcher`) أُعيد تصميمه فعلاً — أصبح دائرة بأيقونة كرة أرضية (`GlobeIcon`) وشارة حرف اللغة الحالية (ع/E)، بدل الزر النصي القديم.

## تحسينات بصرية مؤجَّلة (بعد اكتمال كل الأقسام الوظيفية)
- [ ] إضافة تأثيرات hover فخمة عبر الموقع (بطاقات، أزرار، روابط) — توهج ذهبي، انتقالات ناعمة، لا تأثيرات بسيطة افتراضية.
- [ ] إعادة تصميم قائمة الهمبرغر على الشاشات الصغيرة — موجودة ووظيفية (زر يظهر تحت `sm:`، قائمة منسدلة)، لكن تصميمها بسيط بصرياً؛ تحتاج لمسة أكثر احترافية لاحقاً.

## للمتابعة في الجلسة القادمة
- **الأقسام الفرعية المتبقية لبنك الذاكرة**: التراث المهدَّد، كنوز بشرية حية، المعرض، الأرشيف الصوتي، الخط الزمني — تُبنى تباعاً بنفس نمط القسم 7 (استعلام Prisma حقيقي + فلاتر URL عند اللزوم).
- **ربط النماذج المتبقية بواجهات فعلية**: `Artisan` جاهز في القاعدة ومرتبط بالعناصر لكن لا واجهة تعرضه؛ `TrainingProgram`, `NewsPost`, `Partner`, `ContactMessage` بلا استهلاك واجهة بعد. **ملاحظة**: صفحة الأخبار حالياً placeholder ثابت (لا تقرأ من `NewsPost`)، ونموذج التواصل يرسل عبر Resend (لا يخزّن في `ContactMessage`) — كلاهما يُربَط بالقاعدة لاحقاً عند اللزوم.
- **Resend للإنتاج**: تبديل `CONTACT_EMAIL` لبريد المؤسسة الرسمي، وتوثيق نطاق فعلي في Resend للإرسال من عنوان حقيقي (مثل `contact@...`) لأي مستلِم بدل القيد الحالي.
- زر "تحميل دليل التدريب" في `/training/2026` بلا وظيفة فعلية بعد (لا ملف مرفق) — يحتاج ربطاً بملف PDF حقيقي.
- **تنبيه بيئة متكرر**: خادم `next dev` أحياناً لا يلتقط تغييرات معيّنة (خاصة CSS) بالـHMR — عند الشك، `build` نظيف أو إعادة تشغيل السيرفر يحسم. كما أن `create-db` يختار منطقة القاعدة حسب موقع الـVPN.
