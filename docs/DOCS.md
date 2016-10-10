## Functions

<dl>
<dt><a href="#_insertLinkTag">_insertLinkTag(url)</a> ℗</dt>
<dd><p>creates a new link element if it doesn&#39;t already exist. Used to add the theme&#39;s css and bootmark&#39;s css</p>
</dd>
<dt><a href="#_insertMetaTag">_insertMetaTag(name, content)</a> ℗</dt>
<dd><p>creates the meta element which required by bootstrap, if it doesn&#39;t already exist</p>
</dd>
<dt><a href="#_insertHtml">_insertHtml(element, config, markdown)</a> ⇒ <code>String</code> ℗</dt>
<dd><p>handles dom manipulation</p>
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
creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css

**Kind**: global function  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | url to set as source |

<a name="_insertMetaTag"></a>

## _insertMetaTag(name, content) ℗
creates the meta element which required by bootstrap, if it doesn't already exist

**Kind**: global function  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name property of the meta element |
| content | <code>String</code> | content property of the meta element |

<a name="_insertHtml"></a>

## _insertHtml(element, config, markdown) ⇒ <code>String</code> ℗
handles dom manipulation

**Kind**: global function  
**Returns**: <code>String</code> - html resolves with parsed and processed markdown  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Object</code> | this jQuery element |
| config | <code>Object</code> | bootmark config object |
| markdown | <code>String</code> | markdown to be parsed by showdown |

<a name="external_jQuery.fn"></a>

## jQuery.fn
The jQuery plugin namespace.

**Kind**: global external  
**See**: [jQuery Plugins](http://learn.jquery.com/plugins/)  
<a name="external_jQuery.fn.bootmark"></a>

### jQuery.fn.bootmark([config]) ⇒ <code>jQuery</code> &#124; <code>Promise</code>
converts markdown to beautiful bootstrap-styled-markdown-converted-to-html. This documentation is automatically generated from source code by [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown)

**Kind**: static method of <code>[jQuery.fn](#external_jQuery.fn)</code>  
**Returns**: <code>jQuery</code> - jQuery the jQuery object to allow chaining or<code>Promise</code> - Promise which resolves with the markdown parsed as html  
**See**: Examples: http://obedm503.github.io/bootmark/ or http://obedm503.github.io/bootmark/docs/examples.html  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  | configuration object |
| [config.markdown] | <code>String</code> | <code>false</code> | markdown could be passed direcly from some variable. It HAS to be as text not html. If this is `true`, it has priority over fetch and markdown inside the element. |
| [config.fetch] | <code>String</code> | <code>false</code> | url to fetch. markdown could be in some markdown file somewhere. bootmark fetches the file, processes, and inserts it into the element. |
| [config.css] | <code>String</code> | <code>https://obedm503.github.io/bootmark/dist/bootmark.min.css</code> | bootmark's css. defaults to 'https://obedm503.github.io/bootmark/dist/bootmark.min.css'. |
| [config.promise] | <code>String</code> | <code>false</code> | whether to return a  promise that resolves with parsed html. if false, bootmark will return the jQuery object to allow chaining. |
| [config.html] | <code>Object</code> &#124; <code>String</code> |  | html config object. this only pertains to html produced. if it's a string it will be parsed to an object. |
| [config.html.toc] | <code>Boolean</code> | <code>true</code> | whether to show the table of contents/menu. defaults to true |
| [config.html.indent] | <code>Boolean</code> | <code>false</code> | whether to indent paragraphs by adding the `bootmark-indent` css class |
| [config.html.theme] | <code>String</code> | <code>readable</code> | any one of the [bootswatch themes](http://bootswatch.com). defaults to the [readable theme](http://bootswatch.com/readable/) |
| [config.html.prettify] | <code>Boolean</code> | <code>true</code> | whether to prettify code blocks |
| [config.html.prettifyTheme] | <code>String</code> | <code>atelier-forest-light</code> | theme to prettify the code with. Any of the themes [here](https://jmblog.github.io/color-themes-for-google-code-prettify/) will work. |
| [config.html.credit] | <code>String</code> | <code>true</code> | whether to include a footer which links to bootmark's page |
| [config.showdown] | <code>Object</code> &#124; <code>String</code> |  | config passed to the showdown converter. These are the options bootmark uses by default. They can be overriden. { parseImgDimensions: true, simplifiedAutoLink: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, tasklists: true } |

