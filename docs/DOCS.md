<a name="bootmark"></a>

## bootmark
markdown n stuff, originally a fork of [strapdownjs](http://strapdownjs.com).

**Kind**: global variable  
**Git**: [git repo](https://github.com/obedm503/bootmark.git)  
**Examples**: [examples/starter/templates](https://obedm503.github.io/bootmark/examples/index.html)  
**Version**: 0.4.0  
**Author:** [obedm503](https://github.com/obedm503/)  
**License**: MIT  

* [bootmark](#bootmark)
    * [._insertLinkTag(url)](#bootmark._insertLinkTag)
    * [._insertMetaTag(name, content)](#bootmark._insertMetaTag)
    * [._insertScriptTag(src)](#bootmark._insertScriptTag)
    * [._insertHtml(html, id)](#bootmark._insertHtml) ⇒ <code>String</code>

<a name="bootmark._insertLinkTag"></a>

### bootmark._insertLinkTag(url)
creates a new link element which used to add the theme's css and bootmark's css

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | url to set as source |

<a name="bootmark._insertMetaTag"></a>

### bootmark._insertMetaTag(name, content)
creates the meta element which required by bootstrap

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name property of the meta element |
| content | <code>String</code> | content property of the meta element |

<a name="bootmark._insertScriptTag"></a>

### bootmark._insertScriptTag(src)
creates a new script which is used to get the polyfill from [polyfill.io](https://polyfill.io/v2/docs/)polyfill is needed because bootmark uses fetch and Promise, which are sometimes not in the browserpolyfill.io only supplies things that are lacking in the current browser, that is why it's not included as part of bootmark.bundle.min.js file

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| src | <code>String</code> | source property of the script element |

<a name="bootmark._insertHtml"></a>

### bootmark._insertHtml(html, id) ⇒ <code>String</code>
handles dom manipulation, maybe custom templates could be added in the future

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Returns**: <code>String</code> - html html which is later returned by the promise resolution  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | markdown parsed by [_parse](#bootmark._parse) |
| id | <code>String</code> | element id into which insert the html |

