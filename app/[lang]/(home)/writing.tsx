"use client";
import { CopySlash, FilePlus, ImagePlus, Link, NotebookPen, ScanText } from "lucide-react";
import SectionWrap from "./section-wrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

export default function HomeWriting() {
  const lang = (useParams().lang as 'cn' | 'en') || 'cn';

  const [current, setCurrent] = useState('text')
    
  const writingTitle = {
    cn: "写作",
    en: "Writing",
  }[lang];

  const writingDescription = {
    cn: "由文件管理器和 Markdown 编辑器组成，并提供了丰富的工具辅助用户进行写作。",
    en: "Composed of a file manager and a Markdown editor, and provides rich tools to assist users in writing.",
  }[lang];

  const syncConfig = {
    cn: "同步配置",
    en: "Sync Configuration",
  }[lang];

  const writingList = [
    {
      cn: "文件管理支持无限层级，支持控制同步文件。",
      en: "File Manager Support Infinite Levels, Support Remote Control Synchronization.",
    },
    {
      cn: "AI 写作辅助，支持润色、续写等功能。",
      en: "AI Writing Assistance, Support Polishing, Continue Writing, etc.",
    },
    {
      cn: "支持手动同步或自动同步，支持版本控制。",
      en: "Support Manual Synchronization or Automatic Synchronization, Support Version Control.",
    },
    {
      cn: "RAG，编辑文件后自动向量计算。",
      en: "RAG, Vector Calculation After File Editing.",
    },
  ];

  const recordItems = [
    {
      key: 'text',
      icon: <NotebookPen className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/S1mRszepTtQ2Zow.png',
      title: {
        cn: "写作辅助",
        en: "Writing Assistant",
      },
    },
    {
      key: 'file',
      icon: <FilePlus className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/5fGjOtv3ZeauJ2H.png',
      title: {
        cn: "历史回滚",
        en: "History Rollback",
      },
    },
  ];

  function handleChangeRecord(key: string) {
    setCurrent(key)
  }

  return <SectionWrap isPadding={false} className="grid grid-cols-3">
    <div className="col-span-2 flex flex-col gap-2 p-12">
      <h1 className="text-3xl font-bold mb-4">{writingTitle}</h1>
      <p className="text-fd-muted-foreground text-sm">{writingDescription}</p>
      <ul className="list-disc ml-4 text-sm text-fd-muted-foreground leading-6 mt-6">
        {writingList.map((feature, index) => (
          <li key={index}>{feature[lang]}</li>
        ))}
      </ul>
      <div className="flex gap-2 mt-6">
        <Button variant="default" onClick={() => window.location.href = `${lang}/docs/settings/sync`}>
          {syncConfig}
        </Button>
      </div>
    </div>
    <div className="col-span-1 flex flex-col justify-between border-l border-fd-border-foreground border-dashed">
      <div className="p-1 overflow-hidden">
        <ImageZoom
          src={recordItems.find(item => item.key === current)?.image || ''}
          width={1280}
          height={720}
          alt=""
          className="object-contain h-full"
        />
      </div>
      <div className="flex-1 grid grid-cols-2 border-t border-fd-border-foreground border-dashed">
        {recordItems.map((item, index) => (
          <div
            onClick={() => handleChangeRecord(item.key)}
            key={index}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 not-first:border-l border-fd-border-foreground border-dashed
              ${current === item.key ? 'text-fd-primary' : 'text-fd-muted-foreground'}
            `}
          >
            {item.icon}
            <p className="text-xs">{item.title[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  </SectionWrap>
}