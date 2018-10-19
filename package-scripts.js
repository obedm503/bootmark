const { concurrent, series, rimraf, copy } = require('nps-utils');

module.exports.scripts = {
  default: series('nps clean', concurrent.nps('serve', 'start')),
  clean: rimraf('.stencil dist'),

  serve: 'http-server ./ --ext html',
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
    default: series.nps('docs.clean', 'docs.build', 'docs.copy'),
    clean: rimraf('www'),
    copy: copy('"docs/*.md" www/'),
    build: 'node build/docs',
    deploy: series(
      'nps docs',
      'git-directory-deploy --directory www --branch gh-pages',
    ),
  },
};
