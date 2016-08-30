/**!
* @name bootmark
* @description markdown n stuff, originally a fork of [strapdownjs](http://strapdownjs.com).
* @author [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>
* @see [git repo](https://github.com/obedm503/bootmark.git)
* @version 0.1.0
* @license MIT
*/
(function(window, document){
  'use scrict';
  function defineBootmark(){
    var bootmark = {
      md: md,
      getParam: getParam
    };
    // smooth scrolling
    $(document).on('click', 'a', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 900);
    });
    
    function _hide(){
      document.body.style.display = 'none';
    }
    function _show(){
      document.body.style.display = '';
    }
    //showdown converter
    function _parse(md){
      return new window.showdown.Converter({
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true
      }).makeHtml(md);
    }
    function _insert(node, html, id, toc){
      if(toc === true){
        node.className += 'container-fluid';
        node.innerHTML = 
          '<div class="row">'+
            '<div class="col-sm-3 col-lg-2">'+
              '<nav class="navbar navbar-default navbar-fixed-side">'+
                '<div class="container">'+
                  '<div class="navbar-header">'+
                    '<button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">'+
                      '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span>'+
                      '<span class="icon-bar"></span><span class="icon-bar"></span>'+
                    '</button>'+
                    '<a class="navbar-brand active" href="#'+ id +'">'+ document.getElementsByTagName("title")[0].innerHTML +'</a>'+
                  '</div>'+
                '<div class="collapse navbar-collapse">'+
                  '<ul id="bootmark-ul" class="nav navbar-nav"></ul>'+//bootmark-ul
                '</div>'+
              '</nav>'+
            '</div>'+
            '<div id="bootmark-main" class="col-sm-9 col-lg-10"></div>'+//bootmark-main
          '</div>';
      } else {
        node.className = 'container';
        node.innerHTML = 
          '<div class="row">'+
            '<div id="bootmark-main" class="col-sm-9 col-lg-10"></div>'+//bootmark-main
          '</div>';
      }
      
      document.getElementById('bootmark-main').innerHTML = html;
      if(document.getElementById('bootmark-ul')){
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function(el){
          var li = document.createElement('li');
            li.innerHTML = '<a class="page-scroll" href="#'+ el.id +'">'+ el.innerText +'</a>';
          document.getElementById('bootmark-ul').appendChild(li);
        });
      }
      
      _show();
      return html;
    }
    function _insertLinkTag(url){
      var link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    function _insertMetaTag(name, content){
      var meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
    function _insertScriptTag(src){
      var script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);
    }
    
    /**
    * @function getParam
    * @memberof bootmark
    * @description gets param from url, made for the purpose of the example
    * @param {String} name name of param
    * @returns {String} html
    * @example
    * //example url "www.example.com?theme=cyborg"
    * bootmark.getParam('theme');// cyborg
    */
    function getParam(name) {
      var url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    /**
    * @function md
    * @memberof bootmark
    * @description parses markdown
    * @param {Object} config configuration object
    * @returns {String} html
    * @example see the index.html for an example
    */
    function md(config){
      return new Promise(function(resolve, reject){
        _hide();//hide body
        
        var md = config.md || false,//text
            fetch = config.fetch || false,// url
            useId = config.useId || false,
            id = config.id || 'bootmark-md',// dom id
            toc = (typeof config.toc === 'undefined') ? true : config.toc,
            theme = config.theme || 'readable',
            css = config.css || 'dist/bootmark.min.css';

        // meta
        _insertMetaTag('viewport', 'width=device-width, initial-scale=1');
        //polyfill
        _insertScriptTag('https://cdn.polyfill.io/v2/polyfill.min.js');
        //theme
        _insertLinkTag('https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' + theme.toLowerCase() + '/bootstrap.min.css');
        //bootmark
        _insertLinkTag(css);


        if(md){
          //config.md is the markdown!
          resolve(_insert(document.getElementById(id), _parse(md), id, toc));
        } else if(fetch){
          window.fetch(fetch).then(function(res){
            return res.text();
          }).then(function(txt){
            resolve(_insert(document.getElementById(id), _parse(txt), id, toc));
          });
        } else if(useId){
          //dom
          var useIdNode = document.getElementById(useId);
          resolve(_insert(document.getElementById(id), _parse(useIdNode.innerText ? useIdNode.innerText : useIdNode.textContent), id, toc));
        }
       });
    }
    
    return bootmark;
  }
  
  if(typeof window.bootmark === 'undefined'){ window.bootmark = defineBootmark(); }
})(window, document);
