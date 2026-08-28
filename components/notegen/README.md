# NoteGen replica components

This folder contains style-only, code-native replicas for documentation and marketing pages. They do not connect to NoteGen stores, Tauri, databases, file APIs, or AI services.

## Component families

- `app-shell-replica`: platform window controls, capture toolbar, panel handle, app shell, and the unified full-width PC status bar.
- `record-replica`: tag chips, capture filters, list items, audio waveform, sidebar, and detail view.
- `file-editor-replica`: file tree, tabs, editor toolbar, bubble menu, and document page.
- `agent-replica`: message bubbles, thinking block, tool calls, execution timeline, context tray, and composer.
- `canvas-replica`: project cards, canvas tools, nodes, edges, and grid.
- `settings-replica`: reusable setting rows plus all current NoteGen settings categories and dialog presentation.
- `mobile-replica`: phone frame, status bar, dock, capture, Agent, writing, and settings screens.
- `feedback-replica`: global search, recording, sync states, image viewer, confirmation, and activity heatmap.
- `organize-notes-replica`: interactive three-step record organization dialog for the Record documentation.

Import every public component from `@/components/notegen`. Display-state props only change the rendered appearance; they intentionally do not implement product behavior.

Code-native NoteGen interface replicas for documentation and marketing pages. Import from `@/components/notegen` when composing a complete scene, or import a specific file when the component is used inside the replica implementation.

```tsx
import {
  NoteGenReplicaFrame,
  NoteGenSettingsPage,
  NoteGenSettingsSection,
  NoteGenSettingRow,
  NoteGenSettingsReplica,
  NoteGenWindowTitleBar,
} from "@/components/notegen"
```

The exports are organized by composition level:

- `NoteGenReplicaFrame`, `NoteGenReplicaPanel`, `NoteGenReplicaToolbar`, and `NoteGenReplicaIconButton` are the visual primitives.
- `NoteGenWindowTitleBar`, `NoteGenWorkspaceSwitcher`, and `NoteGenMainStatusBar` reproduce shared app chrome. PC workspace replicas expose one status bar across the full window instead of separate panel footers.
- `NoteGenSettingsShell`, `NoteGenSettingsSidebar`, `NoteGenSettingsPage`, `NoteGenSettingsSection`, and `NoteGenSettingRow` can be combined into custom settings scenes.
- `NoteGenSettingSwitch`, `NoteGenSettingSelect`, and `NoteGenSettingSegmentedControl` reproduce individual settings controls.
- `NoteGenDesktopReplica` and `NoteGenSettingsReplica` are ready-made scenes.

Use `lang="cn"` or `lang="en"` for ready-made scenes. Lower-level components receive their visible copy as props, so documentation pages remain responsible for localized content.

## Use in MDX documentation

`NoteGenDocPreview` is registered globally in `mdx-components.tsx`, so documentation pages do not need local imports. It keeps desktop replicas readable on narrow screens and provides consistent spacing for desktop, mobile, settings, activity, and sync-state scenes. Feature previews for Records, Writing, and Canvas use the list plus workspace layout without the unrelated chat panel. Settings documentation renders only the selected settings detail; the category sidebar remains available in the complete settings replica.

```mdx
<NoteGenDocPreview kind="desktop-writing" lang="en" label="Desktop writing workspace" />
<NoteGenDocPreview kind="desktop-canvas" lang="en" label="Desktop canvas workspace" />
<NoteGenDocPreview kind="mobile" screen="capture" lang="en" label="Mobile capture screen" />
<NoteGenDocPreview kind="settings" section="rag" lang="en" label="Knowledge Base settings" />
```

Use a code-native replica for product UI that already has a matching component. Keep raster images for content that cannot be represented by the replica kit, such as imported user media or platform-owned interfaces.
