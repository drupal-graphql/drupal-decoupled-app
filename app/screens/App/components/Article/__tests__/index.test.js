import React from 'react';
import Article from 'Article';
import { shallow } from 'enzyme';

describe('article component', () => {
  it('renders as expected', () => {
    const component = shallow(
      <Article title="Lorem ipsum" body="Dolor sit amet" id="1" />
    );

    expect(component.html()).toMatchSnapshot();
  });

  it('changes color on click', () => {
    const component = shallow(
      <Article title="Lorem ipsum" body="Dolor sit amet" id="1" />
    );

    expect(component).to.have.style('background-color', 'inherit');

    const button = component.find('button');
    button.simulate('click');

    expect(component).to.not.have.style('background-color', 'inherit');
  });
});
