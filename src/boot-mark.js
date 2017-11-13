import showdown from 'showdown';
import { toc, tocLess } from './templates';
import {
  getMarkdown,
  doDom,
  insertLink,
  insertMeta,
} from './util';

// http://www.diffhtml.org/
// https://github.com/tbranyen/todomvc/
// https://github.com/tbranyen/diffhtml/tree/master/packages/diffhtml-components
// https://github.com/tbranyen/diffhtml/tree/master/packages/diffhtml
// https://github.com/choojs/nanomorph
// https://github.com/patrick-steele-idem/morphdom

export class Bootmark extends HTMLElement {
  static get version() { return '0.9.0'; }
  constructor(config) {
    super();
    if (this.attachShadow) {
      this.attachShadow({ mode: 'open' });
    }
    Object.assign(this, config);

    if (
      this.html.prettify && // user wants to prettify
      this.showdown.extensions.indexOf('prettify') < 0 && // user hasn't already added the prettify extension to the array
      typeof prettyPrint !== 'undefined' // google-code-prettify isn't undefined
    ) {
      this.showdown.extensions.push('prettify'); //push prettify to the extensions
    }

    // insert meta tag required by bootstrap
    insertMeta(
      'viewport',
      'width=device-width, initial-scale=1'
    );
    // bootswatch theme
    insertLink(
      'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' +
      this.html.theme.toLowerCase().trim() +
      '/bootstrap.min.css'
    );
    // favicon
    if (this.html.favicon) {
      insertLink(
        this.html.favicon,
        'image/x-icon',
        'shortcut icon'
      );
    }
    // bootmark's css
    insertLink('https://unpkg.com/bootmark@' + Bootmark.version + '/dist/bootmark.min.css');

    // prettify's css theme file
    if (this.showdown.extensions.indexOf('prettify') >= 0) {// extension is in the array
      insertLink(
        'https://jmblog.github.io/color-themes-for-google-code-prettify/themes/' + this.html.prettifyTheme.toLowerCase().trim().replace(/ /g, '-') + '.min.css'
      );
    }

  }
  static get observedAttributes() { return ['src', 'separator', 'theme', 'prettify-theme']; }
  attributeChangedCallback(attr, oldValue, newValue, namespace) {
    if (typeof this[`${attr}Changed`] === 'function') {
      this[`${attr}Changed`](oldValue, newValue, namespace);
    }
    this.render();
  }

  set src(src) { this.setAttribute('src', src); }
  get src() { return this.getAttribute('src'); }
  set separator(separator) { this.setAttribute('separator', separator); }
  get separator() {
    const attr = this.getAttribute('separator');
    return attr === null ? '----' : attr;
  }
  set theme(theme) { this.setAttribute('theme', theme); }
  get theme() {
    const attr = this.getAttribute('theme');
    return attr === null ? 'readable' : attr;
  }
  set prettifyTheme(theme) { this.setAttribute('prettify-theme', theme); }
  get prettifyTheme() {
    const attr = this.getAttribute('prettify-theme');
    return attr === null ? 'atelier-forest-light' : attr;
  }

  get showdown(){
    return this._showdown || {
      parseImgDimensions: true,
      simplifiedAutoLink: true,
      literalMidWordUnderscores: true,
      strikethrough: true,
      tables: true,
      tablesHeaderId: true,
      tasklists: true,
      extensions: []
    };
  }
  set showdown(config){
    Object.assign(this._showdown, config);
  }

  render() {
    getMarkdown(this).then(markdown => {
      const html = new showdown.Converter(this.showdown).makeHtml(markdown);
      let template = this.template;
      if (typeof template !== 'function') {
        template = this.html.toc ? toc : tocLess;
      }
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = template(html, this);
        doDom(this.shadowRoot, this);
      } else {
        this.innerHTML = template(html, this);
        doDom(this, this);
      }
    }, console.error);
  }
}

if (customElements) {
  customElements.define('boot-mark', Bootmark);
}
