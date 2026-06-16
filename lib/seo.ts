export type SupportedLang = 'cn' | 'en';

export const siteConfig = {
  name: 'NoteGen',
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codexu.github.io'),
  githubUrl: 'https://github.com/codexu/note-gen',
  licenseUrl: 'https://github.com/codexu/note-gen/blob/dev/LICENSE',
};

export const homeSeo = {
  cn: {
    title: 'NoteGen - 开源免费的 AI Markdown 笔记软件',
    description: 'NoteGen 是开源免费的跨平台 AI Markdown 笔记软件，支持先记录再整理、AI 自动成文、本地笔记、多端同步和自定义模型。',
    keywords: [
      'NoteGen',
      'AI 笔记软件',
      'Markdown 笔记',
      '开源笔记软件',
      '免费笔记软件',
      '跨平台笔记',
      '先记录再整理',
      'AI 写作',
      '本地笔记',
      '免费同步',
    ],
  },
  en: {
    title: 'NoteGen - Open Source AI Markdown Notes',
    description: 'NoteGen is an open-source AI Markdown note-taking app for capturing first, organizing later, syncing across devices, and turning notes into editable drafts.',
    keywords: [
      'NoteGen',
      'AI note-taking app',
      'Markdown notes',
      'open source notes app',
      'free notes app',
      'cross-platform notes',
      'capture first organize later',
      'AI writing',
      'local-first notes',
      'free sync',
    ],
  },
} satisfies Record<SupportedLang, {
  title: string;
  description: string;
  keywords: string[];
}>;

export function normalizeLang(lang: string): SupportedLang {
  return lang === 'en' ? 'en' : 'cn';
}

export function getHtmlLang(lang: SupportedLang) {
  return lang === 'cn' ? 'zh-CN' : 'en';
}

export function getHomeAlternates(lang: SupportedLang) {
  return {
    canonical: `/${lang}`,
    languages: {
      'zh-CN': '/cn',
      en: '/en',
      'x-default': '/cn',
    },
  };
}

export function getHomeJsonLd(lang: SupportedLang) {
  const seo = homeSeo[lang];
  const htmlLang = getHtmlLang(lang);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Windows, macOS, Linux, iOS, Android',
    url: new URL(`/${lang}`, siteConfig.url).toString(),
    downloadUrl: new URL(`/${lang}/download`, siteConfig.url).toString(),
    codeRepository: siteConfig.githubUrl,
    license: siteConfig.licenseUrl,
    isAccessibleForFree: true,
    inLanguage: htmlLang,
    description: seo.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: lang === 'cn'
      ? [
          '先记录，再整理',
          'AI 自动整理成 Markdown 笔记',
          '桌面端和移动端记录',
          '多端免费同步',
          '本地笔记库',
          '开源免费',
        ]
      : [
          'Capture first, organize later',
          'AI organizes notes into Markdown drafts',
          'Capture on desktop and mobile',
          'Free sync across devices',
          'Local note library',
          'Open source and free',
        ],
    sameAs: [
      siteConfig.githubUrl,
    ],
  };
}
