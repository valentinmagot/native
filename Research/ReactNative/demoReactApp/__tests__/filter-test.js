import React from 'react';
import Filter from '../src/filter';

import renderer from 'react-test-renderer';

//This test will not pass because of Ionicons
test('filter renders correctly', () => {
  const tree = renderer.create(<Filter />).toJSON();
  expect(tree).toMatchSnapshot();
});