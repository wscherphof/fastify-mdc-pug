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

Register the Fastify plugin to enable pug:

```js
fastify.register(require('fastify-mdc-pug/plugin'));
```

Optional options:

- `root`: The root path of your templates folder. The template name or path
  passed to the render function will be resolved relative to this path. Default:
  `./views`.
- `propertyName`: The property that should be used to decorate `reply` and
  `fastify` - E.g. `reply.view()` and `fastify.view()` where `view` is the
  property name. Default: `view`.

When you call `reply.view(<template name> [, options])` from your route, the
`request` object will be passed in the `options`. So in any pug template, the
`request` variable is available to check its `url`, `query`, `params`,
`headers`, etc.

Another addition is a dynamic `include` function, enabling parametrically
including other templates through: `!= include('path/to/template')`.

## Fontend main.js

You'll need a "bundler", e.g. Vite, Snowpack, WebPack, Rollup, or Parcel. It has
to be able to compile `.scss` files using Sass, which is installed as a
[peerDependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies).

Then the following line will suffice to pack all CSS and JavaScript:

```js
import 'fastify-mdc-pug';
```

For an example setup using [Vite](https://vitejs.dev), see
https://github.com/wscherphof/fastify-htmxample.

## Backend views/app.pug

Your `node_modules` directory is set as pug's `basedir`
[option](https://pugjs.org/api/reference.html), so that you can use an absolute
path to include `index.pug`:

```pug
include /fastify-mdc-pug/index
+mdc
  <your-content>
```

Your content should be passed as a block to the `mdc`
[mixin](https://pugjs.org/language/mixins.html), as shown, to ensure any
containing MDC components are properly initialised in JavaScript.

## Render Material Design Components

The https://www.npmjs.com/package/mdc-pug package provides the mixins to render
MDC components from your templates. Its documentation pages are running here:
https://mdc-pug.vercel.app/.

Example:

```pug
+mdc-typography('Hello World')
+mdc-button('Click Me')(raised)
```
