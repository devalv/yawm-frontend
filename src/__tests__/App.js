import * as React from 'react';
import renderer from 'react-test-renderer';

import App from '../components/App';

it('check that index page can be rendered', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
