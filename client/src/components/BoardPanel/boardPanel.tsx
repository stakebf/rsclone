import React, {useState, useEffect, useRef} from 'react';
import {StarOutlined, CrownOutlined, CloseOutlined} from '@ant-design/icons';

import classes from './boardPanel.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  mail: string;
  img: string;
}

const BoardPanel: React.FC = () => {
  const [dataBoard, setDataBoard] = useState({
    id: 'id',
    author: {id: '3'},
    background: 'bg',
    title: 'TrelloClone',
    isFavorite: true,
    userList: [
      {id: '1', name: 'Masha', login: 'masha', mail: 'masha@gmail.com', img: '/images/user.png'},
      {id: '2', name: 'Petr', login: 'petr', mail: 'petr@gmail.com', img: '/images/user.png'},
      {id: '3', name: 'Alex', login: 'alex', mail: 'alex@gmail.com', img: '/images/user.png'},
      {id: '4', name: 'Ruslan', login: 'ruslan', mail: 'ruslan@gmail.com', img: '/images/user.png'}
    ]
  });
  const [title, setTitle] = useState('');
  const [openWindowInvite, setOpenWindowInvite] = useState(false);
  const [currentWidthTitle, setCurrentWidthTitle] = useState(0);
  const [focusWidthTitle, setFocusWidthTitle] = useState(0);
  const [email, setEmail] = useState('');

  const refMaskedTitle: any = useRef(null);
  const refWindowInvite: any = useRef(null);
  const refBtnClose: any = useRef(null);

  useEffect(() => {
    setTitle(dataBoard.title);
    setTimeout(() => {
      setCurrentWidthTitle(refMaskedTitle.current.clientWidth);
    }, 0);
  }, []);

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

  const elementsListUser = dataBoard.userList.map((item: IUser) => {
    const {id, name, login, mail, img} = item;
    return (
      <li className={classes.user} key={id}>
        <img className={classes['user__img']} src={img} alt="user" />
        {dataBoard.author.id === id && (
          <CrownOutlined className={classes['user__admin-icon']} twoToneColor="#fff" />
        )}
      </li>
    );
  });

  const createWindowInvite = () => {
    return (
      <div className={classes['window-invite']} ref={refWindowInvite}>
        <div className={classes['window-invite__head']}>
          <span className={classes['title']}>Пригласить на доску</span>
          <span
            className={classes['close']}
            onClick={() => setOpenWindowInvite(false)}
            ref={refBtnClose}
          >
            <CloseOutlined />
          </span>
        </div>
        <span className={classes['window-invite__divider']}></span>
        <input
          className={classes['window-invite__input']}
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
        />
        <button type="button" className={classes['window-invite__btn']}>
          Отправить приглашение
        </button>
      </div>
    );
  };

  (function closeMenu() {
    document.addEventListener('click', (e: any) => {
      const target = e.target;
      const window = refWindowInvite.current;
      const btnClose = refBtnClose.current;
      if (openWindowInvite && window) {
        const its_window: boolean = target === window || window.contains(target);
        const its_close: boolean = target === btnClose || btnClose.contains(target);
        if (!its_window && !its_close && openWindowInvite) setOpenWindowInvite(false);
      }
    });
  })();

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
          className={`${classes['panel__btn']} ${dataBoard.isFavorite ? classes['active'] : ''}`}
        >
          <StarOutlined />
        </button>
        <span className={classes['panel__divider']}></span>
        <ul className={classes['panel__users-list']}>{elementsListUser}</ul>
        <div className={classes['wrapper-btn']}>
          <button
            type="button"
            className={classes['panel__btn']}
            onClick={(e) => {
              e.stopPropagation();
              setOpenWindowInvite(true);
            }}
          >
            Пригласить
          </button>
          {openWindowInvite ? createWindowInvite() : null}
        </div>
      </div>
      <div className={classes.menu}>Menu</div>
    </div>
  );
};

export default BoardPanel;
