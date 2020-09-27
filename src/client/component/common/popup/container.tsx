import React from 'react';

const PopupContainer = ({
  title,
  children,
  onClose,
}: {
  title: string | undefined;
  children: React.ReactNode | React.ReactNode[];
  onClose: (() => void) | undefined;
}) => (
  <>
    <div className="dimmed-layer" onClick={onClose} />
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">
            {title || ''}
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </>
);

export default PopupContainer;
