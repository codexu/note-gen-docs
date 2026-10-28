// Theme mapping stays inside chat replicas, including portals in scaled windows.
export const noteGenChatCss = `
.ng-chat-surface,.ng-chat-popover{--color-card:var(--color-background);--color-card-foreground:var(--color-foreground);--color-secondary:var(--color-muted);--color-secondary-foreground:var(--color-foreground);--color-popover:var(--color-background);--color-popover-foreground:var(--color-foreground);font-family:ui-sans-serif,system-ui,-apple-system,"PingFang SC",sans-serif}
.ng-chat-surface *,.ng-chat-popover *{box-sizing:border-box}
.ng-chat-surface pre{font-family:ui-monospace,monospace}
@media(prefers-reduced-motion:reduce){.ng-chat-spinner{animation:none!important}}
`
