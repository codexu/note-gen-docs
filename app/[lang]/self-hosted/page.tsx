import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRightIcon,
  BoxIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  CircleMinusIcon,
  CircleXIcon,
  Code2Icon,
  ContainerIcon,
  DatabaseIcon,
  GithubIcon,
  ServerIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPageAlternates, normalizeLang, siteConfig } from '@/lib/seo';
import { isSelfHostedEnabled } from '@/lib/self-hosted';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { MarkdownSyncDemo } from '@/components/self-hosted/markdown-sync-demo';

const repositoryUrl = 'https://github.com/codexu/note-gen-server';
const issueUrl = `${repositoryUrl}/issues`;

const content = {
  cn: {
    meta: {
      title: 'NoteGen 自托管同步服务',
      description: '了解 NoteGen Server 的实时同步、团队协作、数据控制与自托管能力，并前往完整部署文档。',
    },
    badge: '实验性自托管',
    title: '把 NoteGen 同步服务运行在自己的服务器上',
    description:
      '自托管服务提供账号、设备关联、实时同步、团队协作和账号管理能力，数据库与附件由你掌控。准备好后，可以按照部署文档运行自己的实例。',
    notice: {
      title: '当前处于实验阶段',
      description:
        '部署方式、配置和数据库结构仍可能变化。请始终保留 NoteGen 本地 Markdown，不要把实验实例作为重要数据的唯一副本。完整备份恢复工具仍在完善中。',
    },
    comparison: {
      title: '与其他同步方案相比',
      description:
        'NoteGen Server 不只是同步 Markdown 文件，还提供面向 NoteGen 的实时同步与团队协作能力。以下比较以 NoteGen 内置体验为准，不包含额外第三方工具。',
      headers: ['能力', 'NoteGen Server', 'OneDrive / iCloud', 'Git', 'S3 / WebDAV'],
      status: { yes: '支持', partial: '部分支持', no: '不支持' },
      rows: [
        ['实时同步团队协作', 'yes', 'no', 'no', 'no'],
        ['多设备同步', 'yes', 'yes', 'partial', 'yes'],
        ['历史版本', 'yes', 'partial', 'yes', 'partial'],
        ['完全自托管', 'yes', 'no', 'yes', 'yes'],
        ['高级端到端加密', 'yes', 'no', 'no', 'no'],
      ],
    },
    deploy: {
      title: '准备部署自己的实例？',
      description:
        '官方 AMD64 / ARM64 镜像已经发布到 GHCR，可以通过 Docker Compose 直接拉取。完整指南包含环境变量、HTTPS、首次初始化、客户端连接、升级、数据备份和常见问题。',
      action: '阅读自托管部署文档',
      source: '查看服务端源码',
    },
    architecture: {
      title: '默认部署包含什么',
      description: '单机 Compose 保持拓扑简单，适合个人实例和实验环境。',
      items: [
        ['NoteGen Server', '同步 API、WebSocket、认证和账号管理 Web 同源运行。'],
        ['PostgreSQL 17', '保存账号、设备、同步游标、对象版本和实例配置。'],
        ['持久化数据卷', 'PostgreSQL 与附件数据独立于容器生命周期保存。'],
        ['GHCR 镜像', 'latest 跟随 release 分支发布，完整版本标签用于稳定复现。'],
      ],
    },
    feedback: {
      title: '一起完善自托管体验',
      description: '如果你遇到部署问题，欢迎附上系统架构、容器日志和复现步骤；也欢迎直接改进 Docker、文档或服务端代码。',
      repo: '查看源码',
      issue: '提交 Issue',
    },
  },
  en: {
    meta: {
      title: 'NoteGen Self-hosted Sync Server',
      description: 'Explore NoteGen Server realtime sync, collaboration, data control, and self-hosting, then follow the complete deployment guide.',
    },
    badge: 'Experimental self-hosting',
    title: 'Run NoteGen sync on your own server',
    description:
      'The self-hosted server provides accounts, device pairing, realtime sync, collaboration, and account administration while keeping the database and attachments under your control. Follow the deployment guide when you are ready to run an instance.',
    notice: {
      title: 'Experimental today',
      description:
        'Deployment, configuration, and database structures may still change. Keep your local Markdown files and never treat an experimental instance as the only copy of important data. Complete backup and restore tooling is still being built.',
    },
    comparison: {
      title: 'How it compares with other sync options',
      description:
        'NoteGen Server goes beyond moving Markdown files by adding realtime sync and collaboration designed for NoteGen. This compares built-in NoteGen experiences without extra third-party tools.',
      headers: ['Capability', 'NoteGen Server', 'OneDrive / iCloud', 'Git', 'S3 / WebDAV'],
      status: { yes: 'Supported', partial: 'Partial', no: 'Not supported' },
      rows: [
        ['Realtime team collaboration', 'yes', 'no', 'no', 'no'],
        ['Multi-device sync', 'yes', 'yes', 'partial', 'yes'],
        ['Version history', 'yes', 'partial', 'yes', 'partial'],
        ['Fully self-hostable', 'yes', 'no', 'yes', 'yes'],
        ['Advanced end-to-end encryption', 'yes', 'no', 'no', 'no'],
      ],
    },
    deploy: {
      title: 'Ready to deploy your own instance?',
      description:
        'Official AMD64 and ARM64 images are available from GHCR and can be pulled directly with Docker Compose. The complete guide covers environment variables, HTTPS, first-time setup, client connection, upgrades, backups, and troubleshooting.',
      action: 'Read the self-hosting guide',
      source: 'View server source',
    },
    architecture: {
      title: 'What the default deployment includes',
      description: 'The single-server Compose topology stays small for personal instances and experiments.',
      items: [
        ['NoteGen Server', 'Sync API, WebSocket, authentication, and the account portal run on one origin.'],
        ['PostgreSQL 17', 'Stores accounts, devices, sync cursors, object versions, and instance configuration.'],
        ['Persistent volumes', 'Database and attachment data remain outside the container lifecycle.'],
        ['GHCR image', 'latest follows releases from the release branch; full version tags provide reproducible deployments.'],
      ],
    },
    feedback: {
      title: 'Help improve self-hosting',
      description: 'For deployment issues, include your system architecture, container logs, and reproduction steps. Docker, documentation, and server contributions are welcome.',
      repo: 'View source',
      issue: 'Open an issue',
    },
  },
} as const;

