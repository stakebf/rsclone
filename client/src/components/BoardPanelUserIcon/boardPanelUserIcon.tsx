import React, {useRef} from 'react';
import {CrownOutlined, CloseOutlined} from '@ant-design/icons';

import classes from './boardPanelUserIcon.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  img: string;
  isOpenWindow: boolean;
}

type BoardPanelUserIconProps = {
  item: IUser;
  adminId: string;
  onToggleUserWindow(id: string | undefined, flag: boolean): void;
};

const BoardPanelUserIcon: React.FC<BoardPanelUserIconProps> = ({
  item,
  adminId,
  onToggleUserWindow
}) => {
  const {id, name, login, img, isOpenWindow} = item;

  const refWindow: any = useRef(null);
  const refBtnClose: any = useRef(null);

  const createWindow = () => {
    return (
      <div className={classes['window']} ref={refWindow}>
        <div className={classes['content']}>
          <img className={classes['content__icon']} src={img} alt="user-icon" />
          <div className={classes['content__info']}>
            <h4 className={classes['name']}>{name}</h4>
            <h5 className={classes['login']}>@{login}</h5>
          </div>
        </div>
        <span
          className={classes['close']}
          onClick={() => onToggleUserWindow(id, false)}
          ref={refBtnClose}
        >
          <CloseOutlined />
        </span>
      </div>
    );
  };

  (function closeWindow() {
    document.addEventListener('click', (e: any) => {
      const target = e.target;
      const window = refWindow.current;
      const btnClose = refBtnClose.current;
      if (isOpenWindow && window) {
        const its_window: boolean = target === window || window.contains(target);
        const its_close: boolean = target === btnClose || btnClose.contains(target);
        if (!its_window && !its_close && isOpenWindow) onToggleUserWindow(id, false);
      }
    });
  })();

  return (
    <li key={id} className={classes['wrapper-icon']}>
      <div
        className={classes.user}
        onClick={(e) => {
          e.stopPropagation();
          onToggleUserWindow(id, !isOpenWindow);
        }}
      >
        <img className={classes['user__img']} src={img} alt="user" />
        {adminId === id && (
          <CrownOutlined className={classes['user__admin-icon']} twoToneColor="#fff" />
        )}
      </div>
      {isOpenWindow ? createWindow() : null}
    </li>
  );
};

export default BoardPanelUserIcon;
