/**!
* @name bootmark
* @description markdown n stuff, originally a fork of [strapdownjs](http://strapdownjs.com).
* @author [obedm503](https://github.com/obedm503/)
* @git [git repo](https://github.com/obedm503/bootmark.git)
* @examples [examples/starter/templates](https://obedm503.github.io/bootmark/examples/index.html)
* @version 0.3.1
* @license MIT
*/
(function(window, document){
  'use scrict';
  function defineBootmark(){
    var bootmark = {
      parse: parse,
      getParam: getParam
    };

		/**
		* @function _parse
		* @memberof bootmark
		* @internal
		* @description
		* creates a new showdown Converter which is used to parse the markdown
		* @param {String} markdown markdown to parse
		* @returns {String} html html which is further changed by [_insert](#bootmark._insert)
		*/
    function _parse(markdown){
      return new window.showdown.Converter({
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true
      }).makeHtml(markdown);
    }

		/**
		* @function _insert
		* @memberof bootmark
		* @internal
		* @description
		* handles dom manipulation, maybe custom templates could be add in the future
		* @param {String} html markdown parsed by [_parse](#bootmark._parse)
		* @param {String} id element id into which insert the html
		* @returns {String} html html which is later returned by the promise resolution
		*/
    function _insert(html, id, toc){
			var template;
      if(toc === true){
        template =
					'<div class="container-fluid">'+
						'<div class="row">'+
							'<div class="col-sm-3 col-md-3 col-lg-3">'+
								'<nav class="navbar navbar-default navbar-fixed-side">'+
									'<div class="container">'+
										'<div class="navbar-header">'+
											'<button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">'+
												'<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span>'+
												'<span class="icon-bar"></span><span class="icon-bar"></span>'+
											'</button>'+
											'<a class="navbar-brand active page-scroll" href="'+ id +'">'+
												window.$(document).attr('title')+
											'</a>'+
										'</div>'+
									'<div class="collapse navbar-collapse">'+
										'<ul id="bootmark-toc" class="nav navbar-nav"></ul>'+//bootmark-toc
									'</div>'+
								'</nav>'+
							'</div>'+
							'<div id="bootmark-main" class="col-sm-9 col-md-9 col-lg-9">'+
								html +
							'</div>'+//bootmark-main
						'</div>';
					'</div>';
      } else {
        template =
					'<div class="container">'+
						'<div class="row">'+
							'<div id="bootmark-main" class="col-sm-10 col-md-10 col-lg-8">'+
								html +
							'</div>'+//bootmark-main
						'</div>'+
					'</div>';
      }
			window.$(id)
				.html(template)
				.promise()
				.then(function(){
					if(window.$('#bootmark-toc').length){
						window.$("h1, h2, h3, h4, h5, h6").each(function(i,el){
							window.$('#bootmark-toc').append(
								window.$(document.createElement('li'))
									.addClass('bootmark-'+ el.localName)
									.html('<a class="page-scroll" href="#'+ el.id +'">'+ el.innerText +'</a>')
							);
						});
					}
					window.$(id).show();
				});
			return html;
    }

		/**
		* @function _insertLinkTag
		* @memberof bootmark
		* @internal
		* @description
		* creates a new link element which used to add the theme's css and bootmark's css
		* @param {String} url url to set as source
		*/
		function _insertLinkTag(url){
      var link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

		/**
		* @function _insertMetaTag
		* @memberof bootmark
		* @internal
		* @description
		* creates the meta element which required by bootstrap
		* @param {String} name name property of the meta element
		* @param {String} content content property of the meta element
		*/
		function _insertMetaTag(name, content){
      var meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }

		/**
		* @function _insertScriptTag
		* @memberof bootmark
		* @internal
		* @description
		* creates a new script which is used to get the polyfill from [polyfill.io](https://polyfill.io/v2/docs/)
		* polyfill is needed because bootmark uses fetch and Promise, which are sometimes not in the browser
		* polyfill.io only supplies things that are lacking in the current browser, that is why it's not included as part of bootmark.bundle.min.js file
		* @param {String} src source property of the script element
		*/
		function _insertScriptTag(src){
      var script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);
    }

    /**
    * @function getParam
    * @memberof bootmark
    * @description
		* gets param from url, made specifically for the demo
		* >This doesn't work on some servers. They interpret the ``?`` in url as a server request. It may cause problems.
    * @param {String} name name of param
    * @returns {String} html
    * @example
    * //example url "www.example.com?theme=cyborg"
    * bootmark.getParam('theme');// cyborg
    */
    function getParam(param){
      param = param.replace(/[\[\]]/g, "\\$&");
      var results = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)").exec(window.location.href);
      if(!results){ return null; }
      if(!results[2]){ return ''; }
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
    * @function parse
    * @memberof bootmark
    * @description main function which decides everything.
    * @param {Object} config configuration object
		* @param {String} [config.md=false] markdown could be passed direcly from some variable. It HAS to be as text not html.
		* @param {String} [config.fetch=false] url to fetch. markdown could be some markdown file somewhere
		* @param {String} [config.mdId=bootmark-md] id containing markdown. be careful that the markdown is not indented, if it is the parser will interpret everything as code. If not config.mdId is passed, bootmark will use config.id. If that is not passed, it will default to ``bootmark-md``.
		* @param {String} [config.id=bootmark-md] id into which bootmark should insert final html. because it defaults to the same id as mdId, it will substitute the markdown for the html.
		* @param {Boolean} [config.toc=true] whether to show the table of contents/menu. defaults to true
		* @param {String} [config.theme=readable] any one of the [bootswatch themes](http://bootswatch.com). defaults to the readable theme
		* @param {String} [config.css=dist/bootmark.min.css] bootmark's css. defaults to 'dist/bootmark.min.css'
    * @returns {Object} promise which resolves with the parsed markdown
    * @example see the index.html or docs/EXAMPLES.md file
    */
    function parse(config){
      return new Promise(function(resolve, reject){
        var md = config.md || false,//text
            fetch = config.fetch || false,// url
            mdId = config.mdId || config.id || 'bootmark-md',//md in some div
            id = config.id || 'bootmark-md',// dom id
            toc = (typeof config.toc === 'undefined') ? true : config.toc,
            theme = (typeof config.theme === 'undefined')? 'readable' : config.theme,
            css = config.css || 'dist/bootmark.min.css';

				window.$('#'+id).hide();//hide the element

        // meta
        _insertMetaTag('viewport', 'width=device-width, initial-scale=1');
        //polyfill
        _insertScriptTag('https://cdn.polyfill.io/v2/polyfill.min.js');
        //theme
        _insertLinkTag('https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' + theme.toLowerCase() + '/bootstrap.min.css');
        //bootmark
        _insertLinkTag(css);


        if(md && !fetch){
          resolve(_insert(_parse(md), '#'+id, toc));
        } else if(fetch && !md){
          window.fetch(fetch).then(function(res){
            return res.text();
          }).then(function(txt){
            resolve(_insert(_parse(txt), '#'+id, toc));
          });
        } else {
          resolve(_insert(_parse(window.$('#'+mdId).text()), '#'+id, toc));
        }
       });
    }

		// smooth scrolling
    window.$(document).on('click', 'a.page-scroll', function(e){
      e.preventDefault();
      window.$('html, body').animate({
        scrollTop: window.$( window.$.attr(this, 'href') ).offset().top
      }, 900);
    });

		window.$('.navbar-collapse a.page-scroll').click(function(){
				window.$(".navbar-collapse").collapse('hide');
		});

		window.$(function(){
			if(window.$('bootmark').length){
        var bootmarkEl = window.$('bootmark').attr('id','bootmark-custom-tag');
				bootmark.parse({
					id: 'bootmark-custom-tag',
					mdId: bootmarkEl.attr('mdId'),
					fetch: bootmarkEl.attr('fetch'),
					toc: bootmarkEl.attr('toc'),
					css: bootmarkEl.attr('css'),
					theme: bootmarkEl.attr('theme')
				});
      } else if(window.$('#bootmark-md.bootmark-md').length){
        var bootmarkMd = window.$('#bootmark-md');
				bootmark.parse({
					id: 'bootmark-md',
					mdId: bootmarkMd.attr('data-mdId'),
					fetch: bootmarkMd.attr('data-fetch'),
					toc: bootmarkMd.attr('data-toc'),
					css: bootmarkMd.attr('data-css'),
					theme: bootmarkMd.attr('data-theme')
				});
			}
		});

    return bootmark;
  }

	if(typeof window.$ === 'undefined'){ throw new Error('JQuery is not defined'); }
	if(typeof window.$.fn.modal === 'undefined'){ throw new Error('Bootstrap is not defined'); }
  if(typeof window.bootmark === 'undefined'){ window.bootmark = defineBootmark(); }
})(window, document);
