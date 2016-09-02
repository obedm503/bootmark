![bootmark](https://obedm503.github.io/bootmark/bootmark-logo.png =220x220)

## bootmark examples/starter templates

----

see the docs [here](https://obedm503.github.io/bootmark/docs/index.html)

bootmark can be used in 3 ways:
- with the custom ``<bootmark></bootmark>``
- with any element with ``id="bootmark-md"`` and ``class="bootmark-md"``
- through code

### bootmark elemment

>The custom ``<bootmark></bootmark>`` element has to exist at DocumentReady event.

if used, bootmark will insert final html into here. helpful because extra code is not needed, everything happends through the attributes.

valid attributes are:
- ``fetch="<url to md file>"`` optional. leave empty to use markdown within the bootmark element
- ``mdId="<id refering to element with RAW markdown inside>"`` optional. leave empty to use markdown within the bootmark element
- ``theme="<any bootswatch theme>"`` optional. defaults to 'readable'
- ``css="<url to bootmark.css file>"`` recommended. defaults to ``dist/bootmark.min.css``
- ``toc="<whether to show the side menu>"`` optional. defaults to true.

Examples:
- [document-customtag.html](https://obedm503.github.io/bootmark/examples/document-customtag.html)
- [fetch-customtag.html](https://obedm503.github.io/bootmark/examples/fetch-customtag.html)

### any html element. div recommended.

> this option was added for people who wish to have valid html

Similarly to using the bootmark element, you can use bootmark with any html element through some custom attributes. if used, final html will be inserted here.

**required:**
- ``id="bootmark-md"``
- ``class="bootmark-md"`` the ``bootmark-md`` class add no styling.

valid attributes are:
- ``data-fetch="<url to md file>"`` optional. leave empty to use markdown within the bootmark element
- ``data-mdId="<id refering to element with RAW markdown inside>"`` optional. leave empty to use markdown within the bootmark element
- ``data-theme="<any bootswatch theme>"`` optional. defaults to 'readable'
- ``data-css="<url to bootmark.css file>"`` recommended. defaults to ``dist/bootmark.min.css``
- ``data-toc="<whether to show the side menu>"`` optional. defaults to true.

Examples:
- [document-anytag.html](https://obedm503.github.io/bootmark/examples/document-anytag.html)
- [fetch-anytag.html](https://obedm503.github.io/bootmark/examples/fetch-anytag.html)

### use code

use the bootmark.parse method which takes a config object

config properties are:
	- ``id: '<any id>'`` defaults to ``bootmark-md``. if no fetch url, or mdId are available, bootmark will try to get markdown from inside here. required
	- ``mdId: '<any id>'`` defaults to ``id`` it's available, else ``bootmark-md``. id reference to element containing markdown
	-``css: '<url to bootmark's css file>'`` defaults to ``dist/bootmark.min.css``. recommended
	-``md: <some variable containing markdown to parse>`` someone might find this useful
	-``theme: '<any bootswatch theme>'`` defaults to ``readable``
	-``toc: <whether to show the side menu>`` defaults to ``true``

Examples:
- [document-code.html](https://obedm503.github.io/bootmark/examples/document-code.html)
- [fetch-code.html](https://obedm503.github.io/bootmark/examples/fetch-code.html)

### remember

the  ``bootmark.parse`` method returns a promise which resolves with the parsed html without any of the bootstrap
