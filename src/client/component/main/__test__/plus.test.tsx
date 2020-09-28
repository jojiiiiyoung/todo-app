/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Plus from '../list/plus';

describe('<Plus />', () => {
  const setup = (props: any) => {
    const utils = render(<Plus {...props} />);
    const { getByPlaceholderText, getByRole } = utils;
    const input = getByPlaceholderText('추가할 내용을 입력하세요');
    const button = getByRole('button');
    return {
      ...utils,
      input,
      button,
    };
  };

  it('has input and a button', () => {
    const { input, button } = setup({ onAdd: () => {}, disabled: false });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { input } = setup({ onAdd: () => {}, disabled: false });
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });
    expect(input).toHaveAttribute('value', 'test');
  });

  it('calls onAdd and clears input', () => {
    const onAdd = jest.fn();
    const { input, button } = setup({ onAdd, disabled: false });

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    fireEvent.click(button);
    expect(onAdd).toBeCalledWith('test');
    expect(input).toHaveAttribute('value', '');
  });
});
