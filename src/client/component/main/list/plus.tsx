import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';

const Plus: React.FunctionComponent = () => (
  <div className="position-relative my-4">
    <button type="button" className="rightside-input align-middle h-100">
      <PlusSquare />
    </button>
    <input type="text" className="form-control pr-5" placeholder="추가할 내용을 입력하세요" />
  </div>
);

export default Plus;
