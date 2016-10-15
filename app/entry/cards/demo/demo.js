import React from 'react';
import { assert } from 'chai';
import cards from 'reactcards';

const Demo = cards('demo');

const Component = ({ message }) => (
  <div>
    <p>{message}</p>
  </div>
);

Demo.card(
  `
    ## markdown doc
    you can use markdown for card documentation
    - foo
    - bar
  `,
  <Component message="Hello world!" />
);

Demo.card(<Component message="Hello world!" />);

const myComponentTests = () =>
  describe('Testing my component', () => {
    it('Suceeding test case', ()  => {
      const wrapper = shallow(<Component message="?!" />);
      assert.equal(wrapper.text(), '?!');
    });

    it('Failing test case', () => {
      const wrapper = shallow(<Component message="?!" />);
      assert.equal(wrapper.text(), '!?');
    });
  });

Demo.test(
  `
    ## markdown doc
    you can also use markdown for test documentation
    - foo
    - bar
  `,
  { myComponentTests },
);
