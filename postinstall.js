const pkg = require('./package.json');

const version = parseFloat(process.version.substr(1));
const minimum = parseFloat(pkg.engines.node.match(/\d+/g).join('.'));

module.exports = function () {
  const openCollective = `Modified version from appyvet repo`;
  process.stdout.write(openCollective);
  if (version >= minimum) {
    process.exit(0);
  }

  const errorMessage = `
    ⚠️  parse-server requires at least node@${minimum}!
    You have node@${version}

  `;

  process.stdout.write(errorMessage);
  process.exit(1);
};
