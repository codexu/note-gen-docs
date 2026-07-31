import type { Metadata } from 'next';
import { MessageCircleIcon, UsersRoundIcon } from 'lucide-react';
import { QrActionPage } from '@/components/marketing/qr-action-page';
import { normalizeLang, siteConfig } from '@/lib/seo';

const content = {
  cn: {
    meta: {
      title: 'NoteGen 交流群 - QQ 群与微信群入口',
      description: '加入 NoteGen 交流群，反馈问题、交流使用经验，或联系微信群管理员入群。',
    },
    title: '加入 NoteGen 交流群',
    description:
      '可以在交流群反馈问题、交流使用经验。QQ 群可直接扫码加入，微信群请备注 NoteGen 入群。',
    badge: 'NoteGen 社区',
    principles: ['问题反馈', '使用交流', '经验分享'],
    note: '交流群适合讨论使用方式和反馈问题。提交可复现的 Bug 或功能建议时，推荐同时在 GitHub 创建 Issue。',
    sectionTitle: '选择加入方式',
    sectionDescription: 'QQ 群可直接加入；微信群需要先添加管理员，并备注 NoteGen。',
    qrcodes: {
      qq: {
        title: 'QQ 群',
        description: '扫码加入 QQ 交流群。',
        alt: 'NoteGen QQ 群二维码',
      },
      wechatAdmin: {
        title: '微信群管理员',
        description: '备注 NoteGen 入群。',
        alt: 'NoteGen 微信群管理员二维码',
      },
    },
  },
  en: {
    meta: {
      title: 'NoteGen Community - QQ and WeChat Group Access',
      description: 'Join the NoteGen community for feedback, usage discussions, and WeChat group access.',
    },
    title: 'Join the NoteGen community',
    description:
      'Use the community groups for feedback and usage discussions. Scan the QQ group QR directly, or mention NoteGen for WeChat group access.',
    badge: 'NoteGen community',
    principles: ['Feedback', 'Usage discussions', 'Shared experience'],
    note: 'Community groups are best for discussion and feedback. For reproducible bugs or feature requests, opening a GitHub Issue is also recommended.',
    sectionTitle: 'Choose how to join',
    sectionDescription: 'Join QQ directly, or add the WeChat admin and mention NoteGen.',
    qrcodes: {
      qq: {
        title: 'QQ group',
        description: 'Scan to join the QQ community.',
        alt: 'NoteGen QQ group QR code',
      },
      wechatAdmin: {
        title: 'WeChat group admin',
        description: 'Mention NoteGen for group access.',
        alt: 'NoteGen WeChat group admin QR code',
      },
    },
  },
} as const;

const qqGroupQrUrl = 'https://files.seeusercontent.com/2026/07/06/wy6R/448631047-08d1ccbc-5909-483d-a41.png';
const wechatAdminQrUrl = 'https://files.seeusercontent.com/2026/07/06/W6mi/590254361-d7e2773a-0c31-4247-a4d.png';

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
      canonical: `/${language}/community`,
      languages: {
        'zh-CN': '/cn/community',
        en: '/en/community',
        'x-default': '/cn/community',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${language}/community`,
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

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];

  const qrItems = [
    {
      title: t.qrcodes.qq.title,
      description: t.qrcodes.qq.description,
      image: {
        src: qqGroupQrUrl,
        alt: t.qrcodes.qq.alt,
      },
      icon: UsersRoundIcon,
      priority: true,
    },
    {
      title: t.qrcodes.wechatAdmin.title,
      description: t.qrcodes.wechatAdmin.description,
      image: {
        src: wechatAdminQrUrl,
        alt: t.qrcodes.wechatAdmin.alt,
      },
      icon: MessageCircleIcon,
    },
  ];

  return (
    <QrActionPage
      badge={t.badge}
      badgeIcon={UsersRoundIcon}
      title={t.title}
      description={t.description}
      principles={t.principles}
      note={t.note}
      sectionTitle={t.sectionTitle}
      sectionDescription={t.sectionDescription}
      items={qrItems}
    />
  );
}
