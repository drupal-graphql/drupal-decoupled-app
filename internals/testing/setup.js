require('babel-polyfill');

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

// Jest uses Jasmine by default which comes with its own
// assertion library.
const jasmineExpect = global.expect;

// Our tests already use Chai due to our previous setup
// with Mocha.
global.expect = (actual) => {
  const jasmineMatchers = jasmineExpect(actual);

  // Chai uses 'to' as the main entry point when using
  // expect(). Hence we extend the Jasmine matchers with
  // a 'to' matcher that points to Chai.
  return Object.assign(jasmineMatchers, {
    to: chai.expect(actual),
  });
};
