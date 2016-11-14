![bootmark logo](https://obedm503.github.io/bootmark/bootmark-logo.png =220x220)

### bootmark examples/starters/templates

----

> you can now use an unlimited amount of elements and define global options for all to use. See [this for an example](https://obedm503.github.io/katex-latex/).

see the docs [here](https://obedm503.github.io/bootmark/docs/)

bootmark can be used in 3 main ways:
- with the custom `<bootmark></bootmark>`, without code
- with any element with `class="bootmark"`, without code
- through code

### bootmark elemment

> The custom `<bootmark></bootmark>` element has to exist at DOMContentLoaded event.

if used, bootmark will insert final html into here. helpful because extra code is not needed, everything happends through the element's attributes.

valid attributes are:
- `fetch="<url to md file>"` optional. leave empty to use markdown within the bootmark element
- `join="<markdown text that goes between files when they're concatenated, if using fetch as an array>"` defaults to `----` aka `<hr />`
- `css="<url to bootmark.css file>"` recommended. defaults to `https://obedm503.github.io/bootmark/dist/bootmark.min.css`
- `html=<html-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `promise=<whether to return a promise>` defaults to `false`
- `showdown=<config passed to the showdown converter>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-customtag.html](https://obedm503.github.io/bootmark/docs/document-customtag.html)
- [fetch-customtag.html](https://obedm503.github.io/bootmark/docs/fetch-customtag.html)

### any html element

a div element is recommended

> this option was added for people who wish to have "valid" html

Similarly to using the bootmark element, you can use bootmark with any html element through some custom attributes. if used, final html will be inserted here.

**required:**
- `class="bootmark"`

valid attributes are:
- `data-fetch="<url to md file>"` optional. leave empty to use markdown within the bootmark element
- `data-join="<markdown text that goes between files when they're concatenated, if using fetch as an array>"` defaults to `----` aka `<hr />`
- `data-css="<url to bootmark.css file>"` recommended. defaults to `https://obedm503.github.io/bootmark/dist/bootmark.min.css`
- `data-html=<html-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- `data-promise=<whether to return a promise>` defaults to `false`
- `data-showdown=<config passed to the showdown converter>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-anytag.html](https://obedm503.github.io/bootmark/docs/document-anytag.html)
- [fetch-anytag.html](https://obedm503.github.io/bootmark/docs/fetch-anytag.html)

### use code

in case you want to handle when parsing happens

config properties are:
- `fetch: '<url of markdown file to fetch>'`
- `join: '<markdown text that goes between files when they're concatenated, if using fetch as an array>'` defaults to `----` aka `<hr />`
- `css: '<url to bootmark's css file>'` defaults to `dist/bootmark.min.css`. recommended
- `markdown: <some variable containing markdown to parse>` someone might find this useful
- `html: <html-only config>` optional. see [docs for more detail](https://obedm503.github.io/bootmark/docs/index.html)
- `promise: <whether to return a promise>` defaults to `false`
- `showdown: <config passed to the showdown converter>` see [docs for more detail](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-code.html](https://obedm503.github.io/bootmark/docs/document-code.html)
- [fetch-code.html](https://obedm503.github.io/bootmark/docs/fetch-code.html)

### multiple files

You can use an unlimited amount of elements that "automatically" use bootmark. You can also mix between the two automatic methods (`<bootmark>` or `<div class="bootmark">`). But if you want to fetch multiple markdown files it's recommended that you set the `fetch` to an array of markdown file urls, instead of multiple "automatic" elements each fetching a different file. Also, `fetch` as an array is faster as all the files are parsed to html as a single markdown document. You can also define the text that joins the different files. Just set the `join` to any string. This string should be MARKDOWN and not html. This feature was added by request of [niklasnorin](https://github.com/niklasnorin/) in [#5](https://github.com/obedm503/bootmark/issues/5) Check the [docs](https://obedm503.github.io/bootmark/docs/) for details on the api.

Examples:
- [multiple elements, no toc](https://obedm503.github.io/bootmark/docs/multiple-elements-no-toc.html)
- [multiple files, toc](https://obedm503.github.io/bootmark/docs/multiple-files-toc.html)

## custom html templates

you can now use your own custom templates to wrap the produced html

> default: `id="bootmark-template"`

by default it looks for a tag with id of `bootmark-template`, but this can also be customized by setting the `id` on the `template` or `data-template` attribute on the `bootmark` element. `<template>` tags are recommended because they are inert.

bootmark will look for `${bootmark-html}` in the template and replace it with the parsed markdown. The syntax was inspired by Aurelia.

```html
<bootmark template="{id:'custom-id'}"></bootmark>

<template id="custom-id">
	<div class="container">
		${bootmark-html}
	</div>
</template>
```

Examples:
- [custom template](https://obedm503.github.io/bootmark/docs/template-example.html)
- [custom template fetch](https://obedm503.github.io/bootmark/docs/template-fetch-example.html)
