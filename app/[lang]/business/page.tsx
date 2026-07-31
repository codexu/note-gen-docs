import type { Metadata } from 'next';
import {
  GithubIcon,
  Globe2Icon,
  HandshakeIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { normalizeLang, siteConfig } from '@/lib/seo';
import { ContactCopyCard } from './contact-copy-card';

const content = {
  cn: {
    meta: {
      title: 'NoteGen 商务合作 - 广告位与模型服务商配置模板',
      description: '了解 NoteGen 商务合作范围：GitHub 仓库、官网广告位，以及模型服务商配置模板合作。',
    },
    title: '商务合作',
    description:
      'NoteGen 可以开放少量外部展示合作，但会保持产品体验克制。软件内部不会做任何广告位，只有模型服务商可以合作增加配置模板。',
    badge: '合作与展示',
    sections: {
      available: {
        title: '可合作内容',
        description: '合作内容需要与 NoteGen 用户相关，并且不干扰记录、写作和下载流程。',
        items: [
          {
            title: 'GitHub 仓库展示',
            description: '可在 GitHub 仓库相关位置投放合作信息，适合开发者工具、模型服务、基础设施等相关产品。',
          },
          {
            title: '官网广告位',
            description: '可在 NoteGen 官网投放广告位或合作展示，内容需与产品用户群体相关，避免干扰阅读和下载流程。',
          },
          {
            title: '模型配置模板',
            description: '软件内部仅面向模型服务商开放配置模板合作，帮助用户更方便地完成模型服务接入。',
          },
        ],
      },
      boundary: {
        title: '软件内部边界',
        description:
          'NoteGen 软件内部不会做任何广告位，也不会插入弹窗、横幅、信息流广告或影响用户记录和写作体验的商业内容。',
        note: '这条边界是固定原则，不会因为合作形式变化而调整。',
      },
      contact: {
        title: '联系方式',
        description: '请简单说明合作方、合作内容和期望展示位置，我们会尽快回复。',
        items: [
          {
            label: '微信',
            value: 'xu461229187',
            type: 'wechat',
          },
          {
            label: 'Gmail 邮箱',
            value: 'xu461229187@gmail.com',
            type: 'email',
          },
          {
            label: 'QQ 邮箱',
            value: '461229187@qq.com',
            type: 'email',
          },
        ],
        copyText: '复制',
        copiedText: '已复制',
      },
    },
  },
  en: {
    meta: {
      title: 'NoteGen Business Cooperation - Ads and Model Provider Templates',
      description: 'Learn about NoteGen business cooperation: GitHub repository placements, website ad placements, and model provider configuration templates.',
    },
    title: 'Business cooperation',
    description:
      'NoteGen can support limited external placement cooperation while keeping the product experience restrained. The app itself will not include ad placements; only model providers can cooperate on configuration templates.',
    badge: 'Partnerships',
    sections: {
      available: {
        title: 'Available cooperation',
        description: 'Partnerships must be relevant to NoteGen users and must not interrupt capture, writing, or download flows.',
        items: [
          {
            title: 'GitHub repository placement',
            description: 'Cooperation information can be placed in relevant GitHub repository areas for developer tools, model services, infrastructure, and related products.',
          },
          {
            title: 'Official website ad placement',
            description: 'Ads or cooperation placements can appear on the NoteGen website when they are relevant to the audience and do not interrupt reading or download flows.',
          },
          {
            title: 'Model configuration templates',
            description: 'Inside the app, cooperation is limited to model provider configuration templates that help users connect model services more easily.',
          },
        ],
      },
      boundary: {
        title: 'In-app boundary',
        description:
          'The NoteGen app will not include any ad placement, including popups, banners, feed ads, or commercial content that affects note-taking and writing workflows.',
        note: 'This boundary is a fixed principle and will not change with cooperation format.',
      },
      contact: {
        title: 'Contact',
        description: 'Please include who you represent, the proposed cooperation, and the placement you have in mind.',
        items: [
          {
            label: 'WeChat',
            value: 'xu461229187',
            type: 'wechat',
          },
          {
            label: 'Gmail',
            value: 'xu461229187@gmail.com',
            type: 'email',
          },
          {
            label: 'QQ Email',
            value: '461229187@qq.com',
            type: 'email',
          },
        ],
        copyText: 'Copy',
        copiedText: 'Copied',
      },
    },
  },
} as const;

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
      canonical: `/${language}/business`,
      languages: {
        'zh-CN': '/cn/business',
        en: '/en/business',
        'x-default': '/cn/business',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${language}/business`,
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

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];
  const cooperationIcons = [GithubIcon, Globe2Icon, Settings2Icon];

  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge variant="outline">
            <HandshakeIcon data-icon="inline-start" />
            {t.badge}
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t.description}
            </p>
          </div>
        </div>

        <Card className="mt-12 bg-muted/30 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheckIcon className="size-5" aria-hidden="true" />
              {t.sections.boundary.title}
            </CardTitle>
            <CardDescription className="max-w-4xl text-sm leading-6 md:text-base md:leading-7">
              {t.sections.boundary.description}
            </CardDescription>
            <CardAction>
              <Badge>{language === 'cn' ? '固定原则' : 'Fixed principle'}</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="border-t pt-6 text-sm font-medium leading-6">
            {t.sections.boundary.note}
          </CardFooter>
        </Card>

        <Separator className="my-12" />

        <section className="flex flex-col gap-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t.sections.available.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t.sections.available.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {t.sections.available.items.map((item, index) => {
              const Icon = cooperationIcons[index];

              return (
                <Card key={item.title} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="leading-6">{item.description}</CardDescription>
                    <CardAction>
                      <Badge variant="outline">{String(index + 1).padStart(2, '0')}</Badge>
                    </CardAction>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t.sections.contact.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t.sections.contact.description}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {language === 'cn' ? '选择联系方式' : 'Choose a contact method'}
              </CardTitle>
              <CardDescription>
                {language === 'cn' ? '点击任意卡片即可复制。' : 'Select any card to copy it.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {t.sections.contact.items.map((item) => (
                <ContactCopyCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  copyText={t.sections.contact.copyText}
                  copiedText={t.sections.contact.copiedText}
                />
              ))}
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}
