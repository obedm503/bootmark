import { Component, Element, Prop, State, Watch } from '@stencil/core';
import showdown from 'showdown';
import { fetchMarkdown, getShowdownConfig, makeGetHTML } from '../../util';

@Component({
  tag: 'boot-mark',
  shadow: false,
  styleUrl: 'md.css',
})
export class BootMark {
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
    const converter = new showdown.Converter(getShowdownConfig(this.showdown));
    // getHTML caches results
    this.getHTML = makeGetHTML(converter);
  }

  @Prop({ attr: 'src' })
  src: string;

  @Watch('src')
  async srcChanged() {
    if (this.src) {
      this.md = await fetchMarkdown(this.src);
    } else {
      this.md = this.initialContent;
    }
  }

  render() {
    if (!this.getHTML) {
      this.showdownChanged();
    }

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
