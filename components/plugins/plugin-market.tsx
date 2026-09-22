'use client';

import { useMemo, useState } from 'react';
import {
  BlocksIcon,
  CheckCircle2Icon,
  FolderOpenIcon,
  SearchIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { SupportedLang } from '@/lib/seo';

export type PluginCard = {
  id: string;
  name: string;
  description: string;
  author: string;
  repository?: string;
  categories: string[];
  featured: boolean;
  official: boolean;
  version: string;
  minAppVersion: string;
  platforms: string[];
  permissions: string[];
};

const copy = {
  cn: {
    all: '全部',
    search: '搜索插件',
    searchPlaceholder: '按名称、功能、作者或分类搜索',
    results: (count: number) => `找到 ${count} 个插件`,
    noResultsTitle: '没有找到匹配的插件',
    noResultsDescription: '换一个关键词或分类试试。',
    official: '官方', featured: '推荐', version: '版本', requires: '需要 NoteGen', desktop: '桌面端', permissions: '权限',
    noPermissions: '无需额外权限', install: '安装',
  },
  en: {
    all: 'All',
    search: 'Search plugins',
    searchPlaceholder: 'Search by name, feature, author, or category',
    results: (count: number) => `${count} plugin${count === 1 ? '' : 's'}`, 
    noResultsTitle: 'No matching plugins found',
    noResultsDescription: 'Try another search term or category.',
    official: 'Official', featured: 'Featured', version: 'Version', requires: 'Requires NoteGen', desktop: 'Desktop', permissions: 'Permissions',
    noPermissions: 'No additional permissions', install: 'Install',
  },
} as const;

export function PluginMarket({ plugins, language }: { plugins: PluginCard[]; language: SupportedLang }) {
  const t = copy[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const plugin of plugins) for (const item of plugin.categories) counts.set(item, (counts.get(item) ?? 0) + 1);
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b, language === 'cn' ? 'zh-CN' : 'en'));
  }, [language, plugins]);
  const filtered = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase(language === 'cn' ? 'zh-CN' : 'en');
    return plugins.filter((plugin) => {
      const matchesCategory = !category || plugin.categories.includes(category);
      const searchable = [plugin.name, plugin.description, plugin.author, plugin.id, ...plugin.categories].join(' ').toLocaleLowerCase(language === 'cn' ? 'zh-CN' : 'en');
      return matchesCategory && (!terms || searchable.includes(terms));
    });
  }, [category, language, plugins, query]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <aside className="shrink-0 lg:sticky lg:top-20 lg:w-48" aria-label={t.search}>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          <button type="button" onClick={() => setCategory(null)} className={cn('shrink-0 justify-between', category === null ? buttonVariants({ size: 'sm' }) : buttonVariants({ variant: 'ghost', size: 'sm' }))}>{t.all} <span className="ml-4 opacity-70">{plugins.length}</span></button>
          {categories.map(([item, count]) => <button key={item} type="button" onClick={() => setCategory(category === item ? null : item)} className={cn('shrink-0 justify-between', category === item ? buttonVariants({ size: 'sm' }) : buttonVariants({ variant: 'ghost', size: 'sm' }))}>{item}<span className="ml-4 opacity-70">{count}</span></button>)}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md"><SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" aria-label={t.search} placeholder={t.searchPlaceholder} /></div>
          <p className="shrink-0 text-sm text-muted-foreground">{t.results(filtered.length)}</p>
        </div>
        {filtered.length > 0 ? <div className="mt-5 space-y-3">{filtered.map((plugin) => <PluginMarketCard key={plugin.id} plugin={plugin} language={language} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed px-6 py-16 text-center"><SearchIcon className="mx-auto size-8 text-muted-foreground" /><h2 className="mt-4 text-lg font-semibold">{t.noResultsTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{t.noResultsDescription}</p></div>}
      </div>
    </div>
  );
}

function PluginMarketCard({ plugin, language }: { plugin: PluginCard; language: SupportedLang }) {
  const t = copy[language];
  return <article className="flex flex-col gap-5 rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-foreground/20 sm:flex-row sm:items-center">
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted"><BlocksIcon className="size-5" /></span>
    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-1.5"><h2 className="font-semibold">{plugin.name}</h2>{plugin.official ? <Badge className="gap-1"><CheckCircle2Icon className="size-3" />{t.official}</Badge> : null}{plugin.featured ? <Badge variant="secondary">{t.featured}</Badge> : null}</div><p className="mt-1 text-sm leading-6 text-muted-foreground">{plugin.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{plugin.categories.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}<span className="inline-flex items-center px-1 text-xs text-muted-foreground">{t.version} {plugin.version}</span><span className="inline-flex items-center px-1 text-xs text-muted-foreground">{t.requires} {plugin.minAppVersion}</span>{plugin.platforms.includes('desktop') ? <span className="inline-flex items-center gap-1 px-1 text-xs text-muted-foreground"><FolderOpenIcon className="size-3.5" />{t.desktop}</span> : null}<span className="inline-flex items-center gap-1 px-1 text-xs text-muted-foreground"><ShieldCheckIcon className="size-3.5" />{plugin.permissions.length ? `${t.permissions}: ${plugin.permissions.length}` : t.noPermissions}</span></div></div>
    <a href={`notegen://plugins/install?id=${encodeURIComponent(plugin.id)}`} className={cn(buttonVariants({ size: 'sm' }), 'shrink-0')}>{t.install}</a>
  </article>;
}
