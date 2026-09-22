import type { Metadata } from 'next';
import {
  GithubIcon,
  HandshakeIcon,
  ServerCogIcon,
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
import { PartnershipRulesDialog } from './partnership-rules-dialog';

const content = {
  cn: {
    meta: {
      title: 'NoteGen 商务合作 - 开源捐赠与 AI 平台合作',
      description: '通过捐赠或赞助支持 NoteGen 开源项目，可联系安排 GitHub 仓库和官网支持者展示；中转站等 AI 平台还可在应用内模型配置页面展示。',
    },
    title: '商务合作',
    description:
      '捐赠与合作的目的，是支持 NoteGen 的持续维护，不能以牺牲普通用户的使用体验为代价。欢迎通过捐赠或赞助支持项目，可联系安排在 GitHub 仓库和官网支持者区域展示。中转站、模型服务商等 AI 平台还可以在用户配置模型时展示服务信息，帮助用户了解和接入模型服务。',
    badge: '合作与展示',
    sections: {
      available: {
        title: '可合作内容',
        description: '合作分为 AI 平台与模型服务合作、开源赞助和模型与服务支持三类。合作内容需要与 NoteGen 用户相关，并且不干扰记录、写作和下载流程。',
        items: [
          {
            title: 'AI 平台与模型服务合作',
            description: '适用于 API 中转站、模型服务平台和云厂商。',
            detail: '适用于 API 中转站、模型服务平台和云厂商的模型服务，例如硅基流动、火山引擎等。合作展示 200 元/月起，可在 GitHub 仓库和官网支持者区域展示；也可在 NoteGen 应用内的模型配置页面展示平台信息并提供配置模板。中转站合作需提供可追踪的 AFF 链接，返佣比例不低于 10%。',
          },
          {
            title: '开源赞助',
            description: '通过赞助支持 NoteGen 的持续开发与维护。',
            detail: '个人、团队或企业可通过任意金额的捐赠支持 NoteGen 的持续开发与维护。不设最低金额或其他合作门槛；完成捐赠后，即可提交名称、产品介绍和链接，在 GitHub 仓库和官网支持者区域展示。',
          },
          {
            title: '模型与服务支持',
            description: '为用户提供免费模型，或提供 NoteGen 接入所需服务。',
            detail: '适用于愿意为 NoteGen 用户提供免费模型、模型额度或其他免费使用权益的服务方，也适用于提供 NoteGen 接入确有必要的 API、基础设施或兼容性支持。确认支持内容后，可在 GitHub 仓库和官网支持者区域公开致谢。',
          },
        ],
      },
      terms: {
        title: '合作规则',
        description: 'AI 平台与模型服务合作、开源赞助、模型与服务支持分别独立执行，不相互抵扣。合作开始前，双方确认各自的展示范围、费用、起止时间和所需素材。',
        triggerText: '查看合作规则',
        dialogDescription: '以下规则仅适用于这一类合作。',
        items: [
          {
            title: 'AI 平台与模型服务合作',
            description: '合作展示 200 元/月起，包含 GitHub 仓库和官网支持者区域的同步展示。模型配置模板或应用内模型配置页展示的范围与素材在合作前确认。中转站需另行提供返佣不低于 10% 的 AFF 链接，AFF 收益不抵扣合作展示费用。',
          },
          {
            title: '排序方式',
            description: 'GitHub 仓库和官网支持者区域按当前合作期的月赞助金额从高到低同步排序；同金额按该合作期的赞助确认时间先后排序。应用内合作展示的范围与顺序在合作前确认。',
          },
          {
            title: '展示期限与续费',
            description: '展示按约定的起止时间执行，到期未续费将移除合作展示。续费后按新合作期的月赞助金额和续费确认时间重新排序，原有位置不作保留承诺。',
          },
          {
            title: 'AFF 返佣与归因',
            description: '中转站需提供可追踪的 AFF（推广返佣）链接，返佣比例不低于 10%。合作前需确认返佣按充值额、实际消费额或其他口径计算，是否覆盖后续消费，以及归因有效期、跨设备归因和重复邀请的处理方式。结算周期、最低提现金额、退款扣回规则及数据核对方式一并确认。',
          },
          {
            title: '内容审核与调整',
            description: '合作方需提供真实的名称、简介、链接和服务说明，内容应与 AI、开发者工具或 NoteGen 用户需求相关。NoteGen 保留审核与调整展示内容的权利，不接受违法、误导或存在明显安全风险的服务；合作期间出现此类问题，可暂停或移除展示。',
          },
          {
            title: '合作标识',
            description: '付费展示会标注合作或赞助关系，AFF 链接会标明推广返佣。应用内合作信息仅出现在模型配置页面，方便用户知情选择服务。',
          },
          {
            title: '非现金服务支持',
            description: '合作方可为 NoteGen 用户提供免费模型、模型额度或其他免费使用权益，也可提供 NoteGen 接入确有必要的 API、基础设施或兼容性支持，不受现金赞助门槛限制。双方确认支持内容、期限和致谢方式；如需模型配置模板或应用内展示，仍需满足服务质量、接入兼容性和用户权益等要求。',
          },
        ],
      },
      boundary: {
        title: '软件内部边界',
        description:
          '除模型配置页面中的 AI 平台信息与配置模板外，软件内的任何页面和流程均不允许任何形式的广告。',
        note: '模型配置页的信息仅用于帮助用户了解和接入模型服务，不干扰日常使用。',
      },
      contact: {
        title: '联系方式',
        description: '请简单介绍你或你的产品，说明希望捐赠或赞助支持、进行 AI 平台合作，以及期望在 GitHub 或官网展示的位置。AI 平台可一并提供服务链接和模型接入文档；中转站请提供返佣不低于 10% 的 AFF 链接。',
        items: [
          {
            label: '微信',
            value: 'xu461229187',
            type: 'wechat',
          },
          {
            label: '电话',
            value: '15711379055',
            type: 'phone',
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
      title: 'NoteGen Partnerships - Open Source Donations and AI Platforms',
      description: 'Support NoteGen through donations or sponsorships and arrange recognition on GitHub and the website. AI platforms can also appear in the app’s model settings.',
    },
    title: 'Business cooperation',
    description:
      'Donations and partnerships exist to support NoteGen’s ongoing maintenance and must not come at the expense of the everyday user experience. Support the project through a donation or sponsorship and contact us to arrange recognition in the GitHub repository and the website’s supporter area. AI platforms, including API gateways and model providers, can also present their services when users configure models in the app.',
    badge: 'Partnerships',
    sections: {
      available: {
        title: 'Available cooperation',
        description: 'Partnerships fall into three groups: AI platform and model service partnerships, open source sponsorship, and model and service support. They must be relevant to NoteGen users and must not interrupt capture, writing, or download flows.',
        items: [
          {
            title: 'AI platform and model service partnerships',
            description: 'For API gateways, model platforms, and cloud providers.',
            detail: 'For API gateways, model service platforms, and cloud providers offering model services. Partnership placements start at CNY 200 per month and can appear in the GitHub repository and website supporter area; partners can also provide platform information and configuration templates in NoteGen’s model settings. API gateway partnerships require a trackable affiliate link with a commission rate of at least 10%.',
          },
          {
            title: 'Open source sponsorship',
            description: 'Support NoteGen’s ongoing development and maintenance.',
            detail: 'Individuals, teams, and companies can support NoteGen’s ongoing development and maintenance with a donation of any amount. There is no minimum or other partnership requirement; after donating, submit a name, product introduction, and link for recognition in the GitHub repository and website supporter area.',
          },
          {
            title: 'Model and service support',
            description: 'Offer free models to users or services needed for NoteGen integration.',
            detail: 'For providers offering NoteGen users free models, model credits, or other free access benefits, as well as services that provide APIs, infrastructure, or compatibility support genuinely needed for NoteGen integration. Once the support is confirmed, the partner can receive public recognition in the GitHub repository and website supporter area.',
          },
        ],
      },
      terms: {
        title: 'Partnership terms',
        description: 'AI platform and model service partnerships, open source sponsorship, and model and service support operate independently and do not offset one another. Before a partnership begins, both parties confirm the scope, fees, dates, and materials for the relevant type.',
        triggerText: 'View partnership terms',
        dialogDescription: 'These terms apply only to this partnership type.',
        items: [
          {
            title: 'AI platform and model service partnerships',
            description: 'Partnership placements start at CNY 200 per month and include matching placements in the GitHub repository and website supporter area. The scope and materials for model configuration templates or in-app model settings placements are agreed before launch. API gateways must separately provide an affiliate link with a commission rate of at least 10%; affiliate income does not offset placement fees.',
          },
          {
            title: 'Placement order',
            description: 'The GitHub repository and website supporter area use the same order: monthly sponsorship amount for the current term, highest first; equal amounts are ordered by sponsorship confirmation time for that term, earliest first. The scope and order of in-app partner placements are agreed before the partnership begins.',
          },
          {
            title: 'Duration and renewal',
            description: 'Placements run for the agreed dates and are removed if they expire without renewal. Renewed placements are reordered using the monthly amount for the new term and the renewal confirmation time. Previous positions are not guaranteed.',
          },
          {
            title: 'Affiliate commission and attribution',
            description: 'API gateways must provide a trackable affiliate link with a commission rate of at least 10%. Before launch, both parties confirm whether commission is based on top-ups, actual spending, or another basis, whether subsequent spending qualifies, and how attribution windows, cross-device attribution, and competing referrals work. Settlement frequency, minimum payout, refund deductions, and reporting reconciliation must also be agreed.',
          },
          {
            title: 'Content review and changes',
            description: 'Partners must provide accurate names, descriptions, links, and service information relevant to AI, developer tools, or NoteGen users. NoteGen reserves the right to review and adjust placement content and does not accept unlawful, misleading, or clearly unsafe services. Placements may be suspended or removed if such issues arise during the partnership.',
          },
          {
            title: 'Partnership disclosure',
            description: 'Paid placements will identify the partnership or sponsorship, and affiliate links will disclose referral commissions. In-app partner information appears only in model settings so users can make an informed choice.',
          },
          {
            title: 'Non-cash service support',
            description: 'Partners can offer NoteGen users free models, model credits, or other free access benefits, or provide APIs, infrastructure, or compatibility support genuinely needed for NoteGen integration. These partnerships are not subject to a cash sponsorship minimum. Both parties confirm the support, duration, and recognition method. Model configuration templates and in-app placements must still meet service quality, integration compatibility, and user benefit requirements.',
          },
        ],
      },
      boundary: {
        title: 'In-app boundary',
        description:
          'No form of advertising is allowed anywhere in the app except AI platform information and configuration templates in model settings.',
        note: 'Model settings information exists only to help users understand and connect model services without interrupting everyday use.',
      },
      contact: {
        title: 'Contact',
        description: 'Introduce yourself or your product, let us know whether you are interested in a donation, sponsorship, or AI platform partnership, and describe your preferred placement on GitHub or the website. AI platforms can also include a service link and model integration documentation; API gateways should include an affiliate link with a commission rate of at least 10%.',
        items: [
          {
            label: 'WeChat',
            value: 'xu461229187',
            type: 'wechat',
          },
          {
            label: 'Phone',
            value: '15711379055',
            type: 'phone',
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
  const cooperationCards = [
    {
      icon: Settings2Icon,
      accent: 'from-sky-500/20 via-sky-500/5 to-transparent',
      iconClassName: 'bg-sky-500 text-white',
    },
    {
      icon: GithubIcon,
      accent: 'from-violet-500/20 via-violet-500/5 to-transparent',
      iconClassName: 'bg-violet-500 text-white',
    },
    {
      icon: ServerCogIcon,
      accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      iconClassName: 'bg-emerald-500 text-white',
    },
  ];
  const [
    aiPlatformRules,
    orderRules,
    durationRules,
    affiliateRules,
    reviewRules,
    disclosureRules,
    serviceSupportRules,
  ] = t.sections.terms.items;
  const cooperationRules = [
    [aiPlatformRules, orderRules, durationRules, affiliateRules, reviewRules, disclosureRules],
    [],
    [serviceSupportRules, reviewRules, disclosureRules],
  ];

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
          <div className="grid gap-6 md:grid-cols-3">
            {t.sections.available.items.map((item, index) => {
              const card = cooperationCards[index];
              const Icon = card.icon;

              return (
                <Card key={item.title} className="group h-full overflow-hidden py-0 shadow-sm">
                  <div className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br ${card.accent}`}>
                    <div className="absolute -right-10 -top-10 size-40 rounded-full border border-foreground/10" />
                    <div className="absolute -bottom-16 -left-10 size-40 rounded-full border border-foreground/10" />
                    <span className="absolute left-5 top-5 text-sm font-medium tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`relative flex size-20 items-center justify-center rounded-3xl shadow-lg transition-transform duration-300 group-hover:scale-105 ${card.iconClassName}`}>
                      <Icon className="size-9" aria-hidden="true" />
                    </div>
                  </div>
                  <CardHeader className="flex-1 gap-3 p-6">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-6 pt-0">
                    <PartnershipRulesDialog
                      title={item.title}
                      description={
                        language === 'cn'
                          ? `${t.sections.terms.dialogDescription}${item.detail}`
                          : `${t.sections.terms.dialogDescription} ${item.detail}`
                      }
                      triggerText={t.sections.terms.triggerText}
                      items={cooperationRules[index]}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 flex flex-col gap-6">
          <div className="flex max-w-2xl flex-col gap-2">
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
            <CardContent className="grid gap-3 sm:grid-cols-2">
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
