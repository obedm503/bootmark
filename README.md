[![Checkout the Waffle.io](https://badge.waffle.io/obedm503/bootmark.png?label=ready&title=Ready)](https://waffle.io/obedm503/bootmark)

![compatibility](http://forthebadge.com/images/badges/compatibility-club-penguin.svg)

![as seen on tv](http://forthebadge.com/images/badges/as-seen-on-tv.svg)

![version: 0.8.0](https://img.shields.io/badge/version-0.8.0-blue.svg?style=flat-square)

## bootmark

> easy markdown + bootstrap

### npm install
```
$ npm install --save bootmark
```

### bower install
```
$ bower install bootmark
```
This project was inspired by [strapdown](https://github.com/arturadib/strapdown/). Since strapdown hasn't been active for a while, I decided to take a stab at it.

see the [docs here](https://obedm503.github.io/bootmark/docs/) and the [examples here](https://obedm503.github.io/bootmark/docs/examples.html)

changelog [here](http://obedm503.github.io/bootmark/index.html?src=CHANGELOG.md)

some features:
- adds easy latex math support thru the [katex-latex](https://obedm503.github.io/katex-latex/) extension
- external files
- all bootswatch themes (bootstrap 3)
- optional automatic table of content
- showdown parser (vanilla markdown)
- custom templates
- in active development

in the [demo](https://obedm503.github.io/bootmark/) you can:
- try a different theme by adding to the url:
  - `?theme=<any bootswatch theme>`
  - [bootswatch](https://bootswatch.com)
  - default theme for the demo is `paper`
- try with a different markdown file by adding to the url:
  - showdown's readme `?src=https://raw.githubusercontent.com/showdownjs/showdown/master/README.md`
  - bootstrap's readme `?src=https://raw.githubusercontent.com/twbs/bootstrap/master/README.md`
- try joining markdown files
	- `?src=docs/example-chapters/1.md docs/example-chapters/2.md`
- define a join string when using multiple files
	- `?join=any markdown string`
- try without a table of contents by adding to the url:
  - `?toc=false`
- limit which headers are used for the toc
  - `?tocLimit=2`
- change the default code formatting theme
  - `?prettifyTheme=github`
