# rgl-tplmin-loader

[![version](https://img.shields.io/npm/v/rgl-tplmin-loader.svg "version")](https://www.npmjs.com/package/rgl-tplmin-loader)&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/Froguard/rgl-tplmin-loader.svg)](https://github.com/Froguard/rgl-tplmin-loader/issues?q=is%3Aopen+is%3Aissue)&nbsp;
[![Github licences](https://img.shields.io/github/license/Froguard/rgl-tplmin-loader.svg)](https://github.com/Froguard/rgl-tplmin-loader/blob/master/LICENSE)


- A webpack loader for [regularjs](https://github.com/regularjs/regular) 's component-template file.

- **Neither** &lt;script&gt; **nor** &lt;style&gt; will be resolved or parsed or minified in this loader

- Just **only** minify the tpl file's content-text in a simple way, remove redundant code(the special chars like space, enter between tags).

- **no parse, no render**. It is **different** from [regular-loader](https://www.npmjs.com/package/regular-loader) , just string convert


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

> with happypack

```js
module.exports = {
  module: {
	rules: [
	  {
		test: /\.rgl$/, // or /\.html$/
		use: 'happypack/loader?id=rglmin'
	  }
	]
  }
},
plugins: [
	new HappyPack({
		id: 'rglmin',
		threadPool: happyThreadPool,
		loaders: ['rgl-tplmin-loader?' + JSON.stringify({
			minimize: true,
			comments: {
				html: false,
				rgl: false
			}
		})]
	})
]
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
