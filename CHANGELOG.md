## bootmark changelog

### Future
#### NEW
- ...

#### FIX
- ...

### 0.8.1 2017-03-25
#### NEW
- added "src", deprecated "promise" and "fetch", and added deprecation warnings
- added `config.html.tocLimit` to limit the levels of headers used in the toc
- move task running to npm scripts instead of gulp. these are documented in the README
- styles are now Sass `.scss` files instead of CSS
- updated `.eslintrc.json` with code style rules
- moved logo to `assets/`

#### FIXED
- fixed html entities not showing as they should #14

### 0.7.1 2016-11-20
#### FIXED
- changed default favicon url to https://obedm503.github.io/bootmark/bootmark-favicon.png

### 0.7.0 2016-11-19
#### NEW
- user-defined templates (as string, in-document and external)
- added template examples
- added more comments to the source code
- you can now define the `toc`'s `id`
- now adds "bootmark" favicon. this can be disabled or favicon url changed

#### FIXED
- simplified and organized code
- navbar now collapses on link click
- smooth scrolling on links to `id`s and `<a>`s

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
