/* eslint-disable consistent-this */
/* eslint-disable no-extend-native */
/**
 * @flow
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const argv = require('yargs-parser')(process.argv.slice(2));
// $FlowFixMe
String.prototype.format = function () {
  let a = this;
  for (const k in arguments) {
    // $FlowFixMe
    a = a.replace(`{${k}}`.toRegex('g'), arguments[k]);
  }
  return a;
};
// $FlowFixMe
String.prototype.toRegex = function (option = 'i') {
  let regexStr = this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  regexStr = regexStr.replace(/\s/g, '\\s?');
  // console.log('regex: {0}'.format(regexStr))
  return new RegExp(regexStr, option);
};
const getFileName = file => {
  const fileNameMatch = file.match(/^(.+)\.[^.]+$/);
  return fileNameMatch && fileNameMatch[1].replace(/[\s-+]+/g, '_');
};

// console.log(argv)
const folder = argv.folder || argv.d || argv._[0];
console.log('folder: ', folder);
const match = folder.match(/^(.+\/([^/]+))\/?$/);
// $FlowFixMe
let output = match && '{0}/{1}.tsx'.format(match[1], match[2]);
output = argv.output || argv.o || output;
// Default file extension is tsx, but file not contain view tag therefore use the ts extension
output = output.replace('tsx', 'ts');
const outputMatch = output.match(/^(?:(.*)\/)?([^/]+)$/);
// console.log('outputMatch', outputMatch)
const outputName = outputMatch[2];
const outputPath = outputMatch[1] || '.';
console.log(`${chalk.green('Output: ')}`, outputPath);
const requirePath = path.relative(outputPath, folder);
console.log('requirePath: ', requirePath);
// console.log('requirePath', requirePath)
const author = argv.author || argv.a || 'GNURT';
const template = `/**
 * @author {2}
 * @flow
 */

const {0} = {
{1}
};
export default {0};\n`;

const moduleName = argv.name || getFileName(outputName);
console.log('moduleName', moduleName);
fs.readdir(folder, (err, files) => {
  if (err) {
    return console.error(err);
  }
  const strCodes = [];
  files.forEach(file => {
    if (file.match(/@\dx\.(png|jpg)/)) {
      return;
    }
    const fileName = getFileName(file);

    if (fileName) {
      // $FlowFixMe
      if (moduleName === 'fonts') {
        file = file.substring(0, file.lastIndexOf('.'));
        strCodes.push("  {0}: '{2}',".format(fileName, requirePath, file));
      } else {
        strCodes.push(
          "  {0}: require('{1}/{2}'),".format(fileName, requirePath, file),
        );
      }
      // console.log(strCode)
    }
  });
  // $FlowFixMe
  const code = template.format(moduleName, strCodes.join('\n'), author);
  console.log(code);
  fs.writeFileSync(output, code);
});
