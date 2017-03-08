/**!
* @file bootmark: markdown + bootstrap as a jQuery plugin
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/bootmark.git)
* @examples [examples/starters/templates](https://obedm503.github.io/bootmark/docs/examples.html)
* @version 0.8.0
* @license MIT
*/
(function($, document){
  'use scrict';
  function defineBootmark(){
    var version = '0.7.1';
    var defaults =  {
      markdown: false, //when markdown is passed as text directly
      fetch: false, // when url/s passed
      src: '',
      join: "----", // markdown separator
      promise: false, // whether to return a promise or jquery object
      template: {
        text: false, //when the template is passed as text directly,
        fetch: false, //url to template
        id:'bootmark-template' //default template-tag id
      },
      html: {
        favicon:'https://obedm503.github.io/bootmark/bootmark-favicon.png',//bootmark's logo
        indent: false, // whether to indent paragraphs
        toc: true, // whether to use the toc template
        tocTitle: $(document).attr('title'), // document title as toc's title
        tocId:'nav',
        tocLimit: 6, // limit headers to use in toc
        theme: 'readable', // bootswatch theme
        prettifyTheme:'atelier-forest-light', // code prettify theme
        prettify: true, // whether to prettify
        credit: true // whether to show footer with link to bootmark page
      },
      showdown: {
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true,
        extensions: []
      }
    };

    /**
    * The jQuery plugin namespace.
    * @external "jQuery.fn"
    * @see [jQuery Plugins](http://learn.jquery.com/plugins/)
    */

    /**
    * @function external:"jQuery.fn".bootmark
    * @description converts markdown to beautiful bootstrap-styled-html. This documentation is automatically generated from source code by [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown)
    * @param {Object} [config] configuration object
    * @param {String} [config.markdown=false] markdown could be passed direcly from some variable. It HAS to be as text not html. If this is `true`, it has priority over fetch and markdown inside the element.
    * @param {String|String[]} [config.src=''] url/s to fetch. markdown could be in some markdown file/s somewhere. bootmark fetches the file/s, processes, and inserts it/them into the element. If it's multiple space-separated urls, bootmark will fetch, concatenate, and process them.
    * @param {String|String[]} [config.fetch=false] DEPRECATED: url/s to fetch. markdown could be in some markdown file/s somewhere. bootmark fetches the file/s, processes, and inserts it/them into the element. If it's an array of urls, bootmark will fetch, concatenate, and process all of them.
    * @param {String} [config.join=----] string to be passed to the Array.prototype.join() when concatenating multiple markdown files if config.fetch is an array.
    * @param {String} [config.promise=false] DEPRECATED: whether to return a  promise that resolves with parsed html. if false, bootmark will return the jQuery object to allow chaining.  IF YOU STILL WANT TO RETURN A PROMISE USE `$('#id').bootmark({...}).promise().then(...)` instead.
    * @param {Object|String} [config.html] html config object. this only pertains to html produced. if it's a string it will be parsed to an object.
    * @param {Boolean} [config.html.favicon=https://obedm503.github.io/bootmark/bootmark-favicon.png] url to favicon to add. if you don't want a favicon, set this to false of an empty string.
    * @param {Boolean} [config.html.toc=true] whether to show the table of contents/menu. defaults to true
    * @param {Number} [config.html.tocLimit=6] which heading levels should be used to build the toc. by deafult all headings are used. `tocLimit=1` uses only `<h1>`'s,`tocLimit=2` uses `<h1>`'s and `<h2>`'s, and so on
    * @param {String} [config.html.tocTitle=page title] title for the toc. defaults to the page's title
    * @param {Boolean} [config.html.tocId=nav] id of navigation menu. used to attach the autoclose event when it's expanded on phones
    * @param {Boolean} [config.html.indent=false] whether to indent paragraphs by adding the `bootmark-indent` css class
    * @param {String} [config.html.theme=readable] any one of the [bootswatch themes](http://bootswatch.com). defaults to the [readable theme](http://bootswatch.com/readable/)
    * @param {Boolean} [config.html.prettify=true] whether to prettify code blocks
    * @param {String} [config.html.prettifyTheme=atelier-forest-light] theme to prettify the code with. Any of the themes [here](https://jmblog.github.io/color-themes-for-google-code-prettify/) will work.
    * @param {String} [config.html.credit=true] whether to include a footer which links to bootmark's page
    * @param {String} [config.html.tocTitle=page title] title for the toc. defaults to the page's title
    * @param {Object|String} [config.showdown] config passed to the showdown converter.
    * These are the options bootmark uses by default. They can be overriden.
    * ``
    * {
    * parseImgDimensions: true,
    * simplifiedAutoLink: true,
    * literalMidWordUnderscores: true,
    * strikethrough: true,
    * tables: true,
    * tablesHeaderId: true,
    * tasklists: true
    	* }
    * ``
    * @param {Object|String} [config.template] template config
    * @param {String} [config.template.text=false] use this to pass in the template as a html string
    * @param {String} [config.template.fetch=false] url to external html file. The template **HAS** to be wrapped in `<template>` tags (inspired by aurelia templates).
    * @param {String} [config.template.id=bootmark-template] id to `<template>` element containing the template to use. if no template is found, then the toc or tocless templates will be used.
    * @returns {jQuery} jQuery the jQuery object to allow chaining or
    * @returns {Promise} Promise which resolves with the markdown parsed by showdown as html
    * @see Examples: http://obedm503.github.io/bootmark/ or http://obedm503.github.io/bootmark/docs/examples.html
    */
		$.fn.bootmark = function(options){
			var element = this;
			element.hide();//hide the element

			// parse object properties which might be strings
			options = _private.parseObject(options, ['fetch', 'html', 'showdown','template']);

			// combine the passed options with the $.fn.bootmark.options with the defaults, recursivelly
			var config = $.extend( true, {}, defaults, $.fn.bootmark.options || {}, options );

			if(
				config.html.prettify && // user wants to prettify
				config.showdown.extensions.indexOf('prettify') < 0 && // user hasn't already added the prettify extension to the array
				typeof prettyPrint !== 'undefined' // google-code-prettify isn't undefined
			){
				config.showdown.extensions.push('prettify'); //push prettify to the extensions
			}

			// insert meta tag required by bootstrap
			_private.insertMeta(
				'viewport',
				'width=device-width, initial-scale=1'
			);
			// bootswatch theme
			_private.insertLink(
				'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' +
				config.html.theme.toLowerCase().trim() +
				'/bootstrap.min.css'
			);
			// favicon
			if(config.html.favicon){
				_private.insertLink(
					config.html.favicon,
					'image/x-icon',
					'shortcut icon'
				);
			}
			// bootmark's css
			_private.insertLink('https://unpkg.com/bootmark@'+ version +'/dist/bootmark.min.css');

			// prettify's css theme file
			if( config.showdown.extensions.indexOf('prettify') >= 0 ){// extension is in the array
				_private.insertLink(
					'https://jmblog.github.io/color-themes-for-google-code-prettify/themes/'+ config.html.prettifyTheme.toLowerCase().trim().replace(/ /g, '-') + '.min.css'
				);
			}

			// array of promises
			var promises = [
				_private.getTemplate(config), // gets template according to config
				_private.getMarkdown(element, config) // get markdown according to config
			];
			var done = Promise.all(promises).then(function(responses){
				// convert markdown to html
				var html = new showdown.Converter(config.showdown).makeHtml(responses[1]);

				// element's innerHTML is html
				element.html(
					// replace `${bootmark}` with html
					_private.replaceHtml(responses[0], html)
				);

				// make changes to the DOM
				_private.doDom(element, config)

				return html;
			}).catch(console.error);

			// user wants a promise
			if(config.promise){
        console.warn('Bootmark: as of v0.8.0 "promise" has been depracated and will be removed. Use "$(\'#id\').bootmark({...}).promise().then(...)"  instead.');
        //show element and return promise
        return done.then(function(html){
          element.show();
          return html;
        });
      }
      // show element
      done.then(function(){
        element.show();
      });
      //returns jQuery element
      return element;
		};

    $.fn.bootmark.version = version;

		/**
		* @name _private
		* @private
		* @description private helper methods
		*/
		var _private = {

			/**
			* @function insertLink
			* @memberof _private
			* @description creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css, and favicon
			* @param {String} url url to set as source
			* @param {String} [type=text/css] link's type
			* @param {String} [rel=stylesheet] link's rel
			*/
			insertLink: function insertLink(url, type, rel){
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
			},

			/**
			* @function insertMeta
			* @memberof _private
			* @description creates the meta element which required by bootstrap, if it doesn't already exist
			* @param {String} name name property of the meta element
			* @param {String} content content property of the meta element
			*/
			insertMeta: function insertMeta(name, content){
				// this meta tag doesn't yet exist
				if( !$('meta[content="' + content + '"]').length ){
					var meta = $( '<meta />' );
					meta.attr({
						name: name,
						content: content
					});
					$('head').append(meta);
				}
			},

			/**
			* @function parseObject
			* @memberof _private
			* @description parses object thru eval(). If property on object is 'fetch' and it's first character is '[', eval it.
			* @param {Object} object to parse
			* @param {Array} properties to eval
			* @returns {Object} object parsed for every of the properties in the array
			*/
			parseObject: function parseObject(obj, props){
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
								obj[i] = eval( "(" + obj[i] + ")" );
							}
						} else {// not fetch
							obj[i] = eval( "(" + obj[i] + ")" );
						}
					}
				}
				return obj;
			},

			/**
			* @function replaceHtml
			* @memberof _private
			* @description replaces html in template and returns it. Global. Case insensitive.
			* @param {String} template html string
			* @param {String} html to replace `${bootmark}` with
			* @returns {String} hmtl replaced in the template
			*/
			replaceHtml: function replaceHtml(template, html){
				// case insensitive because DOM is case insensitive
				// global so it can happen multiple times
				return template.replace(/\$\{bootmark\}/ig, html);
			},

			/**
			* @function getMarkdown
			* @memberof _private
			* @description gets markdown
			* @param {Object} element jQuery element
			* @param {Object} config bootmark config
			* @returns {Promise} Promise that resolves with the markdown text or rejects with any errors
			*/
			getMarkdown: function getMarkdown(element, config){
				return new Promise(function getMarkdownPromise(resolve, reject){
					if(config.markdown){
						// markdown passed directly
						resolve(config.markdown);
					} else if(config.src){
            // src: space separated urls
            var urls = config.src.split(' ').filter(function(s){return s.length});

            var fetches = urls.map(function(url){
              // make array of urls into array of fetch promises for every url
              return fetch(url).then(function(res){
              	// convert response to text
              	return res.text();
              });
            });

            Promise.all(fetches).then(function(files){
              // join the array of markdown files with the config.join as separator
              // line breaks prevent markdown confusion
              return files.join("\n\n" + config.join + "\n\n\n");
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

							var fetches = config.fetch.map(function(url){
								// make array of urls into array of fetch promises for every url
								return fetch(url).then(function(res){
									// convert response to text
									return res.text();
								});
							});

							Promise.all(fetches).then(function(files){
								// join the array of markdown files with the config.join as separator
								// line breaks prevent markdown confusion
								return files.join("\n\n" + config.join + "\n\n\n");
							}).then(resolve).catch(reject);
						}
					} else {
						// use markdown text inside element
						resolve( element.text() );
					}
				});
			},

			/**
			* @function getTemplate
			* @memberof _private
			* @description gets the template form config.template.text, config.template.fetch, config.template.id, or use toc template or toc-less template
			* @param {Object} config bootmark config
			* @returns {Promise} Promise that resolves with the html template text or rejects with any errors
			*/
			getTemplate: function getTemplate(config){
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
			},

			/**
			* @function doDom
			* @memberof _private
			* @description modifies the dom
			* @param {Object} element jQuery element
			* @param {Object} config bootmark config
			*/
			doDom: function(element, config){
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
            1:"h1",
            2:"h1, h2",
            3:"h1, h2, h3",
            4:"h1, h2, h3, h4",
            5:"h1, h2, h3, h4, h5",
            6:"h1, h2, h3, h4, h5, h6"
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
		};

		// on document ready
		$(function documentReady(){
			// smooth scrolling
			$(document).on('click', 'a.page-scroll', function(e){
				e.preventDefault();
				var $this = $(this);
				var href = $this.attr('href').substring(1);//everything after the '#'
				var $scrollToEl;
				if( $('#'+ href ).length ){ //element with id exists
					$scrollToEl = $('#'+ href)[0];
				} else if( $('a[name="'+ href +'"]').length ){// anchor with name exists
					$scrollToEl = $('a[name="'+ href +'"]')[0];
				}

				if($scrollToEl){
					$('html, body').animate({
						scrollTop: $scrollToEl.offsetTop
					}, 900);
				}
			});

      //initial code-less usage
      // bootmark element
      if( $('bootmark').length ){
        $('bootmark').each(function(){
          var el = $(this);
          el.bootmark({
            fetch: el.attr('fetch'),
            src: el.attr('src'),
            join: el.attr('join'),
            template: el.attr('template'),
            html: el.attr('html'),
            css: el.attr('css'),
            showdown: el.attr('showdown'),
            promise: el.attr('promise')
          });
        });
      }
			// bootmark class
			if( $('.bootmark').length ){
				$('.bootmark').each(function(){
					var el = $(this);
					el.bootmark({
						fetch: el.attr('data-fetch'),
            src: el.attr('data-src'),
						join: el.attr('data-join'),
						template: el.attr('data-template'),
						html: el.attr('data-html'),
						css: el.attr('data-css'),
						showdown: el.attr('data-showdown'),
						promise: el.attr('data-promise')
					});
				});
			}
		});
	}

	if(typeof jQuery === 'undefined'){ throw new Error('JQuery is not defined'); }
	if(typeof showdown === 'undefined'){ throw new Error('Showdown is not defined'); }
	if(typeof jQuery.fn.modal === 'undefined'){ throw new Error('Bootstrap is not defined'); }
	if(typeof Promise === 'undefined'){ throw new Error('Promise API is not defined'); }
	if(typeof fetch === 'undefined'){ console.warn('fetch API is not defined'); }
	if(typeof prettyPrint === 'undefined'){ console.warn('Code Prettify is not defined'); }
	if(typeof jQuery.fn.bootmark === 'undefined'){ defineBootmark(); }
})(jQuery, document);
