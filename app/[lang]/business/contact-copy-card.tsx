'use client';

import { Check, Copy, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

type ContactCopyCardProps = {
  label: string;
  value: string;
  type: 'wechat' | 'email';
  copyText: string;
  copiedText: string;
};

export function ContactCopyCard({
  label,
  value,
  type,
  copyText,
  copiedText,
}: ContactCopyCardProps) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const Icon = type === 'email' ? Mail : MessageCircle;

  return (
    <button
      type="button"
      onClick={copyValue}
      className="group flex w-full items-start gap-3 rounded-lg border bg-muted/30 p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${copied ? copiedText : copyText}: ${value}`}
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-background">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="break-words text-sm leading-6 text-muted-foreground">
          {value}
        </div>
      </div>
      <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </div>
      <span className="sr-only">{copied ? copiedText : copyText}</span>
    </button>
  );
}
