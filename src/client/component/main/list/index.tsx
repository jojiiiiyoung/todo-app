/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Check2Square, Square } from 'react-bootstrap-icons';
import TodoApi from '../../../api/todo';
import { formatDate } from '../../../utils';
import Pagination from './pagination';
import Plus from './plus';

interface ITodoItemProps {
  data: ITodoItem;
  onComplete: (id: string) => Promise<boolean>;
  onUncomplete: (id: string) => Promise<boolean>;
}

const TodoItem: React.FunctionComponent<ITodoItemProps> = ({
  data: { content, createdAt, ...data },
  onComplete,
  onUncomplete,
}: ITodoItemProps) => {
  const [isComplete, setComplete] = useState<boolean>(data.isComplete);

  const handleComplete = () => {
    setComplete(true);
    onComplete(data._id).then((res) => {
      setComplete(res);
    });
  };

  const handleUncomplete = () => {
    setComplete(false);
    onUncomplete(data._id).then((res) => {
      setComplete(!res);
    });
  };

  return (
    <p>
      {isComplete ? <Check2Square onClick={handleUncomplete} /> : <Square onClick={handleComplete} />}
      <span className="pl-3 task mt-4">{content}</span>
      <span className="float-right">{formatDate(createdAt)}</span>
    </p>
  );
};

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

  const handleComplete = async (id: string) => {
    const res = await TodoApi.completeTodo(id);
    return res.status === 200;
  };

  const handleUnComplete = () => {
    return Promise.resolve(true);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} />
          {list.map((item, index) => (
            <TodoItem data={item} key={index} onComplete={handleComplete} onUncomplete={handleUnComplete} />
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
