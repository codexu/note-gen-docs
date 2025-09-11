"use client";
import { useParams } from 'next/navigation';
import { Github, GitBranch, Download, Cloud } from 'lucide-react';
import SectionWrap from './section-wrap';

type SyncSolution = {
  icon: React.ReactNode;
  name: string;
  title: {
    cn: string;
    en: string;
  };
  category: 'primary' | 'backup';
}

export default function HomeSync() {
  const lang = (useParams().lang as 'cn' | 'en') || 'cn';

  const sectionTitle = {
    cn: "免费同步方案",
    en: "Free Sync Solutions",
  }[lang];

  const sectionDescription = {
    cn: "支持多种代码托管平台同步，以及本地和云端备份方案。",
    en: "Supports multiple code hosting platforms for sync, plus local and cloud backup solutions.",
  }[lang];

  const syncSolutions: SyncSolution[] = [
    {
      icon: <Github className="size-6" />,
      name: "GitHub",
      title: {
        cn: "GitHub",
        en: "GitHub Sync",
      },
      category: 'primary',
    },
    {
      icon: <GitBranch className="size-6" />,
      name: "Gitee",
      title: {
        cn: "Gitee",
        en: "Gitee Sync",
      },
      category: 'primary',
    },
    {
      icon: <GitBranch className="size-6" />,
      name: "GitLab",
      title: {
        cn: "GitLab",
        en: "GitLab Sync",
      },
      category: 'primary',
    },
    {
      icon: <Download className="size-6" />,
      name: "Local Backup",
      title: {
        cn: "本地备份",
        en: "Local Backup",
      },
      category: 'backup',
    },
    {
      icon: <Cloud className="size-6" />,
      name: "WebDAV",
      title: {
        cn: "WebDAV",
        en: "WebDAV",
      },
      category: 'backup',
    },
  ];

  const primarySolutions = syncSolutions.filter(solution => solution.category === 'primary');
  const backupSolutions = syncSolutions.filter(solution => solution.category === 'backup');

  return (
    <SectionWrap isPadding={false}>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{sectionTitle}</h1>
          <p className="text-fd-muted-foreground text-sm">{sectionDescription}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {syncSolutions.map((solution, index) => (
            <SyncItem key={index} solution={solution} lang={lang} />
          ))}
        </div>
        
        <ul className="mt-6 list-disc">
          <li className="text-sm text-fd-muted-foreground leading-relaxed mt-6">
            {lang === 'cn' 
              ? '使用主要同步方案可以支持历史回滚功能，自动创建私有仓库，保证数据安全。'
              : 'Primary sync solutions support history rollback functionality and automatically create private repositories to ensure data security.'
            }
          </li>
          <li className="text-sm text-fd-muted-foreground leading-relaxed mt-2">
            {lang === 'cn' 
              ? '备用方案适合作为额外的数据保护措施。'
              : 'Backup solutions are suitable as additional data protection measures.'
            }
          </li>
        </ul>
        
      </div>
    </SectionWrap>
  );
}

function SyncItem({ solution, lang }: { solution: SyncSolution, lang: 'cn' | 'en' }) {
  const categoryLabel = {
    primary: {
      cn: "主要",
      en: "Primary",
    },
    backup: {
      cn: "备用",
      en: "Backup",
    },
  }[solution.category][lang];

  const categoryColor = solution.category === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary';

  return (
    <div className="relative flex flex-col items-center gap-2 py-8 border border-fd-border border-dashed rounded-lg hover:bg-fd-muted/50 transition-colors text-center">
      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${categoryColor}`}>
        {categoryLabel}
      </div>
      <div className="text-fd-primary mb-2">
        {solution.icon}
      </div>
      <h3 className="text-sm font-bold">{solution.title[lang]}</h3>
    </div>
  );
}
