import type { Metadata } from "next";
import {
  ArrowDownToLineIcon,
  ArrowRightIcon,
  ChromeIcon,
  CloudOffIcon,
  CircleCheckIcon,
  FileTextIcon,
  LinkIcon,
  MousePointer2Icon,
  NotebookPenIcon,
  PackageCheckIcon,
  SaveIcon,
} from "lucide-react";

import SectionWrap from "@/app/[lang]/(home)/section-wrap";
import HomeFooter from "@/app/[lang]/(home)/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NoteGenDesktopReplica,
  type NoteGenReplicaRecord,
} from "@/components/home/notegen-desktop-replica";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getPageAlternates,
  normalizeLang,
  siteConfig,
  type SupportedLang,
} from "@/lib/seo";
import {
  getLatestWebClipperRelease,
  type WebClipperDownload,
} from "@/src/config/web-clipper-downloads";

import animationStyles from "./web-clipper-animation.module.css";

export const revalidate = 300;

const copy = {
  cn: {
    seo: {
      title: "下载 NoteGen 网页剪藏 - Chrome 与 Edge",
      description:
        "下载 NoteGen 网页剪藏扩展，将网页选区、图片和链接快速保存到本地 NoteGen，支持 Chrome 与 Microsoft Edge。",
    },
    eyebrow: "NoteGen 网页剪藏",
    title: "把网页，放进你的记录流。",
    description: "划词、存图、收藏网页，一键收进 NoteGen。",
    chrome: {
      action: "下载 Chrome 版",
    },
    edge: {
      action: "下载 Edge 版",
    },
    requires: "需要 NoteGen v0.35.0 或更高版本",
    noteGenAction: "下载 NoteGen",
    illustration: {
      browser: "浏览器",
      selectionStage: "划词保存",
      selectionArticle: "让收集真正服务于写作",
      selectionPrefix: "阅读时，先留下",
      selection: "真正会再次使用的内容",
      selectionSuffix: "，之后再回到自己的记录流里继续整理。",
      quickSave: "保存到 NoteGen",
      saved: "已保存",
      pageStage: "保存网页",
      pageArticle: "建立一套可持续的阅读工作流",
      pageDescription: "把值得稍后阅读的网页连同标题和来源一起保存。",
      pluginTitle: "NoteGen 剪藏",
      connected: "已连接 NoteGen",
      currentPage: "当前网页",
      savePage: "保存当前网页",
      inbox: "记录箱",
      textRecord: "阅读时留下会再次使用的内容",
      linkRecord: "建立一套可持续的阅读工作流",
      justNow: "刚刚",
    },
    outcome: {
      eyebrow: "核心功能",
      title: "需要的内容，随手收进 NoteGen。",
      description: "剪藏时只管保存，回到 NoteGen 后再继续阅读、整理和写作。",
      selection: {
        title: "保存文字与图片",
        description: "选中网页里的文字和图片，直接保存为可继续整理的素材。",
      },
      page: {
        title: "收藏当前网页",
        description: "一键保留网页标题与来源，稍后回到 NoteGen 继续阅读。",
      },
      organize: {
        title: "继续整理成笔记",
        description: "剪藏内容进入记录箱，之后可以自由组合、补充和写成笔记。",
      },
    },
    workflow: {
      eyebrow: "插件安装攻略",
      title: "一分钟完成安装，开始第一次剪藏。",
      description: "目前提供 Chrome 与 Edge 扩展包，按照下面的步骤手动加载即可使用。",
      steps: [
        {
          title: "下载并解压",
          description: "下载与你的浏览器对应的 ZIP 扩展包，并将它解压到一个固定文件夹。",
        },
        {
          title: "加载扩展",
          description: "打开浏览器扩展管理页，开启“开发者模式”，然后选择“加载已解压的扩展程序”。",
        },
        {
          title: "连接 NoteGen",
          description: "启动 NoteGen 桌面端，在插件中点击连接，然后在 NoteGen 内确认请求。",
        },
        {
          title: "开始剪藏",
          description: "选中文字和图片快速保存，或打开插件将当前网页保存为链接记录。",
        },
      ],
      chromeAddress: "Chrome：chrome://extensions",
      edgeAddress: "Edge：edge://extensions",
    },
  },
  en: {
    seo: {
      title: "Download NoteGen Web Clipper for Chrome and Edge",
      description:
        "Download the NoteGen Web Clipper to save web selections, images, and links to local NoteGen from Chrome or Microsoft Edge.",
    },
    eyebrow: "NoteGen Web Clipper",
    title: "Bring the web into your capture flow.",
    description: "Save text, images, and web pages to NoteGen in one click.",
    chrome: {
      action: "Download for Chrome",
    },
    edge: {
      action: "Download for Edge",
    },
    requires: "Requires NoteGen v0.35.0 or later",
    noteGenAction: "Download NoteGen",
    illustration: {
      browser: "Browser",
      selectionStage: "Save a selection",
      selectionArticle: "Make collecting serve your writing",
      selectionPrefix: "While reading, keep",
      selection: "the material you will actually use again",
      selectionSuffix: ", then return to your capture flow to organize it.",
      quickSave: "Save to NoteGen",
      saved: "Saved",
      pageStage: "Save a page",
      pageArticle: "Build a sustainable reading workflow",
      pageDescription: "Keep a page worth revisiting together with its title and source.",
      pluginTitle: "NoteGen Clipper",
      connected: "Connected to NoteGen",
      currentPage: "Current page",
      savePage: "Save current page",
      inbox: "Inbox",
      textRecord: "Keep the material you will actually use again",
      linkRecord: "Build a sustainable reading workflow",
      justNow: "Just now",
    },
    outcome: {
      eyebrow: "Core features",
      title: "Keep what matters in NoteGen.",
      description: "Capture first, then return to NoteGen to read, organize, and write.",
      selection: {
        title: "Save text and images",
        description: "Select text and images on a page and keep them as material you can organize later.",
      },
      page: {
        title: "Keep the current page",
        description: "Save the page title and source with one click, then continue reading in NoteGen.",
      },
      organize: {
        title: "Turn clips into notes",
        description: "Clips enter your inbox, ready to combine, expand, and shape into finished notes.",
      },
    },
    workflow: {
      eyebrow: "Installation guide",
      title: "Install in one minute and make your first clip.",
      description: "Chrome and Edge packages are available now. Load the extension manually with the steps below.",
      steps: [
        {
          title: "Download and extract",
          description: "Download the ZIP for your browser and extract it to a folder you plan to keep.",
        },
        {
          title: "Load the extension",
          description: "Open the browser extensions page, enable Developer mode, then choose Load unpacked.",
        },
        {
          title: "Connect NoteGen",
          description: "Start the NoteGen desktop app, connect from the extension, and approve the request in NoteGen.",
        },
        {
          title: "Start clipping",
          description: "Quick-save selected text and images, or open the extension to keep the current page as a link record.",
        },
      ],
      chromeAddress: "Chrome: chrome://extensions",
      edgeAddress: "Edge: edge://extensions",
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
  const seo = copy[language].seo;
  const pathname = "/web-clipper/download";

  return {
    title: seo.title,
    description: seo.description,
    alternates: getPageAlternates(language, pathname),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/${language}${pathname}`,
      siteName: siteConfig.name,
      type: "website",
      locale: language === "cn" ? "zh_CN" : "en_US",
      alternateLocale: language === "cn" ? ["en_US"] : ["zh_CN"],
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function WebClipperDownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = normalizeLang(lang);
  const t = copy[language];
  const release = await getLatestWebClipperRelease();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrap className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline">
              <MousePointer2Icon />
              {t.eyebrow}
            </Badge>
            <div className="flex flex-col gap-5">
              <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
                {t.title}
              </h1>
              <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                {t.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  download={release?.downloads.chrome}
                  label={t.chrome.action}
                />
                <DownloadButton
                  download={release?.downloads.edge}
                  label={t.edge.action}
                  variant="outline"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <PackageCheckIcon className="size-4" />
                  {t.requires}
                </span>
                <Button variant="link" size="sm" className="h-auto px-1" asChild>
                  <a href={`/${language}/download`}>
                    {t.noteGenAction}
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <ClipperIntegrationIllustration lang={language} />
        </div>
      </SectionWrap>

      <section className="border-y bg-muted/30">
        <SectionWrap className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12">
            <SectionHeading
              eyebrow={t.outcome.eyebrow}
              title={t.outcome.title}
              description={t.outcome.description}
            />
            <FeatureHighlights lang={language} />
          </div>
        </SectionWrap>
      </section>

      <section className="border-t">
        <SectionWrap className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={t.workflow.eyebrow}
              title={t.workflow.title}
              description={t.workflow.description}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              {t.workflow.steps.map((step, index) => (
                <Card key={step.title} className="min-h-64 gap-5 py-7 shadow-none">
                  <CardHeader className="gap-5 px-6 sm:px-7">
                    <Badge className="size-10 justify-center rounded-full p-0 text-base">
                      {index + 1}
                    </Badge>
                    <CardTitle className="text-xl leading-7">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 px-6 sm:px-7">
                    <p className="leading-7 text-muted-foreground">{step.description}</p>
                    {index === 1 && (
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="font-mono font-normal">
                          {t.workflow.chromeAddress}
                        </Badge>
                        <Badge variant="outline" className="font-mono font-normal">
                          {t.workflow.edgeAddress}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <DownloadButton
                download={release?.downloads.chrome}
                label={t.chrome.action}
              />
              <DownloadButton
                download={release?.downloads.edge}
                label={t.edge.action}
                variant="outline"
              />
            </div>
          </div>
        </SectionWrap>
      </section>

      <HomeFooter lang={language} />
    </main>
  );
}

function ClipperIntegrationIllustration({ lang }: { lang: SupportedLang }) {
  const t = copy[lang].illustration;
  const clippedRecords: NoteGenReplicaRecord[] = [
    {
      kind: "text",
      type: lang === "en" ? "Text" : "文本",
      title: t.textRecord,
      content: t.selection,
      time: t.justNow,
      imageCount: 3,
    },
    {
      kind: "link",
      type: lang === "en" ? "Link" : "链接",
      title: t.linkRecord,
      content: "research.example.com/reading",
      time: t.justNow,
    },
  ];

  return (
    <div
      className={cn(
        "relative mx-auto min-h-[32rem] w-full max-w-xl select-none overflow-hidden rounded-xl",
        animationStyles.scene,
      )}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0", animationStyles.selectionScene)}>
        <Card className="h-full gap-0 overflow-hidden py-0 shadow-xl">
          <BrowserToolbar url="read.example.com/article" />
          <CardContent className="relative flex flex-1 flex-col gap-6 bg-background p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">1 · {t.selectionStage}</Badge>
            <CardTitle className="max-w-md text-2xl leading-tight sm:text-3xl">
              {t.selectionArticle}
            </CardTitle>
            <div className="flex max-w-md flex-col gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
              <div className="h-2.5 w-full rounded-full bg-muted" />
              <div className="h-2.5 w-4/5 rounded-full bg-muted" />
              <p>
                {t.selectionPrefix}{" "}
                <span className={animationStyles.selectedText}>
                  {t.selection}
                </span>
                {t.selectionSuffix}
              </p>
            </div>
            <div
              className={cn(
                "absolute left-[38%] top-[62%] flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-lg",
                animationStyles.quickSaveBubble,
              )}
            >
              <SaveIcon className="size-4" />
              <span className={animationStyles.quickSaveLabel}>{t.quickSave}</span>
              <span className={cn("flex items-center gap-1", animationStyles.quickSavedLabel)}>
                <CircleCheckIcon className="size-4" />
                {t.saved}
              </span>
            </div>
            <MousePointer2Icon
              className={cn(
                "pointer-events-none absolute size-6 drop-shadow-sm",
                animationStyles.selectionCursor,
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className={cn("absolute inset-0", animationStyles.pageScene)}>
        <Card className="h-full gap-0 overflow-hidden py-0 shadow-xl">
          <BrowserToolbar url="research.example.com/reading" showClipper />
          <CardContent className="relative flex flex-1 flex-col gap-6 bg-background p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">2 · {t.pageStage}</Badge>
            <CardTitle className="max-w-md text-2xl leading-tight sm:text-3xl">
              {t.pageArticle}
            </CardTitle>
            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              {t.pageDescription}
            </p>
            <div className="grid max-w-md grid-cols-3 gap-3">
              <div className="h-20 rounded-lg bg-secondary" />
              <div className="h-20 rounded-lg bg-muted" />
              <div className="h-20 rounded-lg bg-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "absolute right-4 top-24 w-[76%] max-w-sm gap-0 overflow-hidden py-0 shadow-2xl sm:right-6 sm:w-[68%]",
            animationStyles.pluginPopup,
          )}
        >
          <CardHeader className="flex-row items-center gap-3 border-b p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground font-semibold text-background">
              N
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <CardTitle className="truncate text-base">{t.pluginTitle}</CardTitle>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CircleCheckIcon className="size-3.5" />
                {t.connected}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-start gap-3 rounded-lg border bg-secondary/40 p-3">
              <LinkIcon className="mt-0.5 size-4 shrink-0" />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-xs text-muted-foreground">{t.currentPage}</span>
                <strong className="line-clamp-2 text-sm leading-5">{t.pageArticle}</strong>
              </div>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">{t.pageDescription}</p>
            <div
              className={cn(
                "flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground",
                animationStyles.savePageAction,
              )}
            >
              <LinkIcon className="size-4" />
              <span className={animationStyles.savePageLabel}>{t.savePage}</span>
              <span className={cn("items-center gap-1", animationStyles.pageSavedLabel)}>
                <CircleCheckIcon className="size-4" />
                {t.saved}
              </span>
            </div>
          </CardContent>
        </Card>

        <MousePointer2Icon
          className={cn(
            "pointer-events-none absolute size-6 drop-shadow-sm",
            animationStyles.pageCursor,
          )}
        />
      </div>

      <div className={cn("absolute inset-0", animationStyles.noteGenScene)}>
        <NoteGenDesktopReplica
          lang={lang}
          initialWorkspace="records"
          autoCycle={false}
          panelLayout="left"
          titleBarMode="full"
          fill
          recordItems={clippedRecords}
          recordGroupLabel={t.inbox}
        />
      </div>
    </div>
  );
}

function BrowserToolbar({ url, showClipper = false }: { url: string; showClipper?: boolean }) {
  return (
    <CardHeader className="gap-3 border-b bg-muted/50 px-4 py-3">
      <div className="flex gap-1.5">
        <span className="size-2 rounded-full bg-muted-foreground/25" />
        <span className="size-2 rounded-full bg-muted-foreground/25" />
        <span className="size-2 rounded-full bg-muted-foreground/25" />
      </div>
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs text-muted-foreground">
          <ChromeIcon className="size-3.5 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        {showClipper && (
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-xs font-semibold text-background",
              animationStyles.pluginIcon,
            )}
          >
            N
          </div>
        )}
      </div>
    </CardHeader>
  );
}

function DownloadButton({
  download,
  label,
  variant = "default",
  size = "lg",
}: {
  download?: WebClipperDownload;
  label: string;
  variant?: "default" | "outline";
  size?: "sm" | "lg";
}) {
  if (!download) {
    return (
      <Button variant={variant} size={size} disabled>
        <CloudOffIcon data-icon="inline-start" />
        {label}
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} asChild>
      <a href={download.url} download={download.filename}>
        <ArrowDownToLineIcon data-icon="inline-start" />
        {label}
      </a>
    </Button>
  );
}

function FeatureHighlights({ lang }: { lang: SupportedLang }) {
  const t = copy[lang].outcome;
  const items = [
    { icon: FileTextIcon, ...t.selection },
    { icon: LinkIcon, ...t.page },
    { icon: NotebookPenIcon, ...t.organize },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
      {items.map((item) => (
        <Card key={item.title} className="min-h-64 gap-5 py-7 shadow-none">
          <CardHeader className="gap-5 px-6 sm:px-7">
            <div className="flex size-11 items-center justify-center rounded-lg bg-secondary">
              <item.icon className="size-5" />
            </div>
            <CardTitle className="text-lg leading-7">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-7">
            <p className="leading-7 text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col items-start gap-3">
      <Badge variant="outline">{eyebrow}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-muted-foreground">{description}</p>
    </div>
  );
}
