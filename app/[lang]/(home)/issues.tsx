import SectionWrap from './section-wrap';
import { GitHubIssue } from '@/lib/github-data';

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

  return (
    <SectionWrap>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {isCn ? '开发计划' : 'Development Plan'}
        </h2>
        <p className="text-fd-muted-foreground">
          {isCn ? '欢迎提交 Issue 和功能建议' : 'Welcome to submit Issues and feature requests'}
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-8 text-fd-muted-foreground">
          {isCn ? '暂无功能建议' : 'No feature requests'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.map((issue) => (
            <a
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-fd-border bg-fd-card hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
            >
              <span className="text-sm font-medium text-fd-foreground line-clamp-1">
                #{issue.number} {issue.title.replace(/^\[(?:bug|feat|fix|docs|refactor|chore||style|test|ci|perf|build|revert)]\s*/i, '')}
              </span>
            </a>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <a
          href="https://github.com/codexu/note-gen/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-fd-border bg-fd-card hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          {isCn ? `查看全部 (${totalCount})` : `View all (${totalCount})`}
        </a>
      </div>
    </SectionWrap>
  );
}
