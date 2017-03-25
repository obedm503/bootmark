
## Members

<dl>
<dt><a href="#_private">_private</a> ℗</dt>
<dd><p>private helper methods</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_jQuery.fn">jQuery.fn</a></dt>
<dd><p>The jQuery plugin namespace.</p>
</dd>
</dl>

<a name="_private"></a>

## _private ℗
private helper methods

**Kind**: global variable  
**Access:** private  

* [_private](#_private) ℗
    * [.unescape(text)](#_private.unescape)
    * [.insertLink(url, [type], [rel])](#_private.insertLink)
    * [.insertMeta(name, content)](#_private.insertMeta)
    * [.parseObject(object, properties)](#_private.parseObject) ⇒ <code>Object</code>
    * [.replaceHtml(template, html)](#_private.replaceHtml) ⇒ <code>String</code>
    * [.getMarkdown(element, config)](#_private.getMarkdown) ⇒ <code>Promise</code>
    * [.getTemplate(config)](#_private.getTemplate) ⇒ <code>Promise</code>
    * [.doDom(element, config)](#_private.doDom)

<a name="_private.unescape"></a>

### _private.unescape(text)
unescapes some html entities

**Kind**: static method of <code>[_private](#_private)</code>  
**Params**

- text <code>String</code> - text to unescape

<a name="_private.insertLink"></a>

### _private.insertLink(url, [type], [rel])
creates a new link element if it doesn't already exist. Used to add the theme's css and bootmark's css, and favicon

**Kind**: static method of <code>[_private](#_private)</code>  
**Params**

- url <code>String</code> - url to set as source
- [type] <code>String</code> <code> = text/css</code> - link's type
- [rel] <code>String</code> <code> = stylesheet</code> - link's rel

<a name="_private.insertMeta"></a>

### _private.insertMeta(name, content)
creates the meta element which required by bootstrap, if it doesn't already exist

**Kind**: static method of <code>[_private](#_private)</code>  
**Params**

- name <code>String</code> - name property of the meta element
- content <code>String</code> - content property of the meta element

<a name="_private.parseObject"></a>

### _private.parseObject(object, properties) ⇒ <code>Object</code>
parses object thru eval(). If property on object is 'fetch' and it's first character is '[', eval it.

**Kind**: static method of <code>[_private](#_private)</code>  
**Returns**: <code>Object</code> - object parsed for every of the properties in the array  
**Params**

- object <code>Object</code> - to parse
- properties <code>Array</code> - to eval

<a name="_private.replaceHtml"></a>

### _private.replaceHtml(template, html) ⇒ <code>String</code>
replaces html in template and returns it. Global. Case insensitive.

**Kind**: static method of <code>[_private](#_private)</code>  
**Returns**: <code>String</code> - hmtl replaced in the template  
**Params**

- template <code>String</code> - html string
- html <code>String</code> - to replace `${bootmark}` with

<a name="_private.getMarkdown"></a>

### _private.getMarkdown(element, config) ⇒ <code>Promise</code>
gets markdown

**Kind**: static method of <code>[_private](#_private)</code>  
**Returns**: <code>Promise</code> - Promise that resolves with the markdown text or rejects with any errors  
**Params**

- element <code>Object</code> - jQuery element
- config <code>Object</code> - bootmark config

<a name="_private.getTemplate"></a>

### _private.getTemplate(config) ⇒ <code>Promise</code>
gets the template form config.template.text, config.template.fetch, config.template.id, or use toc template or toc-less template

**Kind**: static method of <code>[_private](#_private)</code>  
**Returns**: <code>Promise</code> - Promise that resolves with the html template text or rejects with any errors  
**Params**

- config <code>Object</code> - bootmark config

<a name="_private.doDom"></a>

### _private.doDom(element, config)
modifies the dom

**Kind**: static method of <code>[_private](#_private)</code>  
**Params**

- element <code>Object</code> - jQuery element
- config <code>Object</code> - bootmark config

<a name="external_jQuery.fn"></a>

## jQuery.fn
The jQuery plugin namespace.

**Kind**: global external  
**See**: [jQuery Plugins](http://learn.jquery.com/plugins/)  
<a name="external_jQuery.fn.bootmark"></a>

### jQuery.fn.bootmark([config]) ⇒ <code>jQuery</code> &#124; <code>Promise</code>
converts markdown to beautiful bootstrap-styled-html. This documentation is automatically generated from source code by [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown)

**Kind**: static method of <code>[jQuery.fn](#external_jQuery.fn)</code>  
**Returns**: <code>jQuery</code> - jQuery the jQuery object to allow chaining or<code>Promise</code> - Promise which resolves with the markdown parsed by showdown as html  
**See**: Examples: http://obedm503.github.io/bootmark/ or http://obedm503.github.io/bootmark/docs/examples.html  
**Params**

- [config] <code>Object</code> - configuration object
    - [.markdown] <code>String</code> <code> = false</code> - markdown could be passed direcly from some variable. It HAS to be as text not html. If this is `true`, it has priority over fetch and markdown inside the element.
    - [.src] <code>String</code> | <code>Array.&lt;String&gt;</code> <code> = &#x27;&#x27;</code> - url/s to fetch. markdown could be in some markdown file/s somewhere. bootmark fetches the file/s, processes, and inserts it/them into the element. If it's multiple space-separated urls, bootmark will fetch, concatenate, and process them.
    - [.fetch] <code>String</code> | <code>Array.&lt;String&gt;</code> <code> = false</code> - DEPRECATED: url/s to fetch. markdown could be in some markdown file/s somewhere. bootmark fetches the file/s, processes, and inserts it/them into the element. If it's an array of urls, bootmark will fetch, concatenate, and process all of them.
    - [.join] <code>String</code> <code> = ----</code> - string to be passed to the Array.prototype.join() when concatenating multiple markdown files if config.fetch is an array.
    - [.promise] <code>String</code> <code> = false</code> - DEPRECATED: whether to return a  promise that resolves with parsed html. if false, bootmark will return the jQuery object to allow chaining.  IF YOU STILL WANT TO RETURN A PROMISE USE `$('#id').bootmark({...}).promise().then(...)` instead.
    - [.html] <code>Object</code> | <code>String</code> - html config object. this only pertains to html produced. if it's a string it will be parsed to an object.
        - [.favicon] <code>Boolean</code> <code> = https://obedm503.github.io/bootmark/bootmark-favicon.png</code> - url to favicon to add. if you don't want a favicon, set this to false of an empty string.
        - [.toc] <code>Boolean</code> <code> = true</code> - whether to show the table of contents/menu. defaults to true
        - [.tocLimit] <code>Number</code> <code> = 6</code> - which heading levels should be used to build the toc. by deafult all headings are used. `tocLimit=1` uses only `<h1>`'s,`tocLimit=2` uses `<h1>`'s and `<h2>`'s, and so on
        - [.tocTitle] <code>String</code> <code> = page title</code> - title for the toc. defaults to the page's title
        - [.tocId] <code>Boolean</code> <code> = nav</code> - id of navigation menu. used to attach the autoclose event when it's expanded on phones
        - [.indent] <code>Boolean</code> <code> = false</code> - whether to indent paragraphs by adding the `bootmark-indent` css class
        - [.theme] <code>String</code> <code> = readable</code> - any one of the [bootswatch themes](http://bootswatch.com). defaults to the [readable theme](http://bootswatch.com/readable/)
        - [.prettify] <code>Boolean</code> <code> = true</code> - whether to prettify code blocks
        - [.prettifyTheme] <code>String</code> <code> = atelier-forest-light</code> - theme to prettify the code with. Any of the themes [here](https://jmblog.github.io/color-themes-for-google-code-prettify/) will work.
        - [.credit] <code>String</code> <code> = true</code> - whether to include a footer which links to bootmark's page
        - [.tocTitle] <code>String</code> <code> = page title</code> - title for the toc. defaults to the page's title
    - [.showdown] <code>Object</code> | <code>String</code> - config passed to the showdown converter.
These are the options bootmark uses by default. They can be overriden.
``
{
parseImgDimensions: true,
simplifiedAutoLink: true,
literalMidWordUnderscores: true,
strikethrough: true,
tables: true,
tablesHeaderId: true,
tasklists: true
}
``
    - [.template] <code>Object</code> | <code>String</code> - template config
        - [.text] <code>String</code> <code> = false</code> - use this to pass in the template as a html string
        - [.fetch] <code>String</code> <code> = false</code> - url to external html file. The template **HAS** to be wrapped in `<template>` tags (inspired by aurelia templates).
        - [.id] <code>String</code> <code> = bootmark-template</code> - id to `<template>` element containing the template to use. if no template is found, then the toc or tocless templates will be used.

