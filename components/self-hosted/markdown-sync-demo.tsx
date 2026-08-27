"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { NoteGenProductShowcase } from "@/app/[lang]/(home)/hero";

type DemoLanguage = "cn" | "en";

const demoCopy = {
  cn: {
    section: "晚餐安排",
    sentence: "湖滨餐厅已预约 19:00 靠窗座位。",
    mobileTitle: "周末杭州行程",
    mobileIntro: "两天以西湖、象山和城西为主，减少跨区往返。",
    mobileOverview: "行程概览",
    mobilePoints: ["周六：西湖慢走、象山校区", "周日：法喜寺、天目里"],
    mobileSection: "晚餐安排",
    mobileDay: "周六 · 西湖与象山",
    mobileSchedule: [
      ["09:00–12:00", "西湖慢走", "从曲院风荷出发，沿北山街走到孤山。"],
      ["12:15–13:30", "午餐", "在孤山附近简单吃面，避开热门餐厅排队。"],
      ["15:00–17:30", "中国美院象山校区", "从西湖打车前往象山，重点看建筑与公共空间。"],
      ["19:00", "杭帮菜晚餐", "选择收藏里的餐厅，提前预约靠窗座位。"],
    ],
    mobileNextDay: "周日 · 法喜寺与天目里",
    remoteDevice: "iPhone",
  },
  en: {
    section: "Dinner plan",
    sentence: "Window table booked by the lake for 19:00.",
    mobileTitle: "Weekend in Hangzhou",
    mobileIntro: "Two relaxed days around West Lake, Xiangshan, and the west side.",
    mobileOverview: "Itinerary overview",
    mobilePoints: ["Saturday: West Lake and Xiangshan", "Sunday: Faxi Temple and Tianmuli"],
    mobileSection: "Dinner plan",
    mobileDay: "Saturday · West Lake and Xiangshan",
    mobileSchedule: [
      ["09:00–12:00", "West Lake walk", "Start at Quyuan Garden and follow Beishan Road to Solitary Hill."],
      ["12:15–13:30", "Lunch", "Grab noodles near Solitary Hill and skip the busiest queues."],
      ["15:00–17:30", "Xiangshan campus", "Explore the architecture and public spaces around the campus."],
      ["19:00", "Hangzhou dinner", "Use the saved restaurant and reserve a window table."],
    ],
    mobileNextDay: "Sunday · Faxi Temple and Tianmuli",
    remoteDevice: "iPhone",
  },
} as const;

export function MarkdownSyncDemo({ lang }: { lang: DemoLanguage }) {
  const copy = demoCopy[lang];
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const sentenceLength = Array.from(copy.sentence).length;

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setTick((current) => current + 1), 100);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const cycleLength = sentenceLength + 25;
  const cycle = reduceMotion ? sentenceLength + 10 : tick % cycleLength;
  const mobileCount = cycle < sentenceLength
    ? cycle
    : cycle < sentenceLength + 15
      ? sentenceLength
      : 0;
  const desktopCount = cycle < 5
    ? 0
    : cycle < sentenceLength + 5
      ? Math.min(cycle - 5, sentenceLength)
      : cycle < sentenceLength + 15
        ? sentenceLength
        : 0;
  const mobileText = Array.from(copy.sentence).slice(0, mobileCount).join("");
  const desktopText = Array.from(copy.sentence).slice(0, desktopCount).join("");

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-visible bg-background">
      <NoteGenProductShowcase
        className="block h-auto w-full object-contain"
        priority
      />

      <div className="absolute bottom-[11%] left-[30.6%] top-[53.5%] w-[31.5%] overflow-hidden bg-background pr-[2%]">
        <h4 className="mb-[2.2%] text-[clamp(6px,0.9vw,13px)] font-semibold">{copy.section}</h4>
        <p className="min-h-[1.5em] text-[clamp(5px,0.72vw,10px)] leading-relaxed text-muted-foreground">
          {desktopText}
          {desktopCount > 0 && desktopCount < sentenceLength ? <RemoteCursor label={copy.remoteDevice} /> : null}
        </p>
        <div className="mt-[6%] flex flex-col gap-[3%] text-[clamp(4px,0.57vw,8px)] leading-relaxed text-muted-foreground">
          {copy.mobileSchedule.map(([time, item, description]) => (
            <div key={time}>
              <p className="font-semibold text-foreground"><span>{time}</span>　{item}</p>
              <p className="mt-[1.5%]">{description}</p>
            </div>
          ))}
        </div>
        <h4 className="mt-[5%] border-t pt-[3%] text-[clamp(5px,0.72vw,10px)] font-semibold">{copy.mobileNextDay}</h4>
      </div>

      <div className="absolute bottom-[9.7%] left-[77.2%] top-[35.1%] w-[19.7%] overflow-hidden bg-background px-[1.5%] py-[2.4%]">
        <div className="flex h-full flex-col">
          <h3 className="text-[clamp(7px,1.05vw,15px)] font-bold tracking-tight">{copy.mobileTitle}</h3>
          <p className="mt-[6%] text-[clamp(5px,0.65vw,9px)] leading-relaxed text-muted-foreground">{copy.mobileIntro}</p>
          <h4 className="mt-[8%] text-[clamp(5px,0.72vw,10px)] font-semibold">{copy.mobileOverview}</h4>
          <ul className="mt-[3%] flex list-disc flex-col gap-1 pl-[7%] text-[clamp(5px,0.6vw,8px)] leading-relaxed text-muted-foreground">
            {copy.mobilePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <h4 className="mt-[10%] text-[clamp(5px,0.72vw,10px)] font-semibold">{copy.mobileSection}</h4>
          <p className="mt-[4%] min-h-[3em] text-[clamp(5px,0.65vw,9px)] leading-relaxed text-muted-foreground">
            {mobileText}
            {mobileCount > 0 && mobileCount < sentenceLength ? <LocalCaret /> : null}
          </p>
          <h4 className="mt-[8%] text-[clamp(5px,0.72vw,10px)] font-semibold">{copy.mobileDay}</h4>
          <div className="mt-[3%] flex flex-col gap-1.5 text-[clamp(4px,0.55vw,8px)] leading-relaxed text-muted-foreground">
            {copy.mobileSchedule.map(([time, item]) => (
              <p key={time}><span className="font-semibold text-foreground">{time}</span>　{item}</p>
            ))}
          </div>
          <h4 className="mt-[8%] border-t pt-[5%] text-[clamp(5px,0.72vw,10px)] font-semibold">{copy.mobileNextDay}</h4>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[6%] bg-gradient-to-b from-transparent via-background/65 to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[2.5%] bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[2.5%] bg-gradient-to-l from-background to-transparent"
      />
    </div>
  );
}

function RemoteCursor({ label }: { label: string }) {
  const color = "#2563eb";

  return (
    <span
      className="relative inline-block h-[1.25em] w-0 -ml-px border-l-2 align-text-bottom opacity-50 transition-opacity duration-150 hover:opacity-100"
      style={{ borderColor: color }}
      aria-label={`${label} cursor`}
    >
      <span
        className="absolute bottom-[calc(100%+2px)] left-[-2px] max-w-32 overflow-hidden whitespace-nowrap rounded-[4px_4px_4px_0] px-[5px] py-px text-[clamp(5px,0.6vw,9px)] font-semibold leading-tight text-white"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </span>
  );
}

function LocalCaret() {
  return (
    <span
      aria-hidden="true"
      className="ml-px inline-block h-[1.15em] w-px animate-pulse bg-foreground align-text-bottom"
    />
  );
}
