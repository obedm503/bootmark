($ => {
  class BootMark extends HTMLElement {
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

    /**
     * @method _doDom
     * @private
     * @memberof Bootmark
     * @description modifies the dom
     * @param {object} config bootmark config
     */
    _doDom(config) {
      const element = this.shadowDom;
      // adds '.page-scroll' to all anchors with href beginning with '#'
      if ($('a[href^="#"]', element).length) {
        const $links = $('a[href^="#"]', element);
        $links.each(function() {
          $(this).addClass('page-scroll');
        });
      }

      //auto close menu
      // attach event to document instead of '#nav' which might not even exist yet
      if ($(`#${config.html.tocId}`, element).length) {
        const $nav = $(`#${config.html.tocId}`, element);
        $nav.on('click', 'a', function() {
          $nav.collapse('hide');
        });
      }

      //add toc
      if (config.html.toc) {
        const ul = element.querySelector('ul.bootmark-toc');
        // object literal is faster than loop to get the headers
        const headers = {
          1: 'h1',
          2: 'h1, h2',
          3: 'h1, h2, h3',
          4: 'h1, h2, h3, h4',
          5: 'h1, h2, h3, h4, h5',
          6: 'h1, h2, h3, h4, h5, h6'
        };
        let lim = config.html.tocLimit;
        // limit lim to munbers between 1 and 6
        lim = (lim > 6) ? 6 : ((lim < 1) ? 1 : lim);

        element.querySelectorAll(headers[lim]).forEach(el => {
          const li = document.createElement('li');
          li.classList.add(`bootmark-${el.localName}`);
          li.innerHTML = `<a class="page-scroll" href="#${el.id}">${el.innerText}</a>`;
          ul.append(li);
        });
      }

      //style tables
      if ($('table', element).length) {
        $('table', element)
          .addClass(' table table-striped table-bordered ')
          .wrap(' <div class="table-responsive"></div> ');
      }

      //indent Paragraphs
      if (config.html.indent && $('p', element).length) {
        $('p', element).addClass('bootmark-indent');
      }

      //add footer
      if (config.html.credit && !document.querySelector('#bootmark-footer')) {
        const footer = document.createElement('footer');
        footer.setAttribute('id', 'bootmark-footer');
        footer.innerHTML = `
          <div class="container-fluid bg-primary">
            <p class="text-center">
              <a style="color: inherit" href="https://obedm503.github.io/bootmark">
                This project uses bootmark. Bootmark allows developers to focus on their projects and not how they are presented.
              </a>
            <p>
          </div>
        `;
        document.body.appendChild(footer);
      }

      //prettify code
      if (config.showdown.extensions.indexOf('prettify') >= 0) {
        prettyPrint();
      }

    }
  }

  customElements.define(BootMark.is, BootMark);

})(jQuery);
