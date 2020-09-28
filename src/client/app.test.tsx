import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './app';

describe('renders correctly <App />', () => {
  let wrapper: RenderResult;

  beforeAll(() => {
    wrapper = render(<App />);
  });

  it('renders main container', () => {
    const pageElement = wrapper.getByTestId('mainContainer');
    expect(pageElement).toBeInTheDocument();
  });
});
