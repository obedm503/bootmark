[![Checkout the Waffle.io](https://badge.waffle.io/obedm503/bootmark.png?label=ready&title=Ready)](https://waffle.io/obedm503/bootmark)

![compatibility](http://forthebadge.com/images/badges/compatibility-club-penguin.svg)

![as seen on tv](http://forthebadge.com/images/badges/as-seen-on-tv.svg)

> markdown without worries

### [See some EXAMPLES](https://obedm503.github.io/bootmark/docs/examples.html)

### [Read the DOCS](https://obedm503.github.io/bootmark/docs/)

### [Read the CHANGELOG](http://obedm503.github.io/bootmark/index.html?src=CHANGELOG.md)

This project was inspired by [strapdown](https://github.com/arturadib/strapdown/). Since strapdown hasn't been active for a while, I decided to take a stab at it.

some features:
- adds easy latex math support thru the [katex-latex](https://obedm503.github.io/katex-latex/) extension
- external files
- all bootswatch themes (bootstrap 3)
- optional automatic table of content
- showdown parser (vanilla markdown)
- custom templates
- in active development

## installation

### yarn install

```shell
yarn add bootmark
```

### npm install
```shell
npm install --save bootmark
```

### bower install
```shell
bower install bootmark
```

## development

make sure you have git and nodejs installed and set up

### download

first clone the repo, cd into it, and checkout the development branch
```shell
git clone https://github.com/obedm503/bootmark.git && cd bootmark && git checkout development
```
----
### install dependencies

for this I recommend you use yarn because it's faster, but you could also use npm

using yarn:
```shell
yarn install
```
----
### npm scripts

> Note: bootmark used to depend on gulp for task running but now simply uses npm scripts.

- `docs` - scans the source file and outputs documentation to `docs/DOCS.md`
    ```shell
    npm run docs
    ```

- `build:js` - uglifies the source javascript file and generates source maps
    ```shell
    npm run build:js
    ```

- `build:css` - compiles the source `.scss` file to `.css` and generates source maps
    ```shell
    npm run build:css
    ```

- `build` - runs `build:js` and `build:css`
    ```shell
    npm run build
    ```

- `build:watch` - starts development server on `localhost:8080` and runs `build` on file changes in `src/`
    ```shell
    npm run build:watch
    ```

- `bundle` - complies Sass, uglifies source js and concatenates all javascript
files to create the bundle file. the bundle file includes: es6-promise polyfill,
whatwg-fetch polyfill, jQuery, Bootstrap, Showdown, google-code-prettify, the
showdown-prettify extension, and bootmark itself **in that order**
    ```shell
    npm run bundle
    ```

- `bundle:watch` - starts development server on `localhost:8080` and runs `bundle` on file changes in `src/`
    ```shell
    npm run bundle:watch
    ```

- `publish` - generates docs, cleans `dist/` and processes source files
    ```shell
    npm run publish
    ```

- `lint` - lint source js file with ESLint with the style rules in `.eslintrc.json`

    ```shell
    npm run lint
    ```
