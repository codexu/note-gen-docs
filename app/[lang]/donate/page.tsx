import type { Metadata } from 'next';
import {
  BotIcon,
  BugIcon,
  Globe2Icon,
  HeartHandshakeIcon,
  MessageCircleIcon,
  ServerCogIcon,
  Share2Icon,
  SmartphoneIcon,
  StarIcon,
  WalletCardsIcon,
} from 'lucide-react';
import { QrActionPage } from '@/components/marketing/qr-action-page';
import { normalizeLang, siteConfig } from '@/lib/seo';

const content = {
  cn: {
    meta: {
      title: '捐赠 NoteGen - 支持开源持续维护',
      description: '通过自愿捐赠支持 NoteGen 这个开源 AI 知识工作台持续维护。',
    },
    title: '支持 NoteGen',
    description:
      'NoteGen 免费、开源，也需要持续投入开发、测试、发布和维护。如果它已经成为你日常工作的一部分，欢迎分担一点让项目继续运行的成本。',
    badge: '支持开源',
    principles: ['永久免费开源', '无广告', '无捆绑'],
    note: '捐赠支持项目维护本身，不购买功能优先级、私人技术支持或特定功能承诺。无论是否捐赠，核心功能都会保持免费开源。',
    usage: {
      title: '捐赠会用在哪里',
      description: '收到的支持会优先用于承担项目持续运行和发布所需的实际成本。',
      items: [
        {
          title: '模型服务与服务器',
          description: '用于 AI 功能调试、模型 API 调用和必要的测试服务器。',
        },
        {
          title: '域名与基础设施',
          description: '用于官网域名、对象存储，以及图片和下载资源分发。',
        },
        {
          title: 'Apple Developer 账号',
          description: '用于 iOS 与 macOS 应用的签名、发布和 TestFlight。',
        },
        {
          title: '持续维护',
          description: '用于必要的开发、监控和社区服务成本。',
        },
      ],
    },
    sectionTitle: '选择支持方式',
    sectionDescription: '可以通过爱发电按月支持，也可以直接使用支付宝或微信。每一份支持都会用于帮助项目继续维护。',
    afdian: {
      title: '爱发电',
      action: '前往爱发电',
    },
    alternativeSupport: {
      title: '不捐赠，也可以支持',
      description: '钱不是唯一的支持方式。下面这些行动同样能帮助 NoteGen 被看见、发现问题并持续改进。',
      copiedShareAction: '链接已复制',
      items: [
        {
          title: '给 GitHub 点 Star',
          description: '让更多需要本地优先知识工具的人发现 NoteGen。',
          action: '打开 GitHub',
        },
        {
          title: '提交清晰反馈',
          description: '附带复现步骤的问题反馈，可以直接节省排查时间。',
          action: '提交 Issue',
        },
        {
          title: '推荐给需要的人',
          description: '把 NoteGen 分享给真正可能用得上的朋友或同事。',
          action: '分享 NoteGen',
        },
      ],
    },
    qrcodes: {
      alipay: {
        title: '支付宝',
        alt: 'NoteGen 支付宝收款码',
      },
      wechatPay: {
        title: '微信支付',
        alt: 'NoteGen 微信支付收款码',
      },
    },
  },
  en: {
    meta: {
      title: 'Donate to NoteGen - Support Open Source Maintenance',
      description: 'Support the continued maintenance of NoteGen, an open-source AI knowledge workspace.',
    },
    title: 'Support NoteGen',
    description:
      'NoteGen is free and open source, but development, testing, releases, and maintenance still require ongoing work. If it has become part of your daily routine, you are welcome to help share that cost.',
    badge: 'Support open source',
    principles: ['Free and open source', 'Ad-free', 'Bundle-free'],
    note: 'A donation supports the work itself. It does not buy feature priority, private support, or a promise to build something specific. Core features remain free and open source for everyone.',
    usage: {
      title: 'Where your support goes',
      description: 'Contributions are prioritized for the real costs of keeping the project running and available.',
      items: [
        {
          title: 'AI models and servers',
          description: 'Model API usage, AI feature testing, and necessary test servers.',
        },
        {
          title: 'Domain and infrastructure',
          description: 'The website domain, object storage, and distribution of images and downloads.',
        },
        {
          title: 'Apple Developer membership',
          description: 'Signing, releasing, and TestFlight distribution for the iOS and macOS apps.',
        },
        {
          title: 'Ongoing maintenance',
          description: 'Essential development, monitoring, and community service costs.',
        },
      ],
    },
    sectionTitle: 'Choose a way to support',
    sectionDescription: 'Support monthly through Afdian, or contribute directly with Alipay or WeChat Pay. Every contribution helps sustain the project.',
    afdian: {
      title: 'Afdian',
      action: 'Open Afdian',
    },
    alternativeSupport: {
      title: 'Other ways to help',
      description: 'Money is not the only useful form of support. These actions help NoteGen reach people, find problems, and keep improving.',
      copiedShareAction: 'Link copied',
      items: [
        {
          title: 'Star NoteGen on GitHub',
          description: 'Help more people looking for a local-first knowledge tool discover the project.',
          action: 'Open GitHub',
        },
        {
          title: 'Share useful feedback',
          description: 'A clear report with reproduction steps can save hours of investigation.',
          action: 'Open an issue',
        },
        {
          title: 'Recommend it to someone',
          description: 'Share NoteGen with a friend or colleague who may genuinely find it useful.',
          action: 'Share NoteGen',
        },
      ],
    },
    qrcodes: {
      alipay: {
        title: 'Alipay',
        alt: 'NoteGen Alipay donation QR code',
      },
      wechatPay: {
        title: 'WeChat Pay',
        alt: 'NoteGen WeChat Pay donation QR code',
      },
    },
  },
} as const;

