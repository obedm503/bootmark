const { concurrent, series, rimraf } = require('nps-utils');

module.exports.scripts = {
  default: series('nps clean', concurrent.nps('serve', 'start')),
  clean: rimraf('.stencil dist'),

  serve: 'http-server ./',
  start: 'stencil build --dev --watch',
  build: {
    default: 'stencil build',
    watch: 'stencil build --watch',
  },
  test: {
    default: 'stencil test --spec --e2e',
    watch: 'stencil test --spec --e2e --watchAll',
  },
  publish: 'npm publish',
  
  docs: {
    default: series.nps('docs.clean', 'docs.build', 'docs.deploy'),
    clean: rimraf('wwww'),
    build: 'node build/docs',
    depluy: 'git-directory-deploy --directory www --branch gh-pages',
  },
};
