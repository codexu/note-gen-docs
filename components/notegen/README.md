# NoteGen replica components

This folder contains style-only, code-native replicas for documentation and marketing pages. They do not connect to NoteGen stores, Tauri, databases, file APIs, or AI services.

## Component families

- `app-shell-replica`: platform window controls, capture toolbar, panel handle, app shell, and status bar.
- `record-replica`: tag chips, capture filters, list items, audio waveform, sidebar, and detail view.
- `file-editor-replica`: file tree, tabs, editor toolbar, bubble menu, document page, and editor status.
- `agent-replica`: message bubbles, thinking block, tool calls, execution timeline, context tray, and composer.
- `canvas-replica`: project cards, canvas tools, nodes, edges, grid, and zoom footer.
- `settings-replica`: reusable setting rows plus all current NoteGen settings categories and dialog presentation.
- `mobile-replica`: phone frame, status bar, dock, capture, Agent, writing, and settings screens.
- `feedback-replica`: global search, recording, sync states, image viewer, confirmation, and activity heatmap.

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
- `NoteGenWindowTitleBar` and `NoteGenWorkspaceSwitcher` reproduce shared app chrome.
- `NoteGenSettingsShell`, `NoteGenSettingsSidebar`, `NoteGenSettingsPage`, `NoteGenSettingsSection`, and `NoteGenSettingRow` can be combined into custom settings scenes.
- `NoteGenSettingSwitch`, `NoteGenSettingSelect`, and `NoteGenSettingSegmentedControl` reproduce individual settings controls.
- `NoteGenDesktopReplica` and `NoteGenSettingsReplica` are ready-made scenes.

Use `lang="cn"` or `lang="en"` for ready-made scenes. Lower-level components receive their visible copy as props, so documentation pages remain responsible for localized content.
