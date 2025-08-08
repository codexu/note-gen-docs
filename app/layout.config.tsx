import { i18n } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <Image
            src="https://s2.loli.net/2025/08/05/IceAMqnBJytp2wE.png"
            alt="NoteGen"
            width={24}
            height={24}
          />
          NOTEGEN.
        </>
      ),
    },
    links: [],
    githubUrl: 'https://github.com/codexu/note-gen',
  };
}
