import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {StarOutlined, CrownOutlined, CloseOutlined} from '@ant-design/icons';
import classes from './boardPanel.module.scss';

interface ICurrentBoard {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

type BoardPanelProps = {
  item: ICurrentBoard;
};

const BoardPanel: React.FC<BoardPanelProps> = ({item}) => {
  const [openWindowInvite, setOpenWindowInvite] = useState(false);
  const {title, isFavorite} = item;

  /* (function closeWindows() {
    document.body.addEventListener('click', () => {
      setOpenWindowInvite(false);
    });
  })(); */

  const windowInvite = () => {
    return (
      <div className={classes['window-invite']}>
        <div className={classes['window-invite__head']}>
          <span className={classes['title']}>Пригласить на доску</span>
          <CloseOutlined className={classes['close']} onClick={() => setOpenWindowInvite(false)} />
        </div>
        <span className={classes['window-invite__divider']}></span>
        <input className={classes['window-invite__input']} type="text" value="" />
        <button type="button" className={classes['window-invite__btn']}>
          Отправить приглашение
        </button>
      </div>
    );
  };

  return (
    <div className={classes['container-panel']}>
      <div className={classes.panel}>
        <input className={classes['panel__title']} type="text" value="Trello clone" />
        <button type="button" className={classes['panel__btn']}>
          <StarOutlined />
        </button>
        <span className={classes['panel__divider']}></span>
        <ul className={classes['panel__users-list']}>
          <li className={classes.user}>
            <img className={classes['user__img']} src="/images/user.png" alt="user" />
            <CrownOutlined className={classes['user__admin-icon']} twoToneColor="#fff" />
          </li>
          <li className={classes.user}>
            <img className={classes['user__img']} src="/images/user.png" alt="user" />
          </li>
          <li className={classes.user}>
            <img className={classes['user__img']} src="/images/user.png" alt="user" />
          </li>
          <li className={classes.user}>
            <img className={classes['user__img']} src="/images/user.png" alt="user" />
          </li>
        </ul>
        <div className={classes['wrapper-btn']}>
          <button
            type="button"
            className={classes['panel__btn']}
            onClick={() => setOpenWindowInvite(true)}
          >
            Пригласить
          </button>
          {openWindowInvite && windowInvite()}
        </div>
      </div>
      <div className={classes.menu}>Menu</div>
    </div>
  );
};

export default BoardPanel;
