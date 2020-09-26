import React from 'react';
import { IBindFunction } from '../component/common/popup/manager';

class PopupHelper {
  private static createPopup?: (content: (callback: IPopupProps) => React.ReactNode) => { id: string };

  private static closePopup?: (id: string) => void;

  private static closeAllPopup?: () => void;

  public static popupLength = 0;

  public static bind = ({ open, close, closeAll }: IBindFunction) => {
    PopupHelper.createPopup = open;
    PopupHelper.closePopup = close;
    PopupHelper.closeAllPopup = closeAll;
  };

  public static open = (content: (callback: IPopupProps) => React.ReactNode): { id: string } | undefined => {
    if (PopupHelper.createPopup) {
      return PopupHelper.createPopup(content);
    }

    return undefined;
  };

  public static close = (id: string) => {
    if (PopupHelper.closePopup) {
      PopupHelper.closePopup(id);
    }
  };

  public static closeAll = () => {
    if (PopupHelper.closeAllPopup) {
      PopupHelper.closeAllPopup();
    }
  };
}

export default PopupHelper;
