/* eslint-disable jest/no-disabled-tests */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import TodoList from '../list';

const TODO_LIST = [
  {
    _id: '1',
    content: 'test1',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: '2',
    content: 'test2',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: '3',
    content: 'test3',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

jest.mock('../../../api/todo');

describe('<TodoList />', () => {
  const setup = () => {
    return render(<TodoList />);
  };

  it('renders loading component and paging component', async () => {
    const { container } = setup();

    expect(container.getElementsByClassName('lds-ellipsis').length).toBe(1);
    expect(container.getElementsByClassName('page-item').length).toBeGreaterThanOrEqual(2);
  });

  it.skip('renders list', async () => {
    const { getByText } = setup();
    const context = jest.spyOn(React, 'useContext');

    context.mockImplementationOnce(() => {
      return { data: TODO_LIST, totalCount: TODO_LIST.length };
    });

    expect(getByText('test1')).toBeInTheDocument();
  });
});
