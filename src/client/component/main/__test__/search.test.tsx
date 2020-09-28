import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../search';

describe('<Search />', () => {
  const setup = () => {
    const utils = render(<Search />);
    const { getByRole, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('검색');
    const button = getByRole('button');
    return {
      ...utils,
      input,
      button,
    };
  };

  it('has input and a button', () => {
    const { input, button } = setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });
    expect(input).toHaveAttribute('value', 'test');
  });

  it('keeps input value', () => {
    const { input, button } = setup();

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    fireEvent.click(button);
    expect(input).toHaveAttribute('value', 'test');
  });
});
