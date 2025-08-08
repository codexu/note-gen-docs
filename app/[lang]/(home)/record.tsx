"use client";
import { CopySlash, FilePlus, ImagePlus, Link, ScanText } from "lucide-react";
import SectionWrap from "./section-wrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

export default function HomeRecord() {
  const lang = (useParams().lang as 'cn' | 'en') || 'cn';

  const [current, setCurrent] = useState('text')
    
  const recordTitle = {
    cn: "记录",
    en: "Record",
  }[lang];

  const recordDescription = {
    cn: "记录功能是由记录工具和 AI 助手组成，辅助用户记录碎片化信息。",
    en: "The record function is composed of record tools and AI assistants, assist users in recording fragmented information.",
  }[lang];

  const aiConfig = {
    cn: "模型配置",
    en: "Model Config",
  }[lang];

  const recordList = [
    {
      cn: "提供了多种记录工具。",
      en: "Provided multiple record tools.",
    },
    {
      cn: "AI 聊天助手，可以记录对话内容。",
      en: "AI chat assistant that can record the content of conversations.",
    },
    {
      cn: "AI 整理助手，可以将全部记录整理为一篇可读的笔记。",
      en: "AI assistant that can organize all records into a readable note.",
    },
    {
      cn: "剪贴板助手，可以快速记录剪贴板中的文本或图片。",
      en: "Clipboard assistant that can quickly record text or images from the clipboard.",
    },
  ];

  const recordItems = [
    {
      key: 'text',
      icon: <CopySlash className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/ZkSeXtN5QUY7Cig.png',
      title: {
        cn: "文本记录",
        en: "Text",
      },
    },
    {
      key: 'screenshot',
      icon: <ScanText className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/grMLmOkZ97bRT5e.png',
      title: {
        cn: "截图记录",
        en: "Screenshot",
      },
    },
    {
      key: 'image',
      icon: <ImagePlus className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/qYNfG9SXv8rbw2e.png',
      title: {
        cn: "插图记录",
        en: "Image",
      },
    },
    {
      key: 'link',
      icon: <Link className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/Mh92fdZInVvboPS.png',
      title: {
        cn: "链接记录",
        en: "Link",
      },
    },
    {
      key: 'file',
      icon: <FilePlus className="size-4" />,
      image: 'https://s2.loli.net/2025/08/06/qlUZL3sgRnBWzpQ.png',
      title: {
        cn: "文件记录",
        en: "File",
      },
    },
  ];

  function handleChangeRecord(key: string) {
    setCurrent(key)
  }

  return <SectionWrap isPadding={false} className="grid grid-cols-3">
    <div className="col-span-2 flex flex-col gap-2 p-12">
      <h1 className="text-3xl font-bold mb-4">{recordTitle}</h1>
      <p className="text-fd-muted-foreground text-sm">{recordDescription}</p>
      <ul className="list-disc ml-4 text-sm text-fd-muted-foreground leading-6 mt-6">
        {recordList.map((feature, index) => (
          <li key={index}>{feature[lang]}</li>
        ))}
      </ul>
      <div className="flex gap-2 mt-6">
        <Button variant="default">
          {aiConfig}
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
      <div className="flex-1 grid grid-cols-5 border-t border-fd-border-foreground border-dashed">
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