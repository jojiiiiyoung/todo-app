import React, { useState } from 'react';
import { Check2Square, PencilFill, PlusCircle, Square } from 'react-bootstrap-icons';
import { formatDate } from '../../../utils';
import openRelatedPopup from '../relatedPopup';

interface IProps {
  data: ITodoItem;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

const EditInput = ({ content: origin, onEdit }: { content: string; onEdit: (content: string) => void }) => {
  const [content, setContent] = useState<string>(origin);

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const edit = () => {
    onEdit(content);
  };

  return (
    <>
      <input type="text" className="px-3 py-1" value={content} onChange={handleChnage} />
      <button className="btn btn-outline-secondary mr-2" type="button" onClick={edit}>
        수정
      </button>
    </>
  );
};

const TodoItem: React.FunctionComponent<IProps> = ({ data, onComplete, onUncomplete, onEdit }: IProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const handleComplete = () => {
    onComplete(data._id);
  };

  const handleUncomplete = () => {
    onUncomplete(data._id);
  };

  const handleEdit = (content: string) => {
    setEdit(false);
    onEdit(data._id, content);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        {data.isComplete ? (
          <Check2Square className="pr-2" onClick={handleUncomplete} />
        ) : (
          <Square className="pr-2" onClick={handleComplete} />
        )}
        {edit ? (
          <EditInput content={data.content} onEdit={handleEdit} />
        ) : (
          <span className="flex-fill">{data.content}</span>
        )}
        <span>
          <span className="mr-2">{formatDate(data.createdAt)}</span>
          <PencilFill onClick={() => setEdit(true)} />
        </span>
      </div>
      <div className="my-2">
        연관 리스트:{' '}
        {data.related.map((item) => (
          <span className="mr-2" key={item._id}>
            {item.content}
          </span>
        ))}
        <PlusCircle className="mr-2" onClick={() => openRelatedPopup(data)} />
      </div>
    </div>
  );
};

export default TodoItem;
