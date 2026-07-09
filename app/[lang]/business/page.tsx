import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import SectionWrap from '../(home)/section-wrap';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    sections: {
      available: {
        title: '可合作内容',
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
    sections: {
      available: {
        title: 'Available cooperation',
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
          </div>

          <section className="rounded-xl border border-primary/20 bg-primary/[0.03] p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold leading-none">
                    {t.sections.boundary.title}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {t.sections.boundary.description}
                  </p>
                </div>
                <p className="text-sm font-medium leading-6">
                  {t.sections.boundary.note}
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {t.sections.available.items.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.sections.contact.title}</CardTitle>
              <CardDescription>
                {language === 'cn'
                  ? '如需沟通商务合作，可以通过以下方式联系。'
                  : 'For business cooperation, please use the contact details below.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {t.sections.contact.items.map((item) => (
                <ContactCopyCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  copiedText={t.sections.contact.copiedText}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </SectionWrap>
    </main>
  );
}
