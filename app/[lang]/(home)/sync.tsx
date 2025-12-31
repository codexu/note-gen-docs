"use client";
import { useParams } from 'next/navigation';
import { Github, GitBranch, Download, Cloud } from 'lucide-react';
import SectionWrap from './section-wrap';

// Custom SVG Components
const GithubIcon = () => (
  <svg className="size-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="#231F20"/>
  </svg>
);

const GiteeIcon = () => (
  <svg className="size-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06"/>
    <path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF"/>
  </svg>
);

const GitLabIcon = () => (
  <svg className="size-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M932.317184 567.76704L885.10464 422.46144l-93.57312-287.997952c-4.8128-14.81728-25.776128-14.81728-30.590976 0L667.36128 422.459392H356.62848L263.051264 134.46144c-4.8128-14.81728-25.776128-14.81728-30.593024 0l-93.57312 287.997952-47.210496 145.309696a32.165888 32.165888 0 0 0 11.68384 35.96288l408.6272 296.890368L920.61696 603.734016c11.272192-8.192 15.990784-22.71232 11.68384-35.964928" fill="#FC6D26"/>
    <path d="M512.002048 900.62848l155.365376-478.171136H356.634624z" fill="#E24329"/>
    <path d="M512.004096 900.62848L356.63872 422.47168H138.901504z" fill="#FC6D26"/>
    <path d="M138.891264 422.465536l-47.214592 145.309696a32.16384 32.16384 0 0 0 11.685888 35.96288L511.991808 900.62848z" fill="#FCA326"/>
    <path d="M138.893312 422.459392h217.737216L263.053312 134.46144c-4.8128-14.819328-25.778176-14.819328-30.590976 0z" fill="#E24329"/>
    <path d="M512.002048 900.62848l155.365376-478.154752H885.10464z" fill="#FC6D26"/>
    <path d="M885.11488 422.465536l47.214592 145.309696a32.16384 32.16384 0 0 1-11.685888 35.96288L512.014336 900.62848z" fill="#FCA326"/>
    <path d="M885.096448 422.459392H667.36128l93.577216-287.997952c4.814848-14.819328 25.778176-14.819328 30.590976 0z" fill="#E24329"/>
  </svg>
);

const GiteaIcon = () => (
  <svg className="size-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M178.592 231.296c-78.72-0.16-184.16 49.888-178.336 175.36 9.088 196 209.92 214.176 290.176 215.776 8.8 36.768 103.264 163.584 173.184 170.24h306.336c183.712-12.192 321.28-555.616 219.296-557.664-168.672 7.936-268.64 11.936-354.336 12.64v169.6l-26.72-11.808-0.16-157.696c-98.4-0.032-184.992-4.608-349.408-12.704-20.576-0.128-49.248-3.616-80.032-3.712z m11.136 69.344h9.376c11.168 100.48 29.344 159.232 66.144 248.992-93.856-11.104-173.728-38.368-188.416-140.16-7.584-52.704 18.016-107.68 112.896-108.832z m365.12 98.752c6.4 0.096 12.928 1.28 19.072 4.096l31.968 13.792-22.912 41.76h-0.224a31.872 31.872 0 0 0-10.272 1.696l0.192-0.064c-11.168 3.648-18.976 12.992-18.976 23.968 0 3.104 0.608 6.048 1.76 8.8l-0.064-0.192a24.544 24.544 0 0 0 4.832 7.456l-0.032-0.032-39.52 71.936a31.68 31.68 0 0 0-9.664 1.664l0.192-0.064c-11.168 3.648-18.976 12.992-18.976 23.968 0 3.104 0.608 6.048 1.76 8.8l-0.064-0.192c4.096 9.92 14.624 16.864 26.976 16.864a31.584 31.584 0 0 0 9.92-1.568l-0.192 0.064c11.136-3.648 18.944-12.992 18.944-23.968 0-3.104-0.64-6.08-1.792-8.864l0.064 0.192a25.088 25.088 0 0 0-6.752-9.376l38.496-70.048a31.968 31.968 0 0 0 12.704-1.312l-0.192 0.064a30.144 30.144 0 0 0 9.12-4.8l-0.032 0.032c14.848 6.24 27.008 11.296 35.744 15.616 13.152 6.496 17.792 10.784 19.2 15.584 1.408 4.704-0.128 13.728-7.552 29.6-5.536 11.808-14.72 28.576-25.568 48.352h-0.64a31.712 31.712 0 0 0-10.272 1.696l0.192-0.064c-11.168 3.648-18.976 12.992-18.976 23.968 0 3.104 0.608 6.048 1.76 8.8l-0.064-0.192c4.096 9.92 14.624 16.864 26.976 16.864a31.584 31.584 0 0 0 9.92-1.568l-0.192 0.064c11.136-3.648 18.944-12.992 18.944-23.968a22.496 22.496 0 0 0-1.76-8.8l0.064 0.192a25.664 25.664 0 0 0-5.856-8.64l0.032 0.032c10.72-19.552 19.936-36.352 25.856-48.992 8.032-17.152 12.192-29.92 8.544-42.24s-14.944-20.352-29.856-27.744c-9.824-4.832-22.048-9.952-36.704-16.096a23.136 23.136 0 0 0-1.664-10.368l0.064 0.192a25.344 25.344 0 0 0-6.208-8.928l22.528-41.088 124.768 53.888c22.528 9.76 31.84 33.696 20.896 53.76l-85.76 157.024c-10.976 20-37.888 28.288-60.416 18.56l-176.512-76.288c-22.528-9.728-31.872-33.696-20.896-53.76l85.76-156.96c7.52-13.792 22.624-21.984 38.624-22.624z" fill="#609926"/>
  </svg>
);

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
      icon: <GithubIcon />,
      name: "GitHub",
      title: {
        cn: "GitHub",
        en: "GitHub Sync",
      },
      category: 'primary',
    },
    {
      icon: <GiteeIcon />,
      name: "Gitee",
      title: {
        cn: "Gitee",
        en: "Gitee Sync",
      },
      category: 'primary',
    },
    {
      icon: <GitLabIcon />,
      name: "GitLab",
      title: {
        cn: "GitLab",
        en: "GitLab Sync",
      },
      category: 'primary',
    },
    {
      icon: <GiteaIcon />,
      name: "Gitea",
      title: {
        cn: "Gitea",
        en: "Gitea Sync",
      },
      category: 'primary',
    },
    {
      icon: <Download className="size-8" />,
      name: "Local Backup",
      title: {
        cn: "本地备份",
        en: "Local Backup",
      },
      category: 'backup',
    },
    {
      icon: <Cloud className="size-8" />,
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
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '主要同步方案' : 'Primary Sync Solutions'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {primarySolutions.map((solution, index) => (
                <SyncItem key={`primary-${index}`} solution={solution} lang={lang} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '备用备份方案' : 'Backup Solutions'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {backupSolutions.map((solution, index) => (
                <SyncItem key={`backup-${index}`} solution={solution} lang={lang} />
              ))}
            </div>
          </div>
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
