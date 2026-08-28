# NoteGen Documentation

This repository contains the NoteGen website, bilingual product documentation, download pages, and source-grounded interface replicas used by the docs.

## Local development

Requirements:

- Node.js compatible with Next.js 15
- pnpm

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Production commands are:

```bash
pnpm build
pnpm start
```

## Repository structure

```text
app/                    Next.js routes for the website, docs, and APIs
components/notegen/     deterministic NoteGen interface replicas
content/docs/           Chinese and English MDX documentation
lib/                    content loading, i18n, SEO, and server helpers
public/                 static website assets
src/config/             download metadata
```

Documentation navigation is defined by:

- `content/docs/meta.json` for Chinese;
- `content/docs/meta.en.json` for English.

## Documentation conventions

Every published documentation page must have a Chinese/English pair:

```text
content/docs/<path>.mdx
content/docs/<path>.en.mdx
```

Keep both files aligned in scope and heading order. Internal links must include the locale:

```md
[同步配置](/cn/docs/settings/sync)
[Sync](/en/docs/settings/sync)
```

Use stable headings, concrete UI paths, prerequisites, warnings before destructive actions, validation steps, and rollback instructions for migrations or sync changes. Link to an existing page instead of duplicating volatile configuration details.

## Interface previews

Documentation can render deterministic NoteGen replicas with `NoteGenDocPreview`:

```mdx
<NoteGenDocPreview kind="desktop-canvas" lang="cn" label="桌面端画布界面" />
<NoteGenDocPreview kind="settings" section="webSearch" lang="en" label="Web search settings" />
<NoteGenDocPreview kind="mobile" screen="writing" lang="en" label="Mobile editor" />
```

Supported preview types are defined in `components/notegen/doc-preview.tsx`. Update a replica from the real NoteGen source and UI; do not invent controls that are not implemented.

## Source of truth

The product repository is the source of truth for behavior. Before documenting a feature, inspect the corresponding route, settings page, store, and platform checks in `note-gen`.

Update documentation when a product change affects:

- a user-visible workflow or setting;
- platform availability;
- permissions, privacy, or data transmission;
- import, export, backup, sync, or migration behavior;
- a command, port, path, model type, or supported format;
- recovery, rollback, or troubleshooting steps.

When behavior is experimental or platform-dependent, label it explicitly.

## Adding a page

1. Add the Chinese and English MDX files.
2. Add both locales to `meta.json` and `meta.en.json` in the same position.
3. Add links from related overview, tutorial, settings, or troubleshooting pages.
4. Reuse an existing interface replica when it materially helps the task.
5. Check that examples, links, platform notes, privacy boundaries, and rollback guidance match the source.

## Review checklist

- The reader and task are obvious from the title and introduction.
- Chinese and English pages cover the same behavior.
- UI names match the current application translations.
- Platform differences are stated near the affected step.
- Destructive or overwriting actions have a warning and backup step.
- Secrets and private content are never used in examples.
- Related pages are linked instead of copied.
- New navigation entries exist in both metadata files.

## Deployment

Deployment scripts and process configuration live in `scripts/`, `ecosystem.config.js`, and the repository workflows. Keep environment-specific credentials out of the repository.
