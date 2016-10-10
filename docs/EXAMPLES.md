![bootmark logo](https://obedm503.github.io/bootmark/bootmark-logo.png =220x220)

### bootmark examples/starters/templates

----

> you can now use an unlimited amount of elements and define global options for all to use. See [this for an example](https://obedm503.github.io/katex-latex/).

see the docs [here](https://obedm503.github.io/bootmark/docs/)

bootmark can be used in 3 ways:
- with the custom ``<bootmark></bootmark>``, without code
- with any element with ``class="bootmark"``, without code
- through code

### bootmark elemment

> The custom ``<bootmark></bootmark>`` element has to exist at DOMContentLoaded event.

if used, bootmark will insert final html into here. helpful because extra code is not needed, everything happends through the element's attributes.

valid attributes are:
- `fetch="<url to md file>"` optional. leave empty to use markdown within the bootmark element
- `css="<url to bootmark.css file>"` recommended. defaults to `https://obedm503.github.io/bootmark/dist/bootmark.min.css`
- `html=<html-only config object>` see [docs for more details](https://obedm503.github.io/bootmark/docs/)
- ``promise=<whether to return a promise>` defaults to `false`
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
- `css: '<url to bootmark's css file>'` defaults to `dist/bootmark.min.css`. recommended
- `markdown: <some variable containing markdown to parse>` someone might find this useful
- `html: <html-only config>` optional. see [docs for more detail](https://obedm503.github.io/bootmark/docs/index.html)
- `promise: <whether to return a promise>` defaults to `false`
- `showdown: <config passed to the showdown converter>` see [docs for more detail](https://obedm503.github.io/bootmark/docs/)

Examples:
- [document-code.html](https://obedm503.github.io/bootmark/docs/document-code.html)
- [fetch-code.html](https://obedm503.github.io/bootmark/docs/fetch-code.html)
