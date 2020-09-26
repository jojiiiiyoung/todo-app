/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Check2Square, Square } from 'react-bootstrap-icons';
import TodoApi from '../../../api/todo';
import { formatDate } from '../../../utils';
import Pagination from './pagination';
import Plus from './plus';

const TodoItem: React.FunctionComponent<{ data: ITodoItem }> = ({
  data: { isComplete, content, createdAt },
}: {
  data: ITodoItem;
}) => (
  <p>
    {isComplete ? <Check2Square /> : <Square />}
    <span className="pl-3 task mt-4">{content}</span>
    <span className="float-right">{formatDate(createdAt)}</span>
  </p>
);

const List: React.FunctionComponent = () => {
  const [list, setList] = useState<ITodoItem[]>([]);

  useEffect(() => {
    TodoApi.getTodos().then((res) => {
      setList(res.data || []);
    });
  }, []);

  const handleAdd = (content: string) => {
    TodoApi.addTodo(content).then((res) => {
      setList([...list, res.data]);
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} />
          {list.map((item, index) => (
            <TodoItem data={item} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <Pagination />
      </div>
    </>
  );
};

export default List;
