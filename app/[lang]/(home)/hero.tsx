"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Github, Book, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import SectionWrap from './section-wrap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

// 格式化数字显示函数
function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

type GitHubStats = {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
};

interface HomeHeroProps {
  githubStats?: GitHubStats;
}

export default function HomeHero({ githubStats }: HomeHeroProps) {
  const params = useParams();
  const lang = (params?.lang as 'cn' | 'en') || 'cn';
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const h1Text = {
    cn: "一款跨平台的 Markdown AI Agent 笔记软件",
    en: "A cross-platform Markdown AI Agent note-taking software.",
  }[lang];

  const pText = {
    cn: "致力于使用 AI 建立记录和写作的桥梁",
    en: "Bridging the Gap Between Recording and Writing with LLM.",
  }[lang];

  const downloadLink = {
    cn: "下载客户端",
    en: "Download Client",
  }[lang];

  const docsLink = {
    cn: "使用文档",
    en: "Get Started",
  }[lang];

  // 使用服务端传入的数据，避免客户端 API 调用
  const starCount = githubStats?.stargazers_count || 0;
  const slides = [
    {
      id: 'product',
      title: 'NoteGen',
      subtitle: h1Text,
      description: pText,
      imageSrc: 'https://s2.loli.net/2025/12/22/jlpEP2c6ogwHhIA.png',
      imageAlt: 'NoteGen',
      primaryAction: {
        label: downloadLink,
        icon: Download,
        onClick: () => window.location.href = `/${lang}/download`,
        variant: 'default' as const,
      },
      secondaryAction: {
        label: docsLink,
        icon: Book,
        onClick: () => window.location.href = `/${lang}/docs`,
        variant: 'default' as const,
      },
      tertiaryAction: {
        label: `Github ${starCount ? formatNumber(starCount) : ''}`.trim(),
        icon: Github,
        onClick: () => window.open('https://github.com/codexu/note-gen', '_blank'),
        variant: 'outline' as const,
      },
    },
    {
      id: 'sponsor',
      title: {
        cn: '优云智算',
        en: 'Compshare',
      }[lang],
      subtitle: {
        cn: '高性价比GPU算力及全球模型API服务',
        en: 'Cost-effective GPU compute and global model API services',
      }[lang],
      description: {
        cn: '优云智算是UCloud旗下AI云平台，提供稳定、全面的国内外模型API，仅一个key即可调用。主打包月、按量的高性价比 Coding Plan 套餐，基于官方2~5折优惠。支持接入 Claude Code、Codex 及 API 调用。支持企业高并发、7*24技术支持、自助开票。',
        en: 'Compshare is an AI cloud platform from UCloud that offers stable model APIs through a single key, cost-effective Coding Plan packages, support for Claude Code, Codex, and API usage, plus enterprise concurrency, 24/7 support, and invoicing.',
      }[lang],
      imageSrc: 'https://files.seeusercontent.com/2026/03/30/O7ie/ecc5a560e33db091b6c8b2d2d695308e.jpg',
      imageAlt: {
        cn: '优云智算赞助海报',
        en: 'Compshare sponsor poster',
      }[lang],
      primaryAction: {
        label: {
          cn: '查看 Coding Plan',
          en: 'View Coding Plan',
        }[lang],
        icon: ExternalLink,
        onClick: () => window.open('https://www.compshare.cn/coding-plan?ytag=GPU_YY_JL_git_note-gen', '_blank'),
        variant: 'default' as const,
      },
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];
  const variants = {
    enter: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? 48 : -48,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? -48 : 48,
    }),
  };

  return (
    <SectionWrap className='group relative overflow-hidden'>
      <button
        type="button"
        aria-label={lang === 'cn' ? '上一张' : 'Previous slide'}
        className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-fd-border bg-fd-background/90 text-fd-foreground opacity-0 shadow-sm transition-all hover:bg-fd-muted group-hover:opacity-100 md:flex"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label={lang === 'cn' ? '下一张' : 'Next slide'}
        className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-fd-border bg-fd-background/90 text-fd-foreground opacity-0 shadow-sm transition-all hover:bg-fd-muted group-hover:opacity-100 md:flex"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative min-h-[520px] sm:min-h-[560px] lg:min-h-[420px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeSlide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            <div className='flex h-full flex-col lg:flex-row justify-between gap-8 md:gap-16 lg:gap-24'>
              <div className="flex flex-1 flex-col justify-center items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center">
                  <p className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{activeSlide.title}</p>
                </div>
                <h1 className="mb-3 text-lg font-bold sm:text-xl lg:text-2xl">{activeSlide.subtitle}</h1>
                <p className="max-w-prose text-fd-muted-foreground">
                  {activeSlide.description}
                </p>
                <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-12">
                  <Button className="w-full sm:w-auto" onClick={activeSlide.primaryAction.onClick} variant={activeSlide.primaryAction.variant}>
                    <activeSlide.primaryAction.icon />
                    {activeSlide.primaryAction.label}
                  </Button>
                  {activeSlide.secondaryAction ? (
                    <Button className="w-full sm:w-auto" onClick={activeSlide.secondaryAction.onClick} variant={activeSlide.secondaryAction.variant}>
                      <activeSlide.secondaryAction.icon />
                      {activeSlide.secondaryAction.label}
                    </Button>
                  ) : null}
                  {activeSlide.tertiaryAction ? (
                    <Button className="w-full sm:w-auto" onClick={activeSlide.tertiaryAction.onClick} variant={activeSlide.tertiaryAction.variant}>
                      <activeSlide.tertiaryAction.icon />
                      {activeSlide.tertiaryAction.label}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <Image
                  src={activeSlide.imageSrc}
                  alt={activeSlide.imageAlt}
                  width={1280}
                  height={720}
                  className="w-full max-w-[720px] object-contain"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`${lang === 'cn' ? '切换到第' : 'Go to slide '}${index + 1}${lang === 'cn' ? '张' : ''}`}
            aria-pressed={activeIndex === index}
            className={`h-3 w-3 rounded-full transition-all ${activeIndex === index ? 'scale-110 bg-fd-foreground' : 'bg-fd-border hover:bg-fd-muted-foreground'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </SectionWrap>
  );
}
