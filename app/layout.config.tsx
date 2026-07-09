import { i18n } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(locale: string): BaseLayoutProps {
  const lang = locale === 'en' ? 'en' : 'cn';

  return {
    i18n,
    nav: {
      url: `/${lang}`,
      title: (
        <>
          <Image
            src="https://s2.loli.net/2025/08/05/IceAMqnBJytp2wE.png"
            alt="NoteGen"
            width={24}
            height={24}
          />
          NOTEGEN.
        </>
      ),
    },
    links: [
      {
        text: lang === 'en' ? 'Docs' : '文档',
        url: `/${lang}/docs`,
        active: 'nested-url',
      },
      {
        text: lang === 'en' ? 'Download' : '下载',
        url: `/${lang}/download`,
        active: 'url',
      },
      {
        text: lang === 'en' ? 'Community' : '交流群',
        url: `/${lang}/community`,
        active: 'url',
      },
      {
        text: lang === 'en' ? 'Business' : '商务合作',
        url: `/${lang}/business`,
        active: 'url',
      },
      {
        text: lang === 'en' ? 'Donate' : '捐赠',
        url: `/${lang}/donate`,
        active: 'url',
      },
    ],
    githubUrl: 'https://github.com/codexu/note-gen',
  };
}
