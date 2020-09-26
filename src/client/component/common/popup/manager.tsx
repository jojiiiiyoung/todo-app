import React from 'react';
import { getHash } from '../../../utils';

export interface IBindFunction {
  open: (content: (callback: IPopupProps) => React.ReactNode) => { id: string };
  close: (id: string) => void;
  closeAll: () => void;
}

export interface IPopupOptions {
  onClose?: () => void;
}

interface IPopup extends IPopupOptions {
  content: (callback: IPopupProps) => React.ReactNode;
  id: string;
  onRequestRemove: () => void;
}

interface IProps {
  bind: (params: IBindFunction) => void;
}

interface IState {
  popup: IPopup[];
}

class PopupManager extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { popup: [] };
  }

  componentDidMount() {
    const { bind } = this.props;
    bind({ open: this.open, close: this.close, closeAll: this.closeAll });
  }

  private addClassToBody = () => {
    const container = document.getElementById('popup-container');
    if (!document.body.classList.contains('modal-oepn')) {
      document.body.classList.add('modal-open');
      if (container) {
        container.classList.add('popup-wrapper');
      }
    }
  };

  private removeClassFromBody = () => {
    const container = document.getElementById('popup-container');
    document.body.classList.remove('modal-open');

    if (container) {
      container.classList.remove('popup-wrapper');
    }
  };

  private open = (content: (callback: IPopupProps) => React.ReactNode) => {
    const id = getHash();

    this.setState((prev) => {
      if (prev.popup.length === 0) {
        this.addClassToBody();
      }

      return {
        popup: [
          ...prev.popup,
          {
            id,
            content,
            onRequestRemove: () => this.close(id),
          },
        ],
      };
    });

    return { id };
  };

  private closeAll = () => {
    const { popup } = this.state;

    if (popup.length === 0) {
      return;
    }

    popup.forEach((p) => {
      if (p.onClose) {
        p.onClose();
      }
    });
    this.setState({ popup: [] });
    this.removeClassFromBody();
  };

  private close = (id: string) => {
    const { popup } = this.state;
    const p = popup.find((pop: IPopup) => pop.id === id);

    if (p && p.onClose) {
      p.onClose();
    }

    this.setState((prev) => {
      if (prev.popup.length === 1) {
        this.removeClassFromBody();
      }

      return { popup: prev.popup.filter((pop: IPopup) => pop.id !== id) };
    });
  };

  render() {
    const { popup } = this.state;
    return (
      <div id="popup-container">
        {popup.map((p: IPopup) => {
          return <React.Fragment key={p.id}>{p.content({ id: p.id, onClose: p.onRequestRemove })}</React.Fragment>;
        })}
      </div>
    );
  }
}

export default PopupManager;