const architectureIcons = [ServerIcon, DatabaseIcon, BoxIcon, ContainerIcon];
type ComparisonStatus = 'yes' | 'partial' | 'no';

function ComparisonStatusMark({
  status,
  labels,
  showLabel = false,
}: {
  status: ComparisonStatus;
  labels: Record<ComparisonStatus, string>;
  showLabel?: boolean;
}) {
  const Icon = status === 'yes'
    ? CheckCircle2Icon
    : status === 'partial'
      ? CircleMinusIcon
      : CircleXIcon;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5',
        status === 'yes' && 'text-emerald-600 dark:text-emerald-500',
        status === 'partial' && 'text-muted-foreground',
        status === 'no' && 'text-destructive',
      )}
      title={labels[status]}
    >
      <Icon aria-hidden="true" className="size-5" />
      <span className={cn(!showLabel && 'sr-only')}>{labels[status]}</span>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  if (!isSelfHostedEnabled) notFound();

  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];
  const pathname = '/self-hosted';

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getPageAlternates(language, pathname),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${language}${pathname}`,
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
  };
}

export default async function SelfHostedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  if (!isSelfHostedEnabled) notFound();

  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = content[language];

  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-16 sm:px-6 md:py-24">
        <div className="flex max-w-4xl flex-col items-start gap-6">
          <Badge variant="outline">
            <ServerIcon data-icon="inline-start" />
            {t.badge}
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${language}/docs/self-hosted`}>
                {t.deploy.action}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={repositoryUrl} target="_blank" rel="noreferrer">
                <GithubIcon data-icon="inline-start" />
                {t.deploy.source}
              </a>
            </Button>
          </div>
        </div>

        <MarkdownSyncDemo lang={language} />

        <Card className="max-w-5xl border-amber-500/40 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-amber-900 dark:text-amber-200">{t.notice.title}</CardTitle>
            <CardDescription className="text-amber-950/70 dark:text-amber-100/70">
              {t.notice.description}
            </CardDescription>
            <CardAction>
              <Badge className="border-amber-500/40 bg-amber-500/15 text-amber-900 hover:bg-amber-500/20 dark:text-amber-200" variant="outline">
                <CircleAlertIcon data-icon="inline-start" />
                Preview
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <section className="flex flex-col gap-6">
          <div className="flex max-w-3xl flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t.comparison.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t.comparison.description}</p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs">
              {(['yes', 'partial', 'no'] as const).map((status) => (
                <ComparisonStatusMark
                  key={status}
                  status={status}
                  labels={t.comparison.status}
                  showLabel
                />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    {t.comparison.headers.map((header, index) => (
                      <th
                        key={header}
                        scope="col"
                        className={cn(
                          'border-b px-4 py-3 text-center font-medium',
                          index === 0 && 'text-left',
                          index === 1 && 'bg-muted',
                        )}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.rows.map((row) => (
                    <tr key={row[0]} className="align-top hover:bg-muted/30">
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={cn(
                            'border-b px-4 py-3',
                            index === 0 && 'font-medium',
                            index === 1 && 'bg-muted/30',
                          )}
                        >
                          {index === 0
                            ? cell
                            : <ComparisonStatusMark
                                status={cell as ComparisonStatus}
                                labels={t.comparison.status}
                              />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>{t.deploy.title}</CardTitle>
            <CardDescription>{t.deploy.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${language}/docs/self-hosted`}>
                {t.deploy.action}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={repositoryUrl} target="_blank" rel="noreferrer">
                <GithubIcon data-icon="inline-start" />
                {t.deploy.source}
              </a>
            </Button>
          </CardFooter>
        </Card>

        <section className="flex flex-col gap-6">
          <div className="flex max-w-3xl flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{t.architecture.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t.architecture.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.architecture.items.map(([title, description], index) => {
              const Icon = architectureIcons[index];

              return (
                <Card key={title} className="h-full">
                  <CardHeader>
                    <Icon aria-hidden="true" />
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>{t.feedback.title}</CardTitle>
            <CardDescription>{t.feedback.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={repositoryUrl} target="_blank" rel="noreferrer">
                <Code2Icon data-icon="inline-start" />
                {t.feedback.repo}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={issueUrl} target="_blank" rel="noreferrer">
                <GithubIcon data-icon="inline-start" />
                {t.feedback.issue}
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={`/${language}/docs/self-hosted`}>
                {t.deploy.action}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
