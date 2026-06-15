import SectionWrap from './section-wrap';
import { GitHubIssue } from '@/lib/github-data';
import { RoadmapList } from '@/components/ui/roadmap-list';
import type { RoadmapListItem } from '@/components/ui/roadmap-list';
import { ArrowRight } from 'lucide-react';

export default function HomeIssues({
  issues,
  totalCount,
  lang
}: {
  issues: GitHubIssue[];
  totalCount: number;
  lang: string;
}) {
  const isCn = lang === 'cn';
  const roadmapItems: RoadmapListItem[] = issues.map((issue) => ({
    id: issue.id,
    title: cleanIssueTitle(issue.title),
    href: issue.html_url,
    meta: isCn
      ? `#${issue.number} / ${formatIssueDate(issue.created_at, 'zh-CN')}`
      : `#${issue.number} / ${formatIssueDate(issue.created_at, 'en-US')}`,
    comments: isCn ? `${issue.comments} 条讨论` : `${issue.comments} comments`,
    labels: issue.labels.map((label) => label.name),
  }));

  return (
    <SectionWrap>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {isCn ? '开发计划' : 'Development Plan'}
        </h2>
        <p className="text-fd-muted-foreground">
          {isCn ? '公开跟进正在推进的功能、问题和建议' : 'Track active features, issues, and suggestions in public'}
        </p>
      </div>

      <RoadmapList
        items={roadmapItems}
        emptyText={isCn ? '暂无功能建议' : 'No feature requests'}
      />

      <div className="text-center mt-6">
        <a
          href="https://github.com/codexu/note-gen/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-fd-border border-dashed bg-fd-card px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {isCn ? `查看全部 (${totalCount})` : `View all (${totalCount})`}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </SectionWrap>
  );
}

function cleanIssueTitle(title: string) {
  return title.replace(/^\[(?:bug|feat|fix|docs|refactor|chore|style|test|ci|perf|build|revert)]\s*/i, '');
}

function formatIssueDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}
