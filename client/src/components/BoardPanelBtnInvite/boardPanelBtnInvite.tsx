import React, {useState, useRef} from 'react';
import {CloseOutlined} from '@ant-design/icons';

import classes from './boardPanelBtnInvite.module.scss';

type BoardPanelBtnInviteProps = {
  isOpenWindowInvite: boolean;
  setOpenWindowInvite(flag: boolean): void;
  onToggleUserWindow(id: string | undefined, flag: boolean): void;
};

const BoardPanelBtnInvite: React.FC<BoardPanelBtnInviteProps> = ({
  isOpenWindowInvite,
  setOpenWindowInvite,
  onToggleUserWindow
}) => {
  const [email, setEmail] = useState('');
  const refWindow: any = useRef(null);
  const refBtnClose: any = useRef(null);

  const renderWindow = () => {
    return (
      <div className={classes['window']} ref={refWindow}>
        <div className={classes['window__head']}>
          <span className={classes['title']}>Пригласить на доску</span>
          <span className={classes['close']} ref={refBtnClose}>
            <CloseOutlined />
          </span>
        </div>
        <span className={classes['window__divider']}></span>
        <input
          className={classes['window__input']}
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
        />
        <button type="button" className={classes['window__btn']}>
          Отправить приглашение
        </button>
      </div>
    );
  };

  (function closeWindow() {
    document.addEventListener('click', (e: any) => {
      const target = e.target;
      const window = refWindow.current;
      const btnClose = refBtnClose.current;
      if (isOpenWindowInvite && window) {
        const its_window: boolean = target === window || window.contains(target);
        const its_close: boolean = target === btnClose || btnClose.contains(target);
        if ((!its_window && !its_close) || its_close) {
          setOpenWindowInvite(false);
          onToggleUserWindow(undefined, false);
        }
      }
    });
  })();

  return (
    <div className={classes['wrapper-btn']}>
      <button
        type="button"
        className={classes['btn-invite']}
        onClick={(e) => {
          e.stopPropagation();
          setOpenWindowInvite(!isOpenWindowInvite);
          onToggleUserWindow(undefined, false);
        }}
      >
        Пригласить
      </button>
      {isOpenWindowInvite ? renderWindow() : null}
    </div>
  );
};

export default BoardPanelBtnInvite;