const alipayDonationQrUrl = 'https://files.seeusercontent.com/2026/07/06/yCr6/b42e33564e77e762d6ac8083144debb2.jpg';
const wechatPayDonationQrUrl = 'https://files.seeusercontent.com/2026/07/09/5hAw/f3bb03edcf2a3b3987118e7eb56dd1d9.jpg';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${language}/donate`,
      languages: {
        'zh-CN': '/cn/donate',
        en: '/en/donate',
        'x-default': '/cn/donate',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${language}/donate`,
      siteName: siteConfig.name,
      type: 'website',
      locale: language === 'cn' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'cn' ? ['en_US'] : ['zh_CN'],
    },
    twitter: {
      card: 'summary',
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];
  const usageIcons = [BotIcon, Globe2Icon, SmartphoneIcon, ServerCogIcon];
  const alternativeSupportIcons = [StarIcon, BugIcon, Share2Icon];
  const alternativeSupportUrls = [
    'https://github.com/codexu/note-gen',
    'https://github.com/codexu/note-gen/issues',
    undefined,
  ];

  const qrItems = [
    {
      title: t.qrcodes.alipay.title,
      image: {
        src: alipayDonationQrUrl,
        alt: t.qrcodes.alipay.alt,
      },
      icon: WalletCardsIcon,
      priority: true,
    },
    {
      title: t.qrcodes.wechatPay.title,
      image: {
        src: wechatPayDonationQrUrl,
        alt: t.qrcodes.wechatPay.alt,
      },
      icon: MessageCircleIcon,
      priority: false,
    },
  ];

  return (
    <QrActionPage
      badge={t.badge}
      badgeIcon={HeartHandshakeIcon}
      title={t.title}
      description={t.description}
      principles={t.principles}
      note={t.note}
      details={{
        ...t.usage,
        items: t.usage.items.map((item, index) => ({
          ...item,
          icon: usageIcons[index],
        })),
      }}
      sectionTitle={t.sectionTitle}
      sectionDescription={t.sectionDescription}
      items={[
        {
          ...t.afdian,
          href: 'https://afdian.com/a/notegen',
          iconImage: {
            src: 'https://static.afdiancdn.com/static/img/icons/apple-touch-icon-152x152.png',
            alt: language === 'cn' ? '爱发电图标' : 'Afdian icon',
          },
        },
        ...qrItems,
      ]}
      alternativeSupport={{
        ...t.alternativeSupport,
        items: t.alternativeSupport.items.map((item, index) => ({
          ...item,
          icon: alternativeSupportIcons[index],
          href: alternativeSupportUrls[index],
          share:
            index === 2
              ? {
                  path: `/${language}`,
                  title: 'NoteGen',
                  text:
                    language === 'cn'
                      ? 'NoteGen：免费、开源、本地优先的 AI 知识工作台。'
                      : 'NoteGen: a free, open-source, local-first AI knowledge workspace.',
                  label: item.action,
                  copiedLabel: t.alternativeSupport.copiedShareAction,
                }
              : undefined,
        })),
      }}
      layout="stack"
    />
  );
}
