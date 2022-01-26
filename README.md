# fastify-mdc-pug

A [Fastify](https://www.fastify.io) plugin to render [Material Design
Components](https://github.com/material-components/material-components-web) with
the [pug](https://pugjs.org) template engine.

This is a wrapper around the [mdc-pug](https://www.npmjs.com/package/mdc-pug)
package.

## Install

```shell
npm install fastify-mdc-pug
```

## Backend app.js

```js
fastify.register(require('fastify-mdc-pug/plugin'));
```

## Fontend main.js

You'll need a "bundler", e.g. Vite, Snowpack, WebPack, Rollup, or Parcel. It has
to be able to compile `.scss` files using Sass.

```js
import 'fastify-mdc-pug';
```

## Backend views/app.pug

```pug
include /fastify-mdc-pug/index
+mdc
  <your-content>
```

## Render Material Design Components

See https://www.npmjs.com/package/mdc-pug.

Example:

```pug
+mdc-typography('Hello World')
+mdc-button('Click Me')(raised)
```
