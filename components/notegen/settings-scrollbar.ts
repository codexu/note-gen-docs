/** NoteGen globals.css scrollbar tokens and native scrollbar states, scoped to settings. */
export const settingsScrollbarCss = `
:is([data-notegen-replica="settings-shell"], [data-notegen-replica="settings-page"], [data-notegen-replica="settings-sidebar"], .ng-skills-settings-content){
  --ng-settings-scrollbar-size:12px;
  --ng-settings-scrollbar-track-hover:color-mix(in srgb,var(--color-muted,#f4f4f5) 28%,transparent);
  --ng-settings-scrollbar-thumb:color-mix(in srgb,var(--color-muted-foreground,#71717a) 26%,transparent);
  --ng-settings-scrollbar-thumb-hover:color-mix(in srgb,var(--color-muted-foreground,#71717a) 48%,transparent);
  --ng-settings-scrollbar-thumb-active:color-mix(in srgb,var(--color-foreground,#18181b) 62%,transparent);
}
.ng-settings-scroll{scrollbar-width:auto;scrollbar-color:auto;overscroll-behavior:contain}
.ng-settings-scroll::-webkit-scrollbar{display:block;width:var(--ng-settings-scrollbar-size);height:var(--ng-settings-scrollbar-size)}
.ng-settings-scroll::-webkit-scrollbar-track{background-color:transparent;transition:background-color .15s ease}
.ng-settings-scroll::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--ng-settings-scrollbar-thumb);border:4px solid transparent;background-clip:padding-box;transition:background-color .15s ease,border-width .15s ease}
.ng-settings-scroll::-webkit-scrollbar-track:hover{background-color:var(--ng-settings-scrollbar-track-hover)}
.ng-settings-scroll::-webkit-scrollbar-thumb:hover{border-width:2px;background-color:var(--ng-settings-scrollbar-thumb-hover)}
.ng-settings-scroll::-webkit-scrollbar-thumb:active{border-width:1px;background-color:var(--ng-settings-scrollbar-thumb-active)}
.ng-settings-scroll::-webkit-scrollbar-corner{background-color:transparent}
@supports (-moz-appearance:none){.ng-settings-scroll{scrollbar-width:thin;scrollbar-color:var(--ng-settings-scrollbar-thumb) transparent}}
[data-notegen-replica="settings-sidebar"]{position:relative}
.ng-settings-sidebar-viewport{scrollbar-width:none!important}
.ng-settings-sidebar-viewport::-webkit-scrollbar{display:none!important}
.ng-settings-sidebar-scrollbar{position:absolute;top:48px;bottom:16px;right:0;width:12px;padding:4px;display:var(--ng-settings-scrollbar-visible,block);background:transparent;pointer-events:none}
.ng-settings-sidebar-scrollbar i{display:block;width:100%;height:var(--ng-settings-thumb-height,74%);transform:translateY(var(--ng-settings-thumb-offset,0px));border-radius:9999px;background:var(--ng-settings-scrollbar-thumb);transition:background-color .15s ease}
[data-notegen-replica="settings-sidebar"]:hover .ng-settings-sidebar-scrollbar{background:var(--ng-settings-scrollbar-track-hover);padding:2px}
[data-notegen-replica="settings-sidebar"]:hover .ng-settings-sidebar-scrollbar i{background:var(--ng-settings-scrollbar-thumb-hover)}
[data-notegen-replica="settings-sidebar"]:active .ng-settings-sidebar-scrollbar i{background:var(--ng-settings-scrollbar-thumb-active)}
`
