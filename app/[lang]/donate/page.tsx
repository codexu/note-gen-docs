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
      title: '捐赠 NoteGen - 支持开源持续维护',
      description: '通过捐赠、反馈、贡献代码或推广 NoteGen，支持这个开源 AI Markdown 笔记项目持续维护。',
    },
    title: '支持 NoteGen',
    description:
      'NoteGen 会继续坚持免费开源、无广告、无捆绑。如果这个项目对你有帮助，可以通过下面的收款码自愿支持维护。',
    note: '捐赠不影响 NoteGen 的免费开源使用，也不等同于购买服务或承诺特定功能排期。',
    qrcodes: {
      donation: {
        title: '收款码',
        description: '支付宝扫码支持。',
        alt: 'NoteGen 收款码',
      },
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
      title: 'Donate to NoteGen - Support Open Source Maintenance',
      description: 'Support NoteGen through donations, feedback, code contributions, or sharing this open-source AI Markdown notes project.',
    },
    title: 'Support NoteGen',
    description:
      'NoteGen will stay free, open source, ad-free, and bundle-free. If it helps you, you can voluntarily support maintenance with the QR codes below.',
    note: 'Donations do not affect free open-source usage and are not a service purchase or a promise of a feature schedule.',
    qrcodes: {
      donation: {
        title: 'Donation QR',
        description: 'Scan with Alipay.',
        alt: 'NoteGen donation QR code',
      },
      qq: {
        title: 'QQ group',
        description: 'Scan to join the NoteGen QQ community.',
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

const donationQrUrl = 'https://files.seeusercontent.com/2026/07/06/yCr6/b42e33564e77e762d6ac8083144debb2.jpg';
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

  const qrItems = [
    {
      title: t.qrcodes.donation.title,
      description: t.qrcodes.donation.description,
      image: {
        src: donationQrUrl,
        alt: t.qrcodes.donation.alt,
      },
      priority: true,
    },
    {
      title: t.qrcodes.qq.title,
      description: t.qrcodes.qq.description,
      image: {
        src: qqGroupQrUrl,
        alt: t.qrcodes.qq.alt,
      },
      priority: false,
    },
    {
      title: t.qrcodes.wechatAdmin.title,
      description: t.qrcodes.wechatAdmin.description,
      image: {
        src: wechatAdminQrUrl,
        alt: t.qrcodes.wechatAdmin.alt,
      },
      priority: false,
    },
  ];

  return (
    <main className="min-h-screen">
      <SectionWrap className="py-10 md:py-14 xl:w-full">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {t.title}
            </h1>
            <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {t.description}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {t.note}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {qrItems.map((item) => (
              <QrCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                priority={item.priority}
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
  priority,
}: {
  title: string;
  description: string;
  image: QrImage;
  priority: boolean;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <PosterImage image={image} priority={priority} />
      </CardContent>
    </Card>
  );
}

function PosterImage({
  image,
  priority = false,
}: {
  image: QrImage;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto flex h-[260px] w-[180px] items-center justify-center overflow-hidden rounded-md border bg-background p-3">
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
