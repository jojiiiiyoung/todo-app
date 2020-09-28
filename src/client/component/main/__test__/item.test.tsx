/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoItem from '../list/item';

describe('<TodoItem />', () => {
  const sampleTodo: ITodoItemWithPage = {
    _id: '1',
    content: 'test',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    page: 0,
  };

  const setup = (props: any = {}) => {
    const initialProps = { data: sampleTodo };
    const utils = render(<TodoItem {...initialProps} {...props} />);
    const { getByText, getByTestId } = utils;
    const todo = props.data || initialProps.data;
    const content = getByText(todo.content);
    const editButton = getByTestId('editButton');
    const deleteButton = getByTestId('deleteButton');
    return {
      ...utils,
      content,
      editButton,
      deleteButton,
    };
  };

  it('has content and buttons', () => {
    const { content, editButton, deleteButton } = setup();

    expect(content).toBeTruthy();
    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('has input when edit button clicked', () => {
    const { editButton, getByDisplayValue, getByText } = setup();

    fireEvent.click(editButton);

    expect(getByDisplayValue(sampleTodo.content)).toBeTruthy();
    expect(getByText('수정')).toBeTruthy();
  });

  it('calls onComplete', () => {
    const onComplete = jest.fn();
    const { getByTestId } = setup({ onComplete });
    const span = getByTestId('toggleButton');
    fireEvent.click(span);
    expect(onComplete).toBeCalledWith(sampleTodo._id);
  });

  it('calls onDelete', () => {
    const onDelete = jest.fn();
    const { deleteButton } = setup({ onDelete });
    fireEvent.click(deleteButton);
    expect(onDelete).toBeCalledWith(sampleTodo._id);
  });
});
