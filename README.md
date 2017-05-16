
- A webpack loader for [regularjs](https://github.com/regularjs/regular)'s component-template file
- **Neither <script> nor <style> will be resolved or parsed or minified in this loader**
- Just only minify the tpl file's content-text in a simple way, remove redundant code(the special chars like space, enter between tags).
- **no parse, no render**.(It is **different** from [regular-loader](https://www.npmjs.com/package/regular-loader) ), just string convert

## Installation

```bash
npm install --save-dev rgl-tplmin-loader
```

## Usage

Use the loader either via your webpack config

### Via webpack config (recommended)

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.rgl$/, // or /\.html$/
        use: 'rgl-tplmin-loader'
      }
    ]
  }
}
```

**In your application**

```js
import rgl from 'file.rgl';
```

### CLI

```bash
webpack --module-bind 'rgl=rgl-tplmin'
```

**In your application**

```js
import rgl from 'file.rgl';
```

### Inline

**In your application**

```js
import template from 'rgl-tplmin!./file.rgl';
```
