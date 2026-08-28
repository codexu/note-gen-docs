import { i18n } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { HeaderActions } from '@/components/github-star-link';
import { isSelfHostedEnabled } from '@/lib/self-hosted';

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
    githubUrl: 'https://github.com/codexu/note-gen',
  };
}

export function homeOptions(locale: string): BaseLayoutProps {
  const lang = locale === 'en' ? 'en' : 'cn';
  const options = baseOptions(locale);

  return {
    ...options,
    i18n: false,
    githubUrl: undefined,
    searchToggle: { enabled: false },
    themeSwitch: { enabled: false },
    links: [
      {
        text: lang === 'en' ? 'Docs' : '文档',
        url: `/${lang}/docs`,
        active: 'nested-url',
      },
      {
        text: lang === 'en' ? 'Web Clipper' : '网页剪藏',
        url: `/${lang}/web-clipper/download`,
        active: 'url',
      },
      ...(isSelfHostedEnabled
        ? [{
            text: (
              <span className="inline-flex items-center gap-1.5">
                {lang === 'en' ? 'Self-hosted' : '自托管'}
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none text-primary">
                  Beta
                </span>
              </span>
            ),
            url: `/${lang}/self-hosted`,
            active: 'url' as const,
          }]
        : []),
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
      {
        type: 'custom',
        secondary: true,
        children: <HeaderActions />,
      },
    ],
  };
}
