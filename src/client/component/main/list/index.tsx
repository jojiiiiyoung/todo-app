import React from 'react';
import { Check2Square, Square } from 'react-bootstrap-icons';
import { formatDate } from '../../../utils';
import Pagination from './pagination';
import Plus from './plus';

const MOCK_TODO_LIST: ITodoItem[] = [
  {
    id: 1,
    isComplete: false,
    createdAt: Date.now(),
    contents: 'task1',
  },
  {
    id: 2,
    isComplete: false,
    createdAt: Date.now(),
    contents: 'task2',
  },
  {
    id: 3,
    isComplete: true,
    createdAt: Date.now(),
    contents: 'task3',
  },
];

const TodoItem: React.FunctionComponent<{ data: ITodoItem }> = ({
  data: { isComplete, contents, createdAt },
}: {
  data: ITodoItem;
}) => (
  <p>
    {isComplete ? <Check2Square /> : <Square />}
    <span className="pl-3 task mt-4">{contents}</span>
    <span className="float-right">{formatDate(createdAt)}</span>
  </p>
);

const List: React.FunctionComponent = () => (
  <>
    <div className="card">
      <div className="card-body">
        <Plus />
        {MOCK_TODO_LIST.map((item) => (
          <TodoItem data={item} key={item.id} />
        ))}
      </div>
    </div>
    <div className="mt-3">
      <Pagination />
    </div>
  </>
);

export default List;
