import type { Metadata } from 'next';
import SectionWrap from '../(home)/section-wrap';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    },
    {
      title: t.qrcodes.wechatAdmin.title,
      description: t.qrcodes.wechatAdmin.description,
      image: {
        src: wechatAdminQrUrl,
        alt: t.qrcodes.wechatAdmin.alt,
      },
    },
  ];

  return (
    <main className="min-h-screen">
      <SectionWrap className="py-10 md:py-14 xl:w-full">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {t.title}
            </h1>
            <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {t.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {qrItems.map((item) => (
              <QrCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </SectionWrap>
    </main>
  );
}

type QrImage = {
  src: string;
  alt: string;
};

function QrCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: QrImage;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <PosterImage image={image} />
      </CardContent>
    </Card>
  );
}

function PosterImage({ image }: { image: QrImage }) {
  return (
    <div className="mx-auto flex h-[260px] w-[180px] items-center justify-center overflow-hidden rounded-md border bg-background p-3">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
