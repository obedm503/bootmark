![bootmark logo](https://obedm503.github.io/bootmark/bootmark-logo.png =220x220)

### bootmark examples/starters/templates

----

#### A Note on example files
the html examples found here are meant as starters for new users, as such they are linked to the latest stable version of bootmark in unpkg. https://unpkg.com/bootmark@latest/dist/

> you can now use an unlimited amount of elements and define global options for all to use. See [this for an example](https://obedm503.github.io/katex-latex/).

### see the docs [here](https://obedm503.github.io/bootmark/docs/)

bootmark can be used in 3 main ways:
- with the custom `<bootmark></bootmark>`, without code
- with any element with `class="bootmark"`, without code
- through code

### bootmark element

> The custom `<bootmark></bootmark>` element has to exist at DOMContentLoaded event.

if used, bootmark will insert final html into here. helpful because extra code is not needed, everything happends through the element's attributes.

valid attributes are:
- `fetch="<url to md file>"` DEPRECATED, use `src` instead: optional. leave empty to use markdown within the bootmark element
- `src="<url/s to md file>"` optional. leave empty to use markdown within the bootmark element
- `join="<markdown text that goes between files when they're concatenated,  if multiple urls are passed in src>"` defaults to `----` aka `<hr />`
- `css="<url to bootmark.css file>"` recommended. defaults to `https://obedm503.github.io/bootmark/dist/bootmark.min.css`
- `html=<html-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `template=<template-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `promise=<whether to return a promise>` DEPRECATED: defaults to `false`
- `showdown=<config passed to the showdown converter>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-customtag.html](https://obedm503.github.io/bootmark/docs/document-customtag.html)
- [src-customtag.html](https://obedm503.github.io/bootmark/docs/src-customtag.html)

### any html element

a div element is recommended

> this option was added for people who wish to have "valid" html

Similarly to using the bootmark element, you can use bootmark with any html element through some custom attributes. if used, final html will be inserted here.

**required:**
- `class="bootmark"`

valid attributes are:
- `data-fetch="<url to md file>"` DEPRECATED, use `data-src` instead: optional. leave empty to use markdown within the bootmark element
- `data-src="<url/s to md file>"` optional. leave empty to use markdown within the bootmark element
- `data-join="<markdown text that goes between files when they're concatenated, if multiple urls are passed in src>"` defaults to `----` aka `<hr />`
- `data-css="<url to bootmark.css file>"` recommended. defaults to `https://obedm503.github.io/bootmark/dist/bootmark.min.css`
- `data-html=<html-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `data-template=<template-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `data-promise=<whether to return a promise>` DEPRECATED: defaults to `false`
- `data-showdown=<config passed to the showdown converter>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-anytag.html](https://obedm503.github.io/bootmark/docs/document-anytag.html)
- [src-anytag.html](https://obedm503.github.io/bootmark/docs/src-anytag.html)

### use code

in case you want to handle when the parsing happens

config properties are:
- `fetch: '<url of markdown file to use>'` DEPRECATED, use `src` instead
- `src: '<url/s of markdown file to use>'`
- `join: '<markdown text that goes between files when they're concatenated, if multiple urls are passed in src>"` defaults to `----` aka `<hr />`
- `css: '<url to bootmark's css file>'` defaults to `dist/bootmark.min.css`. recommended
- `markdown: <some variable containing markdown to parse>` someone might find this useful
- `html: <html-only config>` optional. see [docs for more detail](https://obedm503.github.io/bootmark/docs/index.html)
- `template: <template-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `promise: <whether to return a promise>` DEPRECATED: defaults to `false`
- `showdown: <config passed to the showdown converter>` see [docs for more detail](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-code.html](https://obedm503.github.io/bootmark/docs/document-code.html)
- [src-code.html](https://obedm503.github.io/bootmark/docs/src-code.html)

### multiple files

You can use an unlimited amount of elements that "automatically" use bootmark. You can also mix between the two automatic methods (`<bootmark>` or `<div class="bootmark">`). But if you want to use multiple markdown files it's recommended that you set the ~~`fetch` to an array of markdown file urls~~ `src` to a list of space-separated urls, instead of multiple "automatic" elements each fetching a different file. You can also define the text that joins the different files. Just set the `join` to any string. This string should be MARKDOWN and NOT html. This feature was added by request of [niklasnorin](https://github.com/niklasnorin/) in [#5](https://github.com/obedm503/bootmark/issues/5) Check the [docs](https://obedm503.github.io/bootmark/docs/) for details on the api.

Examples:
- [multiple elements, no toc](https://obedm503.github.io/bootmark/docs/multiple-elements-no-toc.html)
- [multiple files, toc](https://obedm503.github.io/bootmark/docs/multiple-files-toc.html)

### custom html templates

you can now use your own custom templates to wrap the produced html

> default: `id="bootmark-template"`

by default it looks for a tag with id of `bootmark-template`, but this can also be customized by setting the `id` on the `template` or `data-template` attribute on the `bootmark` element. `<template>` tags are recommended because they are inert.

bootmark will look for `${bootmark}` in the template and replace it with the parsed markdown. The syntax was inspired by Aurelia.

#### template as text
```html
<!-- index.html -->
<bootmark template="{ text: '${bootmark}' }">
## a title

a paragraph
</bootmark>
```
#### template in `template` element
```html
<!-- index.html -->
<bootmark template="{ id: 'custom-id' }">
## a title

a paragraph
</bootmark>

<template id="custom-id">
	<div class="container">
		${bootmark}
	</div>
</template>
```
#### template in some html file inside a `template` element
```html
<!-- template.html -->
<template>
	<div class="container">
		${bootmark}
	</div>
</template>

<!-- index.html -->
<bootmark template="{ fetch: 'template.html' }">
## a title

a paragraph
</bootmark>
```

Examples:
- [custom template](https://obedm503.github.io/bootmark/docs/template-example.html)
- [custom template: src](https://obedm503.github.io/bootmark/docs/template-src-example.html)
- [custom template: text](https://obedm503.github.io/bootmark/docs/template-text-example.html)

### markdown examples

* [kitchen sink](./markdown-cheatsheet.html)

