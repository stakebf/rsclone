import React, {useState, useEffect, useRef} from 'react';
import BoardPanelUserIcon from '../BoardPanelUserIcon';
import BoardPanelBtnInvite from '../BoardPanelBtnInvite';
import {StarOutlined, StarFilled} from '@ant-design/icons';

import classes from './boardPanel.module.scss';

const BoardPanel: React.FC = () => {
  const [dataBoard, setDataBoard] = useState({
    id: 'id',
    author: {id: '3'},
    background: 'bg',
    title: 'TrelloClone',
    isFavorite: true,
    userList: [
      {id: '1', name: 'Masha', login: 'masha', isOpenWindow: false},
      {id: '2', name: 'Petr', login: 'petr', isOpenWindow: false},
      {id: '3', name: 'Aleksey', login: 'alex', isOpenWindow: false},
      {id: '4', name: 'Ruslan', login: 'ruslan', isOpenWindow: false}
    ]
  });
  const [title, setTitle] = useState('');
  const [isOpenWindowInvite, setOpenWindowInvite] = useState(false);
  const [currentWidthTitle, setCurrentWidthTitle] = useState(0);
  const [focusWidthTitle, setFocusWidthTitle] = useState(0);

  const refMaskedTitle: any = useRef(null);

  useEffect(() => {
    setTitle(dataBoard.title);
    setTimeout(() => {
      setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
    }, 0);
  }, []);

  const onToggleUserWindow = (id: string | undefined, flag: boolean) => {
    setDataBoard({
      ...dataBoard,
      userList: dataBoard.userList.map((el) => {
        el.isOpenWindow = el.id === id ? flag : false;
        return el;
      })
    });
    if (id) setOpenWindowInvite(false);
  };

  const onFocusTitle = () => {
    setFocusWidthTitle(currentWidthTitle);
  };

  const onBlurTitle = (property: string) => {
    if (title) {
      setDataBoard({...dataBoard, title: property});
    } else {
      setTitle(dataBoard.title);
      setCurrentWidthTitle(focusWidthTitle);
    }
  };

  const onChangeTitle = (property: string) => {
    setTitle(property);
    setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
  };

  const onChangeFavorite = (property: boolean) => {
    setDataBoard({...dataBoard, isFavorite: property});
  };

  const elementsListUser = dataBoard.userList.map((item) => {
    return (
      <BoardPanelUserIcon
        key={item.id}
        item={item}
        adminId={dataBoard.author.id}
        onToggleUserWindow={onToggleUserWindow}
      />
    );
  });

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
            <StarOutlined />
          ) : (
            <StarFilled className={`${classes['active']}`} />
          )}
        </button>
        <span className={classes['panel__divider']}></span>
        <div className={classes['panel__block-users']}>
          <ul className={classes['users-list']}>{elementsListUser}</ul>
          <BoardPanelBtnInvite
            isOpenWindowInvite={isOpenWindowInvite}
            setOpenWindowInvite={setOpenWindowInvite}
            onToggleUserWindow={onToggleUserWindow}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPanel;
