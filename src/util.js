/**
 * unescapes some html entities
 * @param {string} text text to unescape
 * @returns escaped text
 * @memberof Bootmark
 */
export function unescape(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot/g, '"')
    .replace(/&#39/g, '\'')
    .replace(/&amp;/g, '&');
}

/**
 * creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css, and favicon
 * @param {String} url url to set as source
 * @param {String} [type=text/css] link's type
 * @param {String} [rel=stylesheet] link's rel
 */
export function insertLink(url, type = 'text/css', rel = 'stylesheet') {
  // this link doesn't yet exist
  if (!document.querySelector(`link[href="${url}"], link[type="${type}"], link[rel="${rel}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('href', url);
    link.setAttribute('type', type);
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
}

/**
 * creates the meta element which required by bootstrap, if it doesn't already exist
 * @param {string} name name property of the meta element
 * @param {string} content content property of the meta element
 */
export function insertMeta(name, content) {
  // this meta tag doesn't yet exist
  if (!document.querySelector(`meta[content="${content}"]`)) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

/**
 * parses object thru eval(). If property on object is 'fetch' and it's first character is '[', eval it.
 * @param {Object} object to parse
 * @param {Array} properties to eval
 * @returns {Object} object parsed for every of the properties in the array
 */
export function parseObject(obj, props) {
  //if properties are strings, eval them
  for (var i in obj) {
    if (
      i && // exists
      typeof obj[i] === 'string' && // is string
      obj.hasOwnProperty(i) && // not part of prototype chain
      props.indexOf(i) >= 0 // is one of the props we want to convert
    ) {
      if (i === 'fetch') {// special case for fetch
        if (obj[i].trim()[0] === '[') { // is an array
          obj[i] = eval('(' + obj[i] + ')');
        }
      } else {// not fetch
        obj[i] = eval('(' + obj[i] + ')');
      }
    }
  }
  return obj;
}

/**
 * replaces html in template and returns it. Global. Case insensitive.
 * @param {string} template html string
 * @param {string} html to replace `${bootmark}` with
 * @returns {string} hmtl replaced in the template
 */
export function replaceHtml(template, html) {
  // case insensitive because DOM is case insensitive
  // global so it can happen multiple times
  return template.replace(/\$\{bootmark\}/ig, html);
}

/**
 * gets markdown
 * @param {HTMLElement} element
 * @returns {Promise<string>} Promise that resolves with the markdown text or rejects with any errors
 */
export function getMarkdown(element) {
  return new Promise((resolve, reject) => {
    if (element.markdown) {
      // markdown passed directly
      resolve(element.markdown);
    } else if (element.src) {
      // src: space separated urls
      const urls = element.src.split(' ').filter(s => s.length);

      const srcFetches = urls.map(url => {
        // make array of urls into array of fetch promises for every url
        return fetch(url).then(res => res.text());
      });

      Promise.all(srcFetches).then((files) => {
        // join the array of markdown files with the config.join as separator
        // line breaks prevent markdown confusion
        return files.join(`\n\n${element.join}\n\n\n`);
      }).then(resolve).catch(reject);

    } else {
      // use markdown text inside element
      resolve(
        unescape(
          element.innerHTML
        )
      );
    }
  });
}

/**
 * modifies the dom
 * @param {HTMLElement} element
 * @param {object} config bootmark config
 */
export function doDom(element, config) {
  // adds '.page-scroll' to all anchors with href beginning with '#'
  if (element.querySelectorAll('a[href^="#"]').length) {
    const links = element.querySelectorAll('a[href^="#"]');
    links.forEach(el => el.classList.add('page-scroll'));
  }

  //auto close menu
  // attach event to document instead of '#nav' which might not even exist yet
  if (document.getElementById(`#${config.html.tocId}`)) {
    element.addEventListener('click', e => {
      if (e.target && e.target.matches(`#${config.html.tocId} a`)) {
        e.target.click();
      }
    }, false);
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
  if (element.querySelectorAll('table').length) {
    element.querySelectorAll('table').forEach(el => {
      el.classList.add('table', 'table-striped', 'table-bordered');
      el.innerHTML = `<div class="table-responsive">${el.innerHTML}</div>`;
    });
  }

  //indent Paragraphs
  if (config.html.indent && element.querySelectorAll('p').length) {
    element.querySelectorAll('p').forEach(el => el.classList.add('bootmark-indent'));
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