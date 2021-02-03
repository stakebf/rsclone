import React, {useRef, useMemo} from 'react';
import {StarFilled, CloseOutlined, LoadingOutlined} from '@ant-design/icons';
import {useUpgradeState} from '../../../hooks/';
import MainApiService from '../../../services/MainApiService';
import classes from './panelUserIcon.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  isOpenWindow?: boolean;
}

type PanelUserIconProps = {
  item: IUser;
  adminId: string;
  boardId: string;
  onToggleUserWindow(id: string | undefined, flag: boolean): void;
  onRemoveUserToPanelList(id: string): void;
};

const PanelUserIcon: React.FC<PanelUserIconProps> = ({
  item,
  adminId,
  boardId,
  onToggleUserWindow,
  onRemoveUserToPanelList
}) => {
  const {id, name, login, isOpenWindow} = item;

  const [loadBtnRemove, setLoadBtnRemove] = useUpgradeState(false, true);

  const refWindow: any = useRef(null);
  const refBtnClose: any = useRef(null);

  const api = useMemo(() => new MainApiService(), []);

  const removeUsersData = (userId: string) => {
    setLoadBtnRemove(true);
    api
      .removeAddUsersToBoard(userId, {boardId})
      .then(() => onRemoveUserToPanelList(userId))
      .catch((err) => console.error(err))
      .finally(() => setLoadBtnRemove(false));
  };

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
            <h5 className={classes['login']}>{login}</h5>
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
        {adminId !== id && (
          <button
            className={classes['btn-remove']}
            type="button"
            onClick={() => removeUsersData(id)}
          >
            {loadBtnRemove ? <LoadingOutlined /> : 'Удалить с доски'}
          </button>
        )}
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
      <span className={adminId === id ? classes['fix-admin'] : ''}>
        {name.slice(0, 1).toLocaleUpperCase()}
      </span>
      {adminId === id && (
        <StarFilled className={classes['user-icon__admin']} style={{color: 'rgb(235, 219, 125)'}} />
      )}
      {isOpenWindow ? renderWindow() : null}
    </li>
  );
};

export default PanelUserIcon;
