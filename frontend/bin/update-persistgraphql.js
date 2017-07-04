#!/usr/bin/env node

const path = require('path');
const appPath = path.resolve(process.cwd(), 'app');

const fs = require('fs');
const sha = require('jssha');
const ExtractGQL = require('persistgraphql/lib/src/ExtractGQL')
  .ExtractGQL;
const addTypenameTransformer = require('persistgraphql/lib/src/queryTransformers')
  .addTypenameTransformer;
const inputFilePath = appPath;
const outputFilePath = path.resolve(appPath, 'shared', 'queries.json');
const queryTransformers = [addTypenameTransformer];

const extractor = new ExtractGQL({
  queryTransformers,
  inputFilePath,
  outputFilePath,
  inJsCode: true,
  extension: 'js',
});

extractor.processInputPath(extractor.inputFilePath).then(outputMap => {
  extractor
    .writeOutputMap(outputMap, extractor.outputFilePath)
    .then(() => {
      console.log(`Wrote output file to ${extractor.outputFilePath}.`);
    })
    .catch(error => {
      console.log(
        `Unable to process path ${extractor.outputFilePath}. Error message: `
      );
      console.log(error.message);
      process.exit(1);
    })
    .then(() => {
      const output = fs.readFileSync(extractor.outputFilePath).toString();
      const shaObject = new sha('SHA-1', 'TEXT');
      shaObject.update(output);
      const hash = shaObject.getHash('HEX');

      // Move the file to its final destination.
      const finalFilePath = path.resolve(
        appPath,
        'shared',
        'queries',
        `${hash}.json`
      );

      fs.renameSync(extractor.outputFilePath, finalFilePath);

      // Write the api version and query map import.
      const apiFile = path.resolve(appPath, 'shared', 'api.js');
      const apiFileContent = `// @flow

export const apiVersion = '${hash}';

export {
  default as queryMap,
} from 'queries/${hash}.json';
`;

      fs.writeFileSync(apiFile, apiFileContent);
    })
    .catch(error => {
      console.log(`Error while updating environment file. Error message: `);
      console.log(error.message);
      process.exit(1);
    });
});
