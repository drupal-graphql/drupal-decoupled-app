const path = require('path');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;

// Make custom globals available.
global.__INTROSPECTION__ = require(path.resolve(
  process.cwd(),
  'introspection.json'
));
