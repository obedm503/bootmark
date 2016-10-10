/**!
* @file bootmark: easy markdown + bootstrap
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/bootmark.git)
* @examples [examples/starters/templates](https://obedm503.github.io/bootmark/docs/examples.html)
* @version 0.5.0
* @license MIT
*/
/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see [jQuery Plugins](http://learn.jquery.com/plugins/)
 */
(function(window, document){
  'use scrict';
  function defineBootmark(){
		var defaults =  {
			markdown: false,
			fetch: false,
			css: 'dist/bootmark.min.css',
			promise: false,
			html: {
				indent: false,
				toc: true,
				theme: 'readable',
				prettifyTheme:'atelier-forest-light',
				prettify: true,
				credit: true
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
		* @function external:"jQuery.fn".bootmark
		* @description converts markdown to beautiful bootstrap-styled-markdown-converted-to-html. This documentation is automatically generated from source code by [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown)
		* @param {Object} [config] configuration object
		* @param {String} [config.markdown=false] markdown could be passed direcly from some variable. It HAS to be as text not html. If this is `true`, it has priority over fetch and markdown inside the element.
		* @param {String} [config.fetch=false] url to fetch. markdown could be in some markdown file somewhere. bootmark fetches the file, processes, and inserts it into the element.
		* @param {String} [config.css=https://obedm503.github.io/bootmark/dist/bootmark.min.css] bootmark's css. defaults to 'https://obedm503.github.io/bootmark/dist/bootmark.min.css'.
		* @param {String} [config.promise=false] whether to return a  promise that resolves with parsed html. if false, bootmark will return the jQuery object to allow chaining.
		* @param {Object|String} [config.html] html config object. this only pertains to html produced. if it's a string it will be parsed to an object.
		* @param {Boolean} [config.html.toc=true] whether to show the table of contents/menu. defaults to true
		* @param {Boolean} [config.html.indent=false] whether to indent paragraphs by adding the `bootmark-indent` css class
		* @param {String} [config.html.theme=readable] any one of the [bootswatch themes](http://bootswatch.com). defaults to the [readable theme](http://bootswatch.com/readable/)
		* @param {Boolean} [config.html.prettify=true] whether to prettify code blocks
		* @param {String} [config.html.prettifyTheme=atelier-forest-light] theme to prettify the code with. Any of the themes [here](https://jmblog.github.io/color-themes-for-google-code-prettify/) will work.
		* @param {String} [config.html.credit=true] whether to include a footer which links to bootmark's page
		* @param {Object|String} [config.showdown] config passed to the showdown converter.
		* These are the options bootmark uses by default. They can be overriden.
		* {
		* parseImgDimensions: true,
		* simplifiedAutoLink: true,
		* literalMidWordUnderscores: true,
		* strikethrough: true,
		* tables: true,
		* tablesHeaderId: true,
		* tasklists: true
	 	* }
		* @returns {jQuery} jQuery the jQuery object to allow chaining or
		* @returns {Promise} Promise which resolves with the markdown parsed as html
		* @see Examples: http://obedm503.github.io/bootmark/ or http://obedm503.github.io/bootmark/docs/examples.html
		*/
		window.$.fn.bootmark = function(options){
			var element = this;

			//if objects are strings, eval them
			if(typeof options.html === 'string' || typeof options.showdown === 'string'){
				for(var i in options){
					if( ( i === "html" || i === "showdown" ) && typeof options[i] === 'string' && options.hasOwnProperty(i) ){
						options[i] = eval( "(" + options[i] + ")" );
					}
				}
			}

			var config = window.$.extend( true, {}, defaults, window.$.fn.bootmark.options || {}, options );

			if(config.html.prettify && config.showdown.extensions.indexOf('prettify') < 0 ){
				config.showdown.extensions.push('prettify');
			}

			element.hide();//hide the element

			// meta
			_insertMetaTag('viewport', 'width=device-width, initial-scale=1');
			//bootswatch theme
			_insertLinkTag('https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' + config.html.theme.toLowerCase() + '/bootstrap.min.css');
			//bootmark css
			_insertLinkTag(config.css);

			//prettify
			if( config.showdown.extensions.indexOf('prettify') >= 0 ){
				_insertLinkTag('https://jmblog.github.io/color-themes-for-google-code-prettify/themes/'+ config.html.prettifyTheme + '.min.css', 'bootmark-prettify-theme');
			}

			var inserted;
			if(config.markdown){
				inserted = _insertHtml( element, config, config.text );
			} else if(config.fetch){
				inserted = window.fetch(config.fetch).then(function(res){
					return res.text();
				}).then(function(txt){
					return _insertHtml( element, config, txt );
				});
			} else {
				inserted = _insertHtml(element, config, element.text() );
			}

			if(config.promise){
				//returns promise
				return inserted.then(function(html){
					element.show();
					return html;
				}, function(){
						element.show();
				});
			} else {
				inserted.then(function(){
					element.show();
				}, function(){
					element.show();
				});
				//returns $ element
				return element;
			}
		};

		/**
		* @function _insertLinkTag
		* @private
		* @description creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css
		* @param {String} url url to set as source
		*/
		function _insertLinkTag(url){
			if( !window.$('link[href="' + url + '"]').length ){
	      var link = window.$(document.createElement('link'));
	      link.attr({
					href: url,
					rel: 'stylesheet'
				});
	      window.$('head').append(link);
			}
    }

		/**
		* @function _insertMetaTag
		* @private
		* @description creates the meta element which required by bootstrap, if it doesn't already exist
		* @param {String} name name property of the meta element
		* @param {String} content content property of the meta element
		*/
		function _insertMetaTag(name, content){
			if( !window.$('meta[content="' + content + '"]').length ){
				var meta = window.$( document.createElement('meta') );
				meta.attr({
					name: name,
					content: content
				});
	      window.$('head').append(meta);
			}
    }

		/**
		* @function _insertHtml
		* @private
		* @description handles dom manipulation
		* @param {Object} element this jQuery element
		* @param {Object} config bootmark config object
		* @param {String} markdown markdown to be parsed by showdown
		* @returns {String} html resolves with parsed and processed markdown
		*/
		function _insertHtml(element, config, markdown){
			return new Promise(function(resolve){
				var html =  new window.showdown.Converter(config.showdown).makeHtml(markdown);

				if(config.html.toc){
					config.template =
						'<div class="container-fluid">'+
							'<div class="row">'+
								'<div class="col-sm-3 col-md-3 col-lg-2">'+
									'<nav class="navbar navbar-default navbar-fixed-side">'+
										'<div class="container">'+
											'<div class="navbar-header">'+
												'<button class="navbar-toggle" data-target="#nav" data-toggle="collapse">'+
													'<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span>'+
													'<span class="icon-bar"></span><span class="icon-bar"></span>'+
												'</button>'+
												'<a class="navbar-brand active page-scroll" href="#'+ element.attr('id') +'">'+
													window.$(document).attr('title')+
												'</a>'+
											'</div>'+
											'<div class="collapse navbar-collapse" id="nav">'+
												'<ul class="bootmark-toc nav navbar-nav"></ul>'+//bootmark-toc
											'</div>'+
										'</div>'+
									'</nav>'+
								'</div>'+
								'<div class="bootmark-main bootmark-toc col-sm-9 col-md-9 col-lg-10">'+
									html +
								'</div>'+//bootmark-main
							'</div>'+
						'</div>';
				} else {
					config.template =
						'<div class="container">'+
							'<div class="row">'+
								'<div class="bootmark-main">'+
									html +
								'</div>'+//bootmark-main
							'</div>'+
						'</div>';
				}

				element.html(config.template);

				//add page-scroll to anchors
				/*
				if( window.$('a', element).length ){
					var links = window.$('a');
					links.each(function(){
						if( window.$( window.$(this).attr('href') ).length ){
							window.$(this).addClass('page-scroll');
						}
					});
				}
				*/

				//add toc
				if(config.html.toc){
					window.$("h1, h2, h3, h4, h5, h6", element).each(function(i,el){
						window.$('.bootmark-toc.nav.navbar-nav', element).append(
							window.$(document.createElement('li'))
								.addClass('bootmark-' + el.localName)
								.html(' <a class="page-scroll" href="#' + el.id + '">' + el.innerText + '</a>' )
						);
					});
				}

				//style tables
				if( window.$('table', element).length ){
					window.$('table', element)
						.addClass(' table table-striped table-bordered ')
						.wrap(' <div class="table-responsive"></div> ');
				}

				//indent Paragraphs
				if( config.html.indent && window.$('p', element).length ){
					window.$('p', element).addClass('bootmark-indent');
				}

				//add footer
				if( config.html.credit && !window.$('#bootmark-footer').length ){
					var footerHtml =
						'<div class="container-fluid bg-primary">'+
							'<p class="text-center">'+
								'<a style="color: inherit" href="https://obedm503.github.io/bootmark">This project uses bootmark. Bootmark allows developers to focus on their projects and not how they are presented.</a>'+
							'<p>'+
						'</div>';
					var footer = window.$('<footer id="bootmark-footer"></footer>').html(footerHtml);
					window.$('body').append(footer);
				}

				//prettify code
				if( config.showdown.extensions.indexOf('prettify') >= 0 ){
					window.prettyPrint();
				}

				resolve(html);
			});
		}

		window.$(function(){
			// smooth scrolling
			window.$(document).on('click', 'a.page-scroll', function(e){
				e.preventDefault();
				//console.log(window.$.attr(this, 'href'));
				window.$('html, body').animate({
					scrollTop: window.$( window.$.attr(this, 'href') ).offset().top
				}, 900);
			});

			//auto close menu?
			window.$('#nav a').click(function(){
				window.$("#nav").collapse('hide');
			});

			//initial code-less usage
			// bootmark element
			if( window.$('bootmark').length ){
				window.$('bootmark').each(function(){
					var el = window.$(this);
					el.bootmark({
						fetch: el.attr('fetch'),
						html: el.attr('html'),
						css: el.attr('css'),
						showdown: el.attr('showdown'),
						promise: el.attr('promise')
					});
				});
      }
			// bootmark class
			if( window.$('.bootmark').length ){
				window.$('.bootmark').each(function(){
					var el = window.$(this);
					el.bootmark({
						fetch: el.attr('data-fetch'),
						html: el.attr('data-html'),
						css: el.attr('data-css'),
						showdown: el.attr('data-showdown'),
						promise: el.attr('data-promise')
					});
				});
			}
		});
  }

	if(typeof window.$ === 'undefined'){ throw new Error('JQuery is not defined'); }
	if(typeof window.showdown === 'undefined'){ throw new Error('Showdown is not defined'); }
	if(typeof window.$.fn.modal === 'undefined'){ throw new Error('Bootstrap is not defined'); }
	if(typeof window.prettyPrint === 'undefined'){ console.warn('Code Prettify is not defined'); }
	if(typeof window.Promise === 'undefined'){ console.warn('Promise API is not defined'); }
	if(typeof window.fetch === 'undefined'){ console.warn('fetch API is not defined'); }
  if(typeof window.$.fn.bootmark === 'undefined'){ defineBootmark(); }
})(window, document);
