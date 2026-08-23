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
        text: lang === 'en' ? 'Workflow' : '工作流',
        url: `/${lang}#workflow`,
        active: 'none',
      },
      {
        text: lang === 'en' ? 'Features' : '功能',
        url: `/${lang}#features`,
        active: 'none',
      },
      {
        text: lang === 'en' ? 'Web Clipper' : '网页剪藏',
        url: `/${lang}/web-clipper/download`,
        active: 'url',
      },
      ...(isSelfHostedEnabled
        ? [{
            text: lang === 'en' ? 'Self-hosted' : '自托管',
            url: `/${lang}/self-hosted`,
            active: 'url' as const,
          }]
        : []),
      {
        text: lang === 'en' ? 'Docs' : '文档',
        url: `/${lang}/docs`,
        active: 'nested-url',
      },
      {
        type: 'menu',
        text: lang === 'en' ? 'More' : '更多',
        items: [
          {
            text: lang === 'en' ? 'Community' : '交流群',
            description: lang === 'en' ? 'Join the NoteGen community' : '加入 NoteGen 用户交流群',
            url: `/${lang}/community`,
            active: 'url',
          },
          {
            text: lang === 'en' ? 'Business' : '商务合作',
            description: lang === 'en' ? 'Explore ways to work with NoteGen' : '了解与 NoteGen 的合作方式',
            url: `/${lang}/business`,
            active: 'url',
          },
          {
            text: lang === 'en' ? 'Donate' : '捐赠',
            description: lang === 'en' ? 'Support the open-source project' : '支持 NoteGen 开源项目',
            url: `/${lang}/donate`,
            active: 'url',
          },
        ],
      },
      {
        type: 'custom',
        secondary: true,
        children: <HeaderActions />,
      },
    ],
  };
}
