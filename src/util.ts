import memoizeOne from 'memoize-one';
import showdownHighlight from 'showdown-highlight';

const defaultConfig: showdown.ConverterOptions = {
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  literalMidWordUnderscores: true,
  strikethrough: true,
  tables: true,
  tablesHeaderId: true,
  tasklists: true,
};

export const getShowdownConfig = (
  config: showdown.ConverterOptions | undefined,
): showdown.ConverterOptions => {
  const userExtensions =
    config &&
    config.extensions &&
    (Array.isArray(config.extensions)
      ? config.extensions
      : [config.extensions]);

  return Object.assign(defaultConfig, config, {
    extensions: [showdownHighlight].concat(userExtensions).filter(Boolean),
  });
};

export const makeGetHTML = (converter: showdown.Converter) =>
  memoizeOne((md: string) => converter.makeHtml(md));

export const fetchMarkdown = async (src: string): Promise<string> => {
  console.log('fetch', src);
  const res = await fetch(src);
  const text = await res.text();
  return text;
};
