'use strict';

const fp = require('fastify-plugin');
const path = require('path');
const pug = require('pug');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function plugin(fastify, options = {}) {
  const defaults = {
    root: './views',
    propertyName: 'view',
  };
  options = Object.assign(defaults, options);
  const { root, propertyName } = options;
  const basedir = path.resolve('node_modules');

  fastify.register(require('point-of-view'), {
    propertyName: 'pugUnextended',
    engine: { pug },
    root,
    options: {
      basedir,
    },
  });

  function viewFunction(object, request) {
    object = object || this;
    return function view(template, options = {}) {
      options.request = request;
      options.include = function pugDynamicIncludes(template) {
        /* https://stackoverflow.com/a/26525724/2389922
          usage:
          != include('template')
        */
        function renderFile(file) {
          options.basedir = basedir;
          return pug.renderFile(file, options);
        }
        try {
          return renderFile(path.join(root, template + '.pug'));
        } catch (error) {
          return renderFile(path.join(root, template, 'index.pug'));
        }
      };
      return object.pugUnextended(template, options);
    };
  }

  fastify.decorateReply(propertyName, viewFunction());
  fastify.decorate(propertyName, viewFunction());

  function reDecorate(object, request) {
    object[propertyName] = viewFunction(object, request);
  }

  fastify.addHook('onRequest', async (request, reply) => {
    reDecorate(reply, request);
    reDecorate(fastify, request);
  });
}

module.exports = fp(plugin, { name: 'pug-material-design' });
