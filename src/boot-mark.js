($ => {
  /**
   * @class Bootmark
   * @extends {HTMLElement}
   */
  class Bootmark extends HyperHTMLElement {
    static get observedAttributes() { return ['src']; }
    attributeChangedCallback(attr, oldValue, newValue, namespace){
      if( typeof this[`${attr}Changed`] == 'function' ){ return; }
      this[`${attr}Changed`](oldValue, newValue, namespace);
    }
    set src(src){
      this.setAttribute('src', src);
    }
    get src(){
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
     * @method _unescape
     * @private
     * @description unescapes some html entities
     * @param {string} text text to unescape
     * @returns escaped text
     * @memberof Bootmark
     */
    _unescape(text){
      return text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot/g, '"')
        .replace(/&#39/g, '\'')
        .replace(/&amp;/g, '&');
    }
    /**
     * @method _insertLink
     * @private
     * @memberof Bootmark
     * @description creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css, and favicon
     * @param {String} url url to set as source
     * @param {String} [type=text/css] link's type
     * @param {String} [rel=stylesheet] link's rel
     */
    _insertLink(url, type, rel){
      // this link doesn't yet exist
      if( !$('link[href="' + url + '"], link[type="'+ type +'"], link[rel="'+ rel +'"]').length ){
        var link = $('<link />');
        link.attr({
          href: url,
          type: type || 'text/css',
          rel: rel || 'stylesheet'
        });
        $('head').append(link);
      }
    }
    /**
     * @method _insertMeta
     * @private
     * @memberof Bootmark
     * @description creates the meta element which required by bootstrap, if it doesn't already exist
     * @param {string} name name property of the meta element
     * @param {string} content content property of the meta element
     */
    _insertMeta(name, content){
      // this meta tag doesn't yet exist
      if( !$('meta[content="' + content + '"]').length ){
        var meta = $( '<meta />' );
        meta.attr({
          name: name,
          content: content
        });
        $('head').append(meta);
      }
    }
    /**
     * @method _parseObject
     * @private
     * @memberof Bootmark
     * @description parses object thru eval(). If property on object is 'fetch' and it's first character is '[', eval it.
     * @param {Object} object to parse
     * @param {Array} properties to eval
     * @returns {Object} object parsed for every of the properties in the array
     */
    _parseObject(obj, props){
      //if properties are strings, eval them
      for(var i in obj){
        if(
          i && // exists
          typeof obj[i] === 'string' && // is string
          obj.hasOwnProperty(i) && // not part of prototype chain
          props.indexOf(i) >= 0 // is one of the props we want to convert
        ){
          if( i === 'fetch' ){// special case for fetch
            if( obj[i].trim()[0] === '[' ){ // is an array
              obj[i] = eval( '(' + obj[i] + ')' );
            }
          } else {// not fetch
            obj[i] = eval( '(' + obj[i] + ')' );
          }
        }
      }
      return obj;
    }
    /**
     * @method _replaceHtml
     * @private
     * @memberof Bootmark
     * @description replaces html in template and returns it. Global. Case insensitive.
     * @param {string} template html string
     * @param {string} html to replace `${bootmark}` with
     * @returns {string} hmtl replaced in the template
     */
    _replaceHtml(template, html){
      // case insensitive because DOM is case insensitive
      // global so it can happen multiple times
      return template.replace(/\$\{bootmark\}/ig, html);
    }
    /**
     * @method _getMarkdown
     * @private
     * @memberof Bootmark
     * @description gets markdown
     * @param {object} config bootmark config
     * @returns {Promise<string>} Promise that resolves with the markdown text or rejects with any errors
     */
    _getMarkdown(config){
      return new Promise(function getMarkdownPromise(resolve, reject){
        if(config.markdown){
          // markdown passed directly
          resolve(config.markdown);
        } else if(config.src){
          // src: space separated urls
          var urls = config.src.split(' ').filter(s => s.length);

          var srcFetches = urls.map(function(url){
            // make array of urls into array of fetch promises for every url
            return fetch(url).then(function(res){
              // convert response to text
              return res.text();
            });
          });

          Promise.all(srcFetches).then(function(files){
            // join the array of markdown files with the config.join as separator
            // line breaks prevent markdown confusion
            return files.join('\n\n' + config.join + '\n\n\n');
          }).then(resolve).catch(reject);

        } else if(config.fetch){
          console.warn('Bootmark: as of v0.8.0 "fetch" was depracated and will be removed. Use "src" instead.');
          // fetch file/s
          if(typeof config.fetch === 'string'){
            // single url
            fetch(config.fetch).then(function(res){
              return res.text();
            }).then(resolve).catch(reject);
          } else {
            // array of urls

            var fetchFetches = config.fetch.map(function(url){
              // make array of urls into array of fetch promises for every url
              return fetch(url).then(function(res){
                // convert response to text
                return res.text();
              });
            });

            Promise.all(fetchFetches).then(function(files){
              // join the array of markdown files with the config.join as separator
              // line breaks prevent markdown confusion
              return files.join('\n\n' + config.join + '\n\n\n');
            }).then(resolve).catch(reject);
          }
        } else {
          // use markdown text inside element
          resolve(
            this._unescape(
              this.innerHTML
            )
          );
        }
      });
    }
    /**
     * @method _getTemplate
     * @private
     * @memberof Bootmark
     * @description gets the template form config.template.text, config.template.fetch, config.template.id, or use toc template or toc-less template
     * @param {object} config bootmark config
     * @returns {Promise<string>} Promise that resolves with the html template text or rejects with any errors
     */
    _getTemplate(config){
      return new Promise(function(resolve, reject) {
        // user passed template direcly
        if( config.template.text ){

          resolve( config.template.text );

        // user wants to fetch template
        } else if( config.template.fetch ){
          fetch( config.template.fetch ).then(function(res){
            return res.text();
          }).then(function(html){
            // parse html
            var $html = $('<div></div>').html(html);
            // get template tag in html
            // return html inside template tag
            return $('template', $html).html();
          }).then(resolve).catch(reject);

        // get template from element with id="bootmark-template". id can be changed
        } else if( $('#'+ config.template.id).length ){

          resolve( $('#'+ config.template.id).html() );

        // use toc template
        } else if( config.html.toc ){
          var tocTitle = config.html.tocTitle.replace(/ /gi,'-');

          resolve(
            '<div class="container-fluid" id="' + tocTitle + '">'+
              '<div class="row">'+
                '<div class="col-sm-3 col-md-3 col-lg-2">'+
                  '<nav class="navbar navbar-default navbar-fixed-side">'+
                    '<div class="container-fluid">'+
                      '<div class="navbar-header">'+
                        '<button class="navbar-toggle" data-target="#'+ config.html.tocId +'" data-toggle="collapse">'+
                          '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span>'+
                          '<span class="icon-bar"></span><span class="icon-bar"></span>'+
                        '</button>'+
                        '<a class="navbar-brand active page-scroll" href="#'+ tocTitle +'">'+
                          config.html.tocTitle +
                        '</a>'+
                      '</div>'+
                      '<div class="collapse navbar-collapse" id="'+ config.html.tocId +'">'+
                        '<ul class="bootmark-toc nav navbar-nav"></ul>'+// where the bootmark-toc is inserted
                      '</div>'+
                    '</div>'+
                  '</nav>'+
                '</div>'+
                '<div class="bootmark-main has-toc col-sm-9 col-md-9 col-lg-10">'+
                  '${bootmark}'+ // where the html is inserted
                '</div>'+
              '</div>'+
            '</div>'
          );

        // use tocless template
        } else {

          resolve(
            '<div class="container">'+
              '<div class="row">'+
                '<div class="bootmark-main">'+
                  '${bootmark}'+ // where the html is inserted
                '</div>'+
              '</div>'+
            '</div>'
          );

        }
      });
    }
    /**
     * @method _doDom
     * @private
     * @memberof Bootmark
     * @description modifies the dom
     * @param {object} config bootmark config
     */
    _doDom(config){
      const element = this.shadowDom;
      // adds '.page-scroll' to all anchors with href beginning with '#'
      if( $('a[href^="#"]', element).length ){
        var $links = $('a[href^="#"]', element);
        $links.each(function(){
          $(this).addClass('page-scroll');
        });
      }

      //auto close menu
      // attach event to document instead of '#nav' which might not even exist yet
      if( $('#'+ config.html.tocId, element).length ){
        var $nav = $('#'+ config.html.tocId, element);
        $nav.on('click','a', function(){
          $nav.collapse('hide');
        });
      }

      //add toc
      if(config.html.toc){
        var $ul = $('ul.bootmark-toc', element);
        // object literal is faster than loop to get the headers
        var headers = {
          1:'h1',
          2:'h1, h2',
          3:'h1, h2, h3',
          4:'h1, h2, h3, h4',
          5:'h1, h2, h3, h4, h5',
          6:'h1, h2, h3, h4, h5, h6'
        };
        var lim = config.html.tocLimit;
        // limit lim to munbers between 1 and 6
        lim = ( lim > 6 ) ? 6 : ( ( lim < 1 ) ? 1: lim );

        var $headers = $(headers[lim], element);
        $headers.each(function(i,el){
          var $li = $('<li></li>')
            .addClass( 'bootmark-' + el.localName )
            .html(' <a class="page-scroll" href="#' + el.id + '">' + el.innerText + '</a>' );
          $ul.append($li);
        });
      }

      //style tables
      if( $('table', element).length ){
        $('table', element)
          .addClass(' table table-striped table-bordered ')
          .wrap(' <div class="table-responsive"></div> ');
      }

      //indent Paragraphs
      if( config.html.indent && $('p', element).length ){
        $('p', element).addClass('bootmark-indent');
      }

      //add footer
      if( config.html.credit && !$('#bootmark-footer').length ){
        var footerHtml  =
          '<div class="container-fluid bg-primary">'+
            '<p class="text-center">'+
              '<a style="color: inherit" href="https://obedm503.github.io/bootmark">This project uses bootmark. Bootmark allows developers to focus on their projects and not how they are presented.</a>'+
            '<p>'+
          '</div>';
        var footer = $('<footer id="bootmark-footer"></footer>').html(footerHtml);
        $('body').append(footer);
      }

      //prettify code
      if( config.showdown.extensions.indexOf('prettify') >= 0 ){
        prettyPrint();
      }

    }
  }

  Bootmark.define('boot-mark');

})(jQuery);
