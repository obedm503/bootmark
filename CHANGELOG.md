## bootmark changelog

> markdown + bootstrap as a jQuery plugin

### Future
#### NEW
- ...

#### FIX
- navbar doesn't collapse on link click

### 0.7.0 2016-11-14
#### NEW
- user-defined templates (as string, in-document and external)
- added template examples
- added more comments to the source code

#### FIXED
- simplified and organized code

### 0.6.0 2016-10-16
#### NEW
- fetch multiple files within a single element
- added new examples
- added more comments to the source code

#### FIXED
- remove repeating links in print mode
- make prettify theme to lowercase and replace spaces with dashes for safety measures

### 0.5.0 2016-10-09
#### NEW
- first one to support latex math with the [katex-latex](https://obedm503.github.io/katex-latex/) extension
- added credits footer, it's still optional
- can use multiple elements within a single document
- can define page-wide options instead of repeating options in the individual elements
- changed the use of id bootmark to class bootmark on elements
- added whatwg-fetch polyfill to bundle
- added es6-promise polyfill to bundle
- removed addition of polyfill.io
- removed getParam function from bootmark object

#### FIXED
- documentation
- toc-less template
- support browers without fetch or promise
- insert links to head only if they don't already exist

### 0.4.0 2016-09-04
#### NEW
- now a jQuery plugin
- breaks backward compatibility
- user can pass custom config to the showdown converter

#### FIXED
- ...
