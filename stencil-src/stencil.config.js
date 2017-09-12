exports.config = {
  bundles: [
    { components: ['boot-mark'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
