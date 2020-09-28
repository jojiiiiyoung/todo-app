import React, { useState } from 'react';
import { PlusSquare } from 'react-bootstrap-icons';

interface IProps {
  onAdd: (content: string) => void;
}

const Plus: React.FunctionComponent<IProps> = ({ onAdd }: IProps) => {
  const [content, setContent] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.currentTarget.value);
  };

  const handleAdd = () => {
    onAdd(content);
    setContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="position-relative my-4">
      <button type="button" className="rightside align-middle h-100" onClick={handleAdd}>
        <PlusSquare />
      </button>
      <input
        type="text"
        className="form-control pr-5"
        placeholder="추가할 내용을 입력하세요"
        value={content}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Plus;
