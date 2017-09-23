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
  if (!$(`link[href="${url}"], link[type="${type}"], link[rel="${rel}"]`).length) {
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
  if (!$(`meta[content="${content}"]`).length) {
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
 * @param {object} config bootmark config
 * @returns {Promise<string>} Promise that resolves with the markdown text or rejects with any errors
 */
export function getMarkdown(config, props) {
  return new Promise((resolve, reject) => {
    if (config.markdown) {
      // markdown passed directly
      resolve(config.markdown);
    } else if (config.src) {
      // src: space separated urls
      const urls = config.src.split(' ').filter(s => s.length);

      const srcFetches = urls.map(url => {
        // make array of urls into array of fetch promises for every url
        return fetch(url)
          // convert response to text
          .then(res => res.text());
      });

      Promise.all(srcFetches).then((files) => {
        // join the array of markdown files with the config.join as separator
        // line breaks prevent markdown confusion
        return files.join(`\n\n${config.join}\n\n\n`);
      }).then(resolve).catch(reject);

    } else if (config.fetch) {
      console.warn('Bootmark: as of v0.8.0 "fetch" was depracated and will be removed. Use "src" instead.');
      // fetch file/s
      if (typeof config.fetch === 'string') {
        // single url
        fetch(config.fetch)
          .then(res => res.text())
          .then(resolve).catch(reject);
      } else {
        // array of urls

        const fetchFetches = config.fetch.map(url => {
          // make array of urls into array of fetch promises for every url
          return fetch(url)
            // convert response to text
            .then(res => res.text());
        });

        Promise.all(fetchFetches).then(files => {
          // join the array of markdown files with the config.join as separator
          // line breaks prevent markdown confusion
          return files.join(`\n\n${config.join}\n\n\n`);
        }).then(resolve).catch(reject);
      }
    } else {
      // use markdown text inside element
      resolve(
        unescape(
          props.innerHTML
        )
      );
    }
  });
}
/**
 * gets the template form config.template.text, config.template.fetch, config.template.id, or use toc template or toc-less template
 * @param {object} config bootmark config
 * @returns {Promise<string>} Promise that resolves with the html template text or rejects with any errors
 */
export function getTemplate(config) {
  return new Promise((resolve, reject) => {
    // user passed template direcly
    if (config.template.text) {

      resolve(config.template.text);

      // user wants to fetch template
    } else if (config.template.fetch) {
      fetch(config.template.fetch)
        .then(res => res.text())
        .then(html => {
          // parse html
          const tocTitle = config.html.tocTitle.replace(/ /gi, '-');

          resolve(`
            <div class="container-fluid" id="${tocTitle}">
              <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-2">
                  <nav class="navbar navbar-default navbar-fixed-side">
                    <div class="container-fluid">
                      <div class="navbar-header">
                        <button class="navbar-toggle" data-target="#${config.html.tocId}" data-toggle="collapse">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand active page-scroll" href="#${tocTitle}">
                          ${config.html.tocTitle}
                        </a>
                      </div>
                      <div class="collapse navbar-collapse" id="${config.html.tocId}">
                        <ul class="bootmark-toc nav navbar-nav"></ul>
                      </div>
                    </div>
                  </nav>
                </div>
                <div class="bootmark-main has-toc col-sm-9 col-md-9 col-lg-10">
                  \$\{bootmark\}
                </div>
              </div>
            </div>
          `);
        });

    // use tocless template
    } else {

      resolve(`
        <div class="container">
          <div class="row">
            <div class="bootmark-main">
              \$\{bootmark\}
            </div>
          </div>
        </div>
      `);

    }
  });
}