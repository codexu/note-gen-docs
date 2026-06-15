"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoadmapListItem {
  id: number;
  title: string;
  href: string;
  meta: string;
  comments: string;
  labels: string[];
}

export function RoadmapList({
  items,
  emptyText,
}: {
  items: RoadmapListItem[];
  emptyText: string;
}) {
  if (items.length === 0) {
    return (
      <div className="border border-fd-border border-dashed py-10 text-center text-sm text-fd-muted-foreground">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 border border-fd-border border-dashed bg-background md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          className={cn(
            "group grid grid-cols-[auto_1fr_auto] gap-3 px-4 py-3 text-left transition-colors hover:bg-fd-muted/50",
            "border-fd-border border-dashed",
            index !== items.length - 1 && "border-b",
            "md:[&:not(:nth-last-child(-n+2))]:border-b md:[&:nth-child(2n+1)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0",
            "lg:[&:not(:nth-last-child(-n+3))]:border-b lg:[&:nth-child(2n+1)]:border-r-0 lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-last-child(-n+3)]:border-b-0"
          )}
        >
          <div className="pt-1">
            <span className="block size-2.5 border border-fd-primary bg-background transition-colors group-hover:bg-fd-primary" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-fd-muted-foreground">
              <span>{item.meta}</span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="size-3" />
                {item.comments}
              </span>
              {item.labels.slice(0, 2).map((label) => (
                <span
                  key={label}
                  className="border border-fd-border border-dashed px-1.5 py-0.5"
                >
                  {label}
                </span>
              ))}
            </div>
            <h3 className="mt-1 line-clamp-1 text-sm font-medium text-fd-foreground">
              {item.title}
            </h3>
          </div>

          <ArrowUpRight className="mt-1 size-3.5 text-fd-muted-foreground transition-colors group-hover:text-fd-primary" />
        </motion.a>
      ))}
    </div>
  );
}
