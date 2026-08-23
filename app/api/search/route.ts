import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { isSelfHostedDocsUrl, isSelfHostedEnabled } from '@/lib/self-hosted';

const searchSource = isSelfHostedEnabled
  ? source
  : {
      ...source,
      getPages(language?: string) {
        return source
          .getPages(language)
          .filter((page) => !isSelfHostedDocsUrl(page.url));
      },
      getLanguages() {
        return source.getLanguages().map(({ language, pages }) => ({
          language,
          pages: pages.filter((page) => !isSelfHostedDocsUrl(page.url)),
        }));
      },
    };

export const { GET } = createFromSource(searchSource, {
  // https://docs.orama.com/open-source/supported-languages
  localeMap: {
    // [locale]: Orama options
    cn: {
      components: {
        tokenizer: createTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    en: { language: 'english' },
  },
});
