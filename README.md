[![Checkout the Waffle.io](https://badge.waffle.io/obedm503/bootmark.png?label=ready&title=Ready)](https://waffle.io/obedm503/bootmark)

![compatibility](http://forthebadge.com/images/badges/compatibility-club-penguin.svg)

![as seen on tv](http://forthebadge.com/images/badges/as-seen-on-tv.svg)

![version: 0.8.0](https://img.shields.io/badge/version-0.8.0-blue.svg?style=flat-square)

> easy markdown + bootstrap

## installation

### yarn install

```
yarn add bootmark
```

### npm install
```
npm install --save bootmark
```

### bower install
```
bower install bootmark
```
This project was inspired by [strapdown](https://github.com/arturadib/strapdown/). Since strapdown hasn't been active for a while, I decided to take a stab at it.

some features:
- adds easy latex math support thru the [katex-latex](https://obedm503.github.io/katex-latex/) extension
- external files
- all bootswatch themes (bootstrap 3)
- optional automatic table of content
- showdown parser (vanilla markdown)
- custom templates
- in active development

### [See some EXAMPLES](https://obedm503.github.io/bootmark/docs/examples.html)

### [Read the DOCS](https://obedm503.github.io/bootmark/docs/)

### [Read the CHANGELOG](http://obedm503.github.io/bootmark/index.html?src=CHANGELOG.md)

## Development

make sure you have git and nodejs installed and set up

> Note: bootmark used to depend on gulp for task running but now simply uses npm scripts.

### download

first clone the repo, cd into it, and checkout the development branch
```
git clone https://github.com/obedm503/bootmark.git && cd bootmark && git checkout development
```
----
### install dependencies

for this I recommend you use yarn because it's faster, but you could also use npm

using yarn:
```
yarn install
```
OR using npm:
```
npm install
```
----
### npm scripts

- `serve` - starts development server on `localhost:8080` serving the current folder
    ```
    npm run serve
    ```

- `docs` - scans the source file and outputs documentation to `docs/DOCS.md`
    ```
    npm run docs
    ```

- `build:js` - uglifies the source javascript file and generates source maps
    ```
    npm run build:js
    ```

- `build:css` - compiles the source `.scss` file to `.css` and generates source maps
    ```
    npm run build:css
    ```

- `build` - creates `dist/` directory and runs `build:js` and `build:css`
    ```
    npm run build
    ```

- `uglify-fetch` - uglifies the fetch polyfill because github doesn't already
provide a `.min.js` file
    ```
    npm run uglify-fetch
    ```

- `bundle` - runs `build` and `uglify-fetch` and concatenates all javascript
files to create the bundle file. the bundle file includes: es6-promise polyfill,
whatwg-fetch polyfill, jQuery, Bootstrap, Showdown, google-code-prettify, the
showdown-prettify extension, and bootmark itself **in that order**

    ```
    npm run bundle
    ```
