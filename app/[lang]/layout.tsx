import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Translations } from 'fumadocs-ui/i18n';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { getHtmlLang, normalizeLang, siteConfig } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  applicationName: siteConfig.name,
  creator: 'codexu',
  publisher: 'codexu',
  referrer: 'origin-when-cross-origin',
};

const cn: Partial<Translations> = {
  search: '搜索',
};

const locales = [
  {
    name: '简体中文',
    locale: 'cn',
  },
  {
    name: 'English',
    locale: 'en',
  },
];

export default async function Layout(
  { children, params }: 
  { children: ReactNode, params: Promise<{ lang: string }>}
) {
  const lang = (await params).lang;
  const htmlLang = getHtmlLang(normalizeLang(lang));

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales,
            translations: { cn }[lang],
          }}
          search={{
            enabled: true,
          }}>{children}</RootProvider>
      </body>
      <GoogleAnalytics gaId="G-SEWZ8WZX0C" />
    </html>
  );
}
