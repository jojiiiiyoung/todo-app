import React from 'react';
import './styles.css';

const Loading = () => (
  <div className="text-center">
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
