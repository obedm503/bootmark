## Functions

<dl>
<dt><a href="#_insertLinkTag">_insertLinkTag(url)</a> ℗</dt>
<dd><p>creates a new link element which used to add the theme&#39;s css and bootmark&#39;s css</p>
</dd>
<dt><a href="#_insertMetaTag">_insertMetaTag(name, content)</a> ℗</dt>
<dd><p>creates the meta element which required by bootstrap</p>
</dd>
<dt><a href="#_insertHtml">_insertHtml(html, id)</a> ⇒ <code>String</code> ℗</dt>
<dd><p>handles dom manipulation, maybe custom templates could be added in the future</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_jQuery.fn">jQuery.fn</a></dt>
<dd><p>The jQuery plugin namespace.</p>
</dd>
</dl>

<a name="_insertLinkTag"></a>

## _insertLinkTag(url) ℗
creates a new link element which used to add the theme's css and bootmark's css

**Kind**: global function  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | url to set as source |

<a name="_insertMetaTag"></a>

## _insertMetaTag(name, content) ℗
creates the meta element which required by bootstrap

**Kind**: global function  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name property of the meta element |
| content | <code>String</code> | content property of the meta element |

<a name="_insertHtml"></a>

## _insertHtml(html, id) ⇒ <code>String</code> ℗
handles dom manipulation, maybe custom templates could be added in the future

**Kind**: global function  
**Returns**: <code>String</code> - html html which is later returned by the promise resolution  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | markdown parsed by [_parse](#bootmark._parse) |
| id | <code>String</code> | element id into which insert the html |

<a name="external_jQuery.fn"></a>

## jQuery.fn
The jQuery plugin namespace.

**Kind**: global external  
**See**: [jQuery Plugins](http://learn.jquery.com/plugins/)  
<a name="external_jQuery.fn.bootmark"></a>

### jQuery.fn.bootmark([config]) ⇒ <code>jQuery</code> &#124; <code>Promise</code>
converts markdown to beautiful bootstrap-styled-markdown-converted-to-html

**Kind**: static method of <code>[jQuery.fn](#external_jQuery.fn)</code>  
**Returns**: <code>jQuery</code> - jQuery the jQuery object to allow chaining or<code>Promise</code> - promise which resolves with the markdown parsed as html  
**See**: Examples: http://obedm503.github.io/bootmark/ or http://obedm503.github.io/bootmark/examples/ file  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  | configuration object |
| [config.markdown] | <code>String</code> | <code>false</code> | markdown could be passed direcly from some variable. It HAS to be as text not html. |
| [config.fetch] | <code>String</code> | <code>false</code> | url to fetch. markdown could be some markdown file somewhere |
| [config.css] | <code>String</code> | <code>dist/bootmark.min.css</code> | bootmark's css. defaults to 'dist/bootmark.min.css' |
| [config.promise] | <code>String</code> | <code>false</code> | whether to return a  promise that resolves with parsed html. if false, bootmark will return the jQuery object. |
| [config.html] | <code>Object</code> &#124; <code>String</code> |  | html config object. this only pertains to html produced. if it's a string it will be parsed to an object. |
| [config.html.toc] | <code>Boolean</code> | <code>true</code> | whether to show the table of contents/menu. defaults to true |
| [config.html.indent] | <code>Boolean</code> | <code>false</code> | whether to indent paragraphs by adding the ``bootmark-indent`` css class |
| [config.html.theme] | <code>String</code> | <code>readable</code> | any one of the [bootswatch themes](http://bootswatch.com). defaults to the readable theme |
| [config.html.prettify] | <code>Boolean</code> | <code>true</code> | whether to prettify code blocks |
| [config.html.prettifyTheme] | <code>String</code> | <code>atelier-forest-light</code> | theme to prettify the code with. Any of the themes [here](https://jmblog.github.io/color-themes-for-google-code-prettify/) will work. |
| [config.showdown] | <code>Object</code> &#124; <code>String</code> |  | config passed to the showdown converter |

