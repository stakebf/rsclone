import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import BoardPanelUserIcon from '../BoardPanelUserIcon';
import BoardPanelBtnInvite from '../BoardPanelBtnInvite';
import {StarOutlined, StarFilled} from '@ant-design/icons';
import MainApiService from '../../services/MainApiService';

import classes from './boardPanel.module.scss';
interface IUser {
  id: string;
  name: string;
  login: string;
  isOpenWindow?: boolean;
}

const BoardPanel: React.FC = () => {
  const [dataBoard, setDataBoard]: any = useState({});
  const [title, setTitle] = useState('');
  const [isOpenWindowInvite, setOpenWindowInvite] = useState(false);
  const [currentWidthTitle, setCurrentWidthTitle] = useState(0);
  const [focusWidthTitle, setFocusWidthTitle] = useState(0);

  const refMaskedTitle: any = useRef(null);

  const api = useMemo(() => new MainApiService(), []);

  let boardId = '50c0e289-42db-4b10-b4ae-cbeef496dbe4';

  const getCurrentBoard = useCallback(() => {
    api.getBoard(boardId).then((data) => {
      console.log(data);
      const newUsersList = data.userList.map((elem: any) => {
        return {...elem, isOpenWindow: false};
      });
      const newData = {...data, userList: newUsersList};
      setDataBoard(newData);
      setTitle(data.title);
      setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
    });
  }, [api, setDataBoard]);

  useEffect(() => {
    getCurrentBoard();
  }, [getCurrentBoard]);

  const onToggleUserWindow = (id: string | undefined, flag: boolean): void => {
    setDataBoard({
      ...dataBoard,
      userList: dataBoard.userList.map((el: IUser) => {
        el.isOpenWindow = el.id === id ? flag : false;
        return el;
      })
    });
    if (id) setOpenWindowInvite(false);
  };

  const onFocusTitle = (): void => {
    setFocusWidthTitle(currentWidthTitle);
  };

  const onBlurTitle = (property: string): void => {
    if (title) {
      api
        .putBoard({title: property}, boardId)
        .then(() => setDataBoard({...dataBoard, title: property}))
        .catch((error) => console.log(error));
    } else {
      setTitle(dataBoard.title);
      setCurrentWidthTitle(focusWidthTitle);
    }
  };

  const onChangeTitle = (property: string): void => {
    setTitle(property);
    setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
  };

  const onChangeFavorite = (property: boolean): void => {
    api
      .putBoard({isFavorite: property}, boardId)
      .then(() => setDataBoard({...dataBoard, isFavorite: property}))
      .catch((error) => console.log(error));
  };

  const onAddUserToPanelList = (item: IUser[]): void => {
    const newDataBoard = {...dataBoard, userList: [...dataBoard.userList, ...item]};
    setDataBoard(newDataBoard);
  };

  const checkUserInList = (id: string): boolean => {
    return dataBoard.userList.some((elem: IUser) => elem.id === id);
  };

  const renderUsersList = () => {
    if (dataBoard.userList) {
      return dataBoard.userList.map((item: IUser) => {
        return (
          <BoardPanelUserIcon
            key={item.id}
            item={item}
            adminId={dataBoard.admin}
            onToggleUserWindow={onToggleUserWindow}
          />
        );
      });
    }
  };

  return (
    <div className={classes['container-panel']}>
      <div className={classes.panel}>
        <input
          className={classes['panel__title']}
          type="text"
          value={title}
          maxLength={20}
          onFocus={(): void => onFocusTitle()}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => onBlurTitle(e.target.value)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeTitle(e.target.value)}
          style={{
            width: `${refMaskedTitle.current ? currentWidthTitle + 14 : null}px`
          }}
        />
        <div className={`${classes['panel__title']} ${classes['hide']}`} ref={refMaskedTitle}>
          {title}
        </div>
        <button
          type="button"
          onClick={() => onChangeFavorite(!dataBoard.isFavorite)}
          className={`${classes['panel__btn']}`}
        >
          {dataBoard.isFavorite ? (
            <StarFilled className={`${classes['active']}`} />
          ) : (
            <StarOutlined />
          )}
        </button>
        <span className={classes['panel__divider']}></span>
        <div className={classes['panel__block-users']}>
          <ul className={classes['users-list']}>{renderUsersList()}</ul>
          <BoardPanelBtnInvite
            boardId={boardId}
            isOpenWindowInvite={isOpenWindowInvite}
            setOpenWindowInvite={setOpenWindowInvite}
            onToggleUserWindow={onToggleUserWindow}
            onAddUserToPanelList={onAddUserToPanelList}
            checkUserInList={checkUserInList}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPanel;
