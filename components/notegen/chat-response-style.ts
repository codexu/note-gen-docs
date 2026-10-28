// Source typography/token mapping, limited to response replicas.
export const noteGenResponseCss = `
.ng-chat-response{line-height:1.7;overflow-wrap:anywhere;--ng-response-success:hsl(142 71% 45%);--ng-response-success-fg:hsl(142 72% 24%);--ng-response-warning:hsl(38 92% 50%);--ng-response-warning-fg:hsl(32 95% 25%);--ng-response-info:hsl(217 91% 60%);--ng-response-info-fg:hsl(217 91% 35%)}
.ng-chat-response .ng-response-text,.ng-chat-response .ng-response-table{font-size:var(--ng-response-base,16px);line-height:1.7}
.ng-chat-response [data-response-heading="2"]{font-size:calc(var(--ng-response-base,16px)*1.5);line-height:1.4}
.ng-chat-response [data-response-heading="3"]{font-size:calc(var(--ng-response-base,16px)*1.25);line-height:1.4}
.ng-chat-response [data-response-heading="4"]{font-size:var(--ng-response-base,16px);line-height:1.4}
.ng-chat-response .ng-response-table th,.ng-chat-response .ng-response-table td{border:1px solid var(--color-border);padding:6px 12px;font-size:inherit}
.ng-chat-response .ng-response-table th{background:var(--color-muted);font-weight:600}
.ng-chat-response pre{max-width:100%;white-space:pre}
.ng-chat-response :is(.ng-response-text,.ng-response-table) :is(svg,img){max-width:100%}
:is(.dark,[data-theme="dark"]) .ng-chat-response{--ng-response-success-fg:hsl(142 69% 72%);--ng-response-warning-fg:hsl(48 96% 65%);--ng-response-info-fg:hsl(213 94% 78%)}
[data-theme="light"] .ng-chat-response{--ng-response-success-fg:hsl(142 72% 24%);--ng-response-warning-fg:hsl(32 95% 25%);--ng-response-info-fg:hsl(217 91% 35%)}
.ng-chat-response [data-response-tone="success"]{border-color:color-mix(in srgb,var(--ng-response-success) 30%,transparent);background:color-mix(in srgb,var(--ng-response-success) 10%,transparent);color:var(--ng-response-success-fg)}
.ng-chat-response [data-response-tone="warning"]{border-color:color-mix(in srgb,var(--ng-response-warning) 30%,transparent);background:color-mix(in srgb,var(--ng-response-warning) 10%,transparent);color:var(--ng-response-warning-fg)}
.ng-chat-response [data-response-tone="info"]{border-color:color-mix(in srgb,var(--ng-response-info) 30%,transparent);background:color-mix(in srgb,var(--ng-response-info) 10%,transparent);color:var(--ng-response-info-fg)}
.ng-chat-response [data-response-tone="warning"] [data-slot="alert-description"]{color:inherit}
@media(prefers-reduced-motion:reduce){.ng-chat-response [data-slot="progress-indicator"],.ng-chat-response [data-slot="accordion-trigger"]{transition:none!important}.ng-chat-response [data-slot="accordion-content"]{animation:none!important}}
`
