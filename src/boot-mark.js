export class BootMark extends HTMLElement {
  static get is() { return 'boot-mark'; }
  static get observedAttributes() { return ['src']; }
  attributeChangedCallback(attr, oldValue, newValue, namespace) {
    if (typeof this[`${attr}Changed`] == 'function') { return; }
    this[`${attr}Changed`](oldValue, newValue, namespace);
  }

  set src(src) {
    this.setAttribute('src', src);
  }
  get src() {
    return this.getAttribute('src');
  }

  created() {
    this.attachShadow({ mode: 'open' });



    this.render();
  }
  render() {
    const inner = this.innerHTML;
    this.html`
        <style>
          :host {
            display: block;
          }
          :host([hidden]) {
            display: none;
          }
        </style>

        ${inner}
    `;
  }
}

customElements.define(BootMark.is, BootMark);