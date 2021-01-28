import React, {useRef} from 'react';
import {StarFilled, CloseOutlined} from '@ant-design/icons';

import classes from './boardPanelUserIcon.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
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
  const {id, name, login, isOpenWindow} = item;

  const refWindow: any = useRef(null);
  const refBtnClose: any = useRef(null);

  const renderWindow = () => {
    return (
      <div className={classes['window']} ref={refWindow}>
        <div className={classes['content']}>
          <span className={classes['content__icon']}>
            {name.slice(0, 1).toLocaleUpperCase()}
            {adminId === id && <StarFilled className={classes['admin']} />}
          </span>
          <div className={classes['content__info']}>
            <h4 className={classes['name']}>{name}</h4>
            <h5 className={classes['login']}>@{login}</h5>
          </div>
        </div>
        <span
          className={classes['close']}
          ref={refBtnClose}
          onClick={(e) => {
            e.stopPropagation();
            onToggleUserWindow(id, false);
          }}
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
        if (!its_window && !its_close) onToggleUserWindow(id, false);
      }
    });
  })();

  return (
    <li
      key={id}
      className={classes['user-icon']}
      onClick={(e) => {
        e.stopPropagation();
        onToggleUserWindow(id, true);
      }}
    >
      {name.slice(0, 1).toLocaleUpperCase()}
      {adminId === id && <StarFilled className={classes['user-icon__admin']} twoToneColor="#fff" />}
      {isOpenWindow ? renderWindow() : null}
    </li>
  );
};

export default BoardPanelUserIcon;
