const livereload = require('livereload');
const chalk = require('chalk');

exports.LIVERELOAD_SCRIPT = `
  <script>
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>')
  </script>
`;

exports.startLiveReload = function(options = {}, valide) {
  const config = {
    exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'ico', 'yaml', 'yml', 'json', 'md']
  };
  if (options.liveReloadPort) {
    config.port = options.liveReloadPort;
  }
  const lrserver = livereload.createServer(config);

  lrserver.watch(['web', options.basedir || 'spec']);

  // monkey-patch Live-Reload refresh to log update events
  const origRefresh = lrserver.__proto__.refresh;
  lrserver.__proto__.refresh = function(filePath) {
    console.log('Updated ' + chalk.blue(filePath) + ' refreshing');
    valide();
    origRefresh.call(this, filePath);
  };
};
