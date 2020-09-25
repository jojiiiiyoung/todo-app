import React from 'react';

const Pagination: React.FunctionComponent = () => (
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <button className="page-link" type="button">
        Previous
      </button>
    </li>
    <li className="page-item">
      <button className="page-link" type="button">
        1
      </button>
    </li>
    <li className="page-item">
      <button className="page-link" type="button">
        2
      </button>
    </li>
    <li className="page-item">
      <button className="page-link" type="button">
        3
      </button>
    </li>
    <li className="page-item">
      <button className="page-link" type="button">
        Next
      </button>
    </li>
  </ul>
);

export default Pagination;
