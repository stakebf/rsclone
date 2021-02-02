import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import PanelUserIcon from '../PanelUserIcon';
import PanelWindowInvite from '../PanelWindowInvite';
import {StarOutlined, StarFilled, LoadingOutlined} from '@ant-design/icons';
import MainApiService from '../../../services/MainApiService';

import classes from './panel.module.scss';
interface IUser {
  id: string;
  name: string;
  login: string;
  isOpenWindow?: boolean;
}

type PanelProps = {
  boardId: string;
};

const Panel: React.FC<PanelProps> = ({boardId}) => {
  const [dataBoard, setDataBoard]: any = useState({});
  const [title, setTitle] = useState('');
  const [disabledTitle, setDisabledTitle] = useState(false);
  const [isOpenWindowInvite, setOpenWindowInvite] = useState(false);
  const [currentWidthTitle, setCurrentWidthTitle] = useState(0);
  const [focusWidthTitle, setFocusWidthTitle] = useState(0);
  const [loadFavorite, setLoadFavorite] = useState(false);

  const refMaskedTitle: any = useRef(null);

  const api = useMemo(() => new MainApiService(), []);

  const getCurrentBoard = useCallback(() => {
    api.getBoard(boardId).then((data) => {
      const newUsersList = data.userList.map((elem: any) => {
        return {...elem, isOpenWindow: false};
      });
      const newData = {...data, userList: newUsersList};
      setDataBoard(newData);
      setTitle(data.title);
      setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
    });
  }, [api, boardId, setDataBoard]);

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
      setDisabledTitle(true);
      api
        .putBoard({title: property}, boardId)
        .then(() => setDataBoard({...dataBoard, title: property}))
        .catch((error) => console.log(error))
        .finally(() => setDisabledTitle(false));
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
    setLoadFavorite(true);
    api
      .putBoard({isFavorite: property}, boardId)
      .then(() => setDataBoard({...dataBoard, isFavorite: property}))
      .catch((error) => console.log(error))
      .finally(() => setLoadFavorite(false));
  };

  const onAddUserToPanelList = (item: IUser[]): void => {
    const newDataBoard = {...dataBoard, userList: [...dataBoard.userList, ...item]};
    setDataBoard(newDataBoard);
  };

  const onRemoveUserToPanelList = (id: string): void => {
    const newUsersList = dataBoard.userList.filter((elem: IUser) => elem.id !== id);
    const newDataBoard = {...dataBoard, userList: newUsersList};
    setDataBoard(newDataBoard);
  };

  const checkUserInList = (id: string): boolean => {
    return dataBoard.userList.some((elem: IUser) => elem.id === id);
  };

  const renderUsersList = () => {
    if (dataBoard.userList) {
      return dataBoard.userList.map((item: IUser) => {
        return (
          <PanelUserIcon
            key={item.id}
            item={item}
            boardId={boardId}
            adminId={dataBoard.admin}
            onToggleUserWindow={onToggleUserWindow}
            onRemoveUserToPanelList={onRemoveUserToPanelList}
          />
        );
      });
    }
  };

  const renderStar = () => {
    if (loadFavorite) {
      return <LoadingOutlined />;
    } else {
      return dataBoard.isFavorite ? (
        <StarFilled className={`${classes['active']}`} />
      ) : (
        <StarOutlined />
      );
    }
  };

  return (
    <div className={classes['container-panel']}>
      <div className={classes.panel}>
        <input
          className={`${classes['panel__title']} ${disabledTitle ? classes['disabled'] : ''}`}
          type="text"
          value={title}
          maxLength={20}
          onFocus={(): void => onFocusTitle()}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => onBlurTitle(e.target.value)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeTitle(e.target.value)}
          style={{
            width: `${refMaskedTitle.current ? currentWidthTitle + 14 : null}px`
          }}
          disabled={disabledTitle}
        />
        <div className={`${classes['panel__title']} ${classes['hide']}`} ref={refMaskedTitle}>
          {title}
        </div>
        <button
          type="button"
          onClick={() => onChangeFavorite(!dataBoard.isFavorite)}
          className={`${classes['panel__btn']}`}
        >
          {renderStar()}
        </button>
        <span className={classes['panel__divider']}></span>
        <div className={classes['panel__block-users']}>
          <ul className={classes['users-list']}>{renderUsersList()}</ul>
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
            {isOpenWindowInvite ? (
              <PanelWindowInvite
                boardId={boardId}
                isOpenWindowInvite={isOpenWindowInvite}
                setOpenWindowInvite={setOpenWindowInvite}
                onToggleUserWindow={onToggleUserWindow}
                onAddUserToPanelList={onAddUserToPanelList}
                checkUserInList={checkUserInList}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
