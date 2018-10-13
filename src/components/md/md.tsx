import { Component, Element, Prop, State, Watch } from '@stencil/core';
import memoizeOne from 'memoize-one';
import showdown from 'showdown';
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

const getConfig = (
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

const getMarkdown = async (src: string): Promise<string> => {
  const res = await fetch(src);
  const text = await res.text();
  return text;
};

const makeGetHTML = (converter: showdown.Converter) =>
  memoizeOne((md: string) => converter.makeHtml(md));

const getConverter = (config: showdown.ConverterOptions) =>
  new showdown.Converter(config);

@Component({
  tag: 'bootmark-md',
  shadow: false,
})
export class BootMarkMd {
  @Element()
  element: HTMLElement;

  @State()
  initialContent: string;

  @State()
  getHTML: (md: string) => string;

  @State()
  md: string;

  async componentWillLoad() {
    if (this.initialContent === undefined) {
      this.initialContent = this.element.innerHTML;
    }

    this.showdownChanged();
    await this.srcChanged();
  }

  @Prop()
  showdown: showdown.ConverterOptions;

  @Watch('showdown')
  showdownChanged() {
    const converter = getConverter(getConfig(this.showdown));
    // getHTML caches results
    this.getHTML = makeGetHTML(converter);
  }

  @Prop({ attr: 'src' })
  src: string;

  @Watch('src')
  async srcChanged() {
    if (this.src) {
      this.md = await getMarkdown(this.src);
    } else {
      this.md = this.initialContent;
    }
  }

  render() {
    // wrapping slot helps with escaping the html
    const slot = (
      <template>
        <slot />
      </template>
    );
    const html = this.getHTML(this.md);
    const main = <section class="content" innerHTML={html} />;

    return [slot, main];
  }
}
