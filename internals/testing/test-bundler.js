import 'babel-polyfill';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

global.expect = chai.expect;
global.should = chai.should();

// Include all .js files under `app`, except index.js in `app/entry/client` and
// `app/entry/server`. This is for isparta code coverage.
const context = require.context('../../app', true, /^((?!entry\/).)*\.js$/);
context.keys().forEach(context);
