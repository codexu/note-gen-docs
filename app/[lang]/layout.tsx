import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Translations } from 'fumadocs-ui/i18n';
import { GoogleAnalytics } from '@next/third-parties/google';

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

const inter = Inter({
  subsets: ['latin'],
});

export default async function Layout(
  { children, params }: 
  { children: ReactNode, params: Promise<{ lang: string }>}
) {
  const lang = (await params).lang;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales,
            translations: { cn }[lang],
          }}
          search={{
            enabled: false,
          }}>{children}</RootProvider>
      </body>
      <GoogleAnalytics gaId="G-SEWZ8WZX0C" />
    </html>
  );
}
