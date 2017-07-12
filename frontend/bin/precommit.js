#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const appPath = path.resolve(process.cwd(), 'app');

const add = file =>
  childProcess.spawnSync('git', ['add', file], {
    cwd: path.resolve(process.cwd(), '..'),
  });

const exitOnError = (output) => {
  if (output.error) {
    console.error(output.error);
    process.exit(1);
  }
};

console.log('Generating introspection file.');
exitOnError(childProcess.spawnSync('yarn', ['run', 'introspect']));

console.log('Generating query map.');
exitOnError(childProcess.spawnSync('yarn', ['run', 'persist']));

// Read the version from the api config file.
const apiFile = path.resolve(appPath, 'shared', 'api.js');
const apiVersion = fs
  .readFileSync(apiFile)
  .toString()
  .match(/apiVersion\s=\s'(.*)'/)[1];

const introspectionFile = path.join(appPath, 'shared', 'introspection.json');
const queryMapFile = path.join(appPath, 'shared', 'queries', `${apiVersion}.json`);

// Commit the api file and the corresponding query map.
add(apiFile);
add(queryMapFile);
add(introspectionFile);
