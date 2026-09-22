'use client';

import {
  BadgeCheckIcon,
  CircleDollarSignIcon,
  CloudIcon,
  HandshakeIcon,
  ListChecksIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type PartnershipRulesDialogProps = {
  title: string;
  description: string;
  triggerText: string;
  items: ReadonlyArray<{
    title: string;
    description: string;
  }>;
};

const ruleIcons = [
  CircleDollarSignIcon,
  BadgeCheckIcon,
  ListChecksIcon,
  ShieldCheckIcon,
  SparklesIcon,
  HandshakeIcon,
  CloudIcon,
];

export function PartnershipRulesDialog({
  title,
  description,
  triggerText,
  items,
}: PartnershipRulesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <ListChecksIcon data-icon="inline-start" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-4xl sm:rounded-2xl">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        {items.length > 0 && (
          <dl className="grid gap-3">
            {items.map((item, index) => {
              const Icon = ruleIcons[index] ?? HandshakeIcon;

              return (
                <div key={item.title} className="rounded-xl border bg-muted/20 p-4">
                  <dt className="flex items-center gap-3 text-sm font-medium">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {item.title}
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </DialogContent>
    </Dialog>
  );
}
