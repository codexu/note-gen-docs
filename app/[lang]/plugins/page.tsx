import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BlocksIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { getPageAlternates, normalizeLang, siteConfig, type SupportedLang } from '@/lib/seo';
import { PluginMarket, type PluginCard } from '@/components/plugins/plugin-market';

const MARKET_INDEX_URL = 'https://download.notegen.top/plugins/v1/index.json';

export const revalidate = 3600;

type PluginRelease = {
  version?: unknown;
  minAppVersion?: unknown;
  platforms?: unknown;
  permissions?: unknown;
  revoked?: unknown;
};

type PluginLocalization = {
  name?: unknown;
  description?: unknown;
};

type MarketPlugin = {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  localizations?: unknown;
  author?: unknown;
  repository?: unknown;
  categories?: unknown;
  featured?: unknown;
  official?: unknown;
  permissions?: unknown;
  releases?: unknown;
};

type MarketIndex = {
  plugins?: unknown;
};

const copy = {
  cn: {
    meta: {
      title: 'NoteGen 插件市场 - 发现笔记工作流扩展',
      description: '浏览由 NoteGen 签名插件市场提供的插件，为笔记、写作和文件工作流增加扩展能力。',
    },
    eyebrow: 'NoteGen 插件市场',
    title: '为你的笔记工作流添加刚好的功能',
    description: '插件目录与 NoteGen 桌面端使用同一份已签名市场索引。请在应用的“设置 → 插件”中安装并审核权限。',
    emptyTitle: '暂时没有可展示的插件',
    emptyDescription: '插件目录暂时无法获取，请稍后刷新，或在 NoteGen 桌面端的“发现”中查看。',
    desktopNote: '插件仅在桌面端运行',
    docs: '了解插件系统',
  },
  en: {
    meta: {
      title: 'NoteGen Plugins - Extend your note workflows',
      description: 'Browse plugins from the signed NoteGen marketplace for notes, writing, and file workflows.',
    },
    eyebrow: 'NoteGen plugin marketplace',
    title: 'Add the right tools to your note workflow',
    description: 'This directory uses the same signed marketplace index as NoteGen desktop. Install plugins and review their permissions in Settings → Plugins.',
    emptyTitle: 'No plugins are available to show yet',
    emptyDescription: 'The marketplace directory is temporarily unavailable. Refresh later or browse Discover in NoteGen desktop.',
    desktopNote: 'Plugins run on desktop only',
    docs: 'Learn about plugins',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const language = normalizeLang((await params).lang);
  const t = copy[language].meta;

  return {
    title: t.title,
    description: t.description,
    alternates: getPageAlternates(language, '/plugins'),
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${language}/plugins`,
      siteName: siteConfig.name,
      type: 'website',
      locale: language === 'cn' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'cn' ? ['en_US'] : ['zh_CN'],
    },
  };
}

export default async function PluginsPage({ params }: { params: Promise<{ lang: string }> }) {
  const language = normalizeLang((await params).lang);
  const t = copy[language];
  const plugins = await getPlugins(language);

  return (
    <main className="flex-1">
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Badge variant="outline" className="gap-1.5"><BlocksIcon className="size-3.5" />{t.eyebrow}</Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">{t.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${language}/docs/plugins`} className={buttonVariants({ variant: 'outline' })}>{t.docs}</Link>
            <span className="inline-flex items-center gap-2 self-center text-sm text-muted-foreground"><ShieldCheckIcon className="size-4" />{t.desktopNote}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {plugins.length > 0 ? (
          <PluginMarket plugins={plugins} language={language} />
        ) : (
          <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
            <BlocksIcon className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">{t.emptyTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{t.emptyDescription}</p>
          </div>
        )}
      </section>
    </main>
  );
}

async function getPlugins(language: SupportedLang): Promise<PluginCard[]> {
  try {
    const response = await fetch(MARKET_INDEX_URL, { next: { revalidate } });
    if (!response.ok) throw new Error(`Marketplace returned ${response.status}`);
    const index = await response.json() as MarketIndex;
    if (!Array.isArray(index.plugins)) throw new Error('Marketplace index has no plugin list');

    return index.plugins
      .map((value) => toPluginCard(value as MarketPlugin, language))
      .filter((plugin): plugin is PluginCard => plugin !== null)
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, language === 'cn' ? 'zh-CN' : 'en'));
  } catch (error) {
    console.warn('[plugins] Unable to read marketplace index', error);
    return [];
  }
}

function toPluginCard(plugin: MarketPlugin, language: SupportedLang): PluginCard | null {
  const id = text(plugin.id);
  const localization = object(plugin.localizations)?.[language === 'cn' ? 'zh-CN' : 'en'] as PluginLocalization | undefined;
  const name = text(localization?.name) || text(plugin.name);
  const description = text(localization?.description) || text(plugin.description);
  const releases = Array.isArray(plugin.releases) ? plugin.releases as PluginRelease[] : [];
  const release = releases.find((item) => !text(item.revoked) && text(item.version));
  if (!id || !name || !description || !release) return null;

  const releasePermissions = strings(release.permissions);
  return {
    id,
    name,
    description,
    author: text(plugin.author) || 'Unknown',
    repository: url(plugin.repository),
    categories: strings(plugin.categories),
    featured: plugin.featured === true,
    official: plugin.official === true,
    version: text(release.version),
    minAppVersion: text(release.minAppVersion) || '—',
    platforms: strings(release.platforms),
    permissions: releasePermissions.length ? releasePermissions : strings(plugin.permissions),
  };
}

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function url(value: unknown): string | undefined {
  const candidate = text(value);
  try {
    return new URL(candidate).protocol === 'https:' ? candidate : undefined;
  } catch {
    return undefined;
  }
}
