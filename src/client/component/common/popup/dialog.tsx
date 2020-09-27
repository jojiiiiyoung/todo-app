import React from 'react';
import PopupHelper from '../../../utils/popupHelper';
import PopupContainer from './container';

interface IProps {
  title: string | undefined;
  content: string;
}

const Dialog = ({ title, content, onClose }: IProps & { onClose: () => void }) => {
  return (
    <PopupContainer title={title} onClose={onClose}>
      {content}
      <div className="d-flex justify-content-end">
        <button type="button" onClick={onClose}>
          확인
        </button>
      </div>
    </PopupContainer>
  );
};

const openDialog = ({ title, content }: IProps) =>
  PopupHelper.open(({ onClose }: IPopupProps) => <Dialog onClose={onClose} title={title} content={content} />);

export default openDialog;
