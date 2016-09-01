<a name="bootmark"></a>

## bootmark
markdown n stuff, originally a fork of [strapdownjs](http://strapdownjs.com).

**Kind**: global variable  
**See**: [git repo](https://github.com/obedm503/bootmark.git)  
**Version**: 0.2.0  
**Author:** [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>  
**License**: MIT  

* [bootmark](#bootmark)
    * [._parse(markdown)](#bootmark._parse) ⇒ <code>String</code>
    * [._insert(html, id)](#bootmark._insert) ⇒ <code>String</code>
    * [._insertLinkTag(url)](#bootmark._insertLinkTag)
    * [._insertMetaTag(name, content)](#bootmark._insertMetaTag)
    * [._insertScriptTag(src)](#bootmark._insertScriptTag)
    * [.getParam(name)](#bootmark.getParam) ⇒ <code>String</code>
    * [.parse(config)](#bootmark.parse) ⇒ <code>Object</code>

<a name="bootmark._parse"></a>

### bootmark._parse(markdown) ⇒ <code>String</code>
creates a new showdown Converter which is used to parse the markdown

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Returns**: <code>String</code> - html html which is further changed by [_insert](bootmark._insert)  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| markdown | <code>String</code> | markdown to parse |

<a name="bootmark._insert"></a>

### bootmark._insert(html, id) ⇒ <code>String</code>
handles dom manipulation, maybe custom templates could be add in the future

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Returns**: <code>String</code> - html html which is later returned by the promise resolution  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | markdown parsed by [_parse](bootmark._parse) |
| id | <code>String</code> | element id into which insert the html |

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

<a name="bootmark.getParam"></a>

### bootmark.getParam(name) ⇒ <code>String</code>
gets param from url, made specifically for the demo>This doesn't work on some servers. They interpret the ``?`` in url as a server request. It may cause problems.

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Returns**: <code>String</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of param |

**Example**  
```js
//example url "www.example.com?theme=cyborg"bootmark.getParam('theme');// cyborg
```
<a name="bootmark.parse"></a>

### bootmark.parse(config) ⇒ <code>Object</code>
main function which decides everything.

**Kind**: static method of <code>[bootmark](#bootmark)</code>  
**Returns**: <code>Object</code> - promise which resolves with the parsed markdown  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>Object</code> |  | configuration object |
| [config.md] | <code>String</code> | <code>false</code> | markdown could be passed direcly from some variable. It HAS to be as text not some innerHTML |
| [config.fetch] | <code>String</code> | <code>false</code> | url to fetch. markdown could be some markdown file somewhere |
| [config.mdId] | <code>String</code> | <code>bootmark-md</code> | id containing markdown. be careful that the markdown is not indented, if it is the parser will interpret everything as code. |
| [config.id] | <code>String</code> | <code>bootmark-md</code> | id into which bootmark should insert final html. because it defaults to the same id as mdId, it will substitute the markdown for the html. |
| [config.toc] | <code>Boolean</code> | <code>true</code> | whether to show the table of contents/menu. defaults to true |
| [config.theme] | <code>String</code> | <code>readable</code> | any one of the [bootswatch themes](http://bootswatch.com). defaults to the readable theme |
| [config.css] | <code>String</code> | <code>dist/bootmark.min.css</code> | bootmark's css. defaults to 'dist/bootmark.min.css' |

**Example**  
```js
see the index.html or docs/EXAMPLES.md file
```
