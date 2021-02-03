import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HelpModal from '../HelpModal';
import { Avatar, Drawer, Divider } from 'antd';
import classes from './ProfileMenu.module.scss';
import './Drawer.scss';
import logout from '../../../helpers/logout';

type Settings = {
  user: {
    name: String,
    email: String,
  }
  visible: boolean;
  onClose: () => void;
  onClick?: () => void;
}

const ProfileMenu: React.FC<Settings> = ({user, visible, onClose, onClick}) => {
  const items = {
    title: 'Учетная запись',
    profile: 'Профиль',
    actions: 'Действия',
    cards: 'Карточки',
    settings: 'Настройки',
    help: 'Помощь',
    hotKeys: 'Горячие клавиши',
    exit: 'Выйти',
  }
  
  const [visibleHotKey, setVisibleHotKey] = useState(false);

  function showHelp() {
    setVisibleHotKey(true);
    if (onClick) onClick();
  }

  function closeHelp() {
    setVisibleHotKey(false);
  }

  return (
    <Drawer
      className="profileMenu"
      title={items.title}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <div className={classes.user}>
        <div className={classes.avatar}>
          <Avatar style={{ backgroundColor: 'rgb(253, 161, 55)', color: 'black', fontWeight: 'bold' }} size='large'>
            {user.name[0].toLocaleUpperCase()}
          </Avatar>          
        </div>
        <div className={classes.userInfo}>
          <span className={classes.name}>{user.name}</span>
          <span className={classes.email}>{user.email}</span>
        </div>
      </div>
      <Divider />
      <Link
        to={{
        pathname: "/profile",
        state: "1",
      }}
      ><p className={classes.link} onClick={onClick}>{items.profile}</p></Link>
      <Link
        to={{
          pathname: "/profile",
          state: "2",
        }}
      ><p className={classes.link} onClick={onClick}>{items.actions}</p></Link>
      <Divider />
      <p className={classes.link} onClick={showHelp}>{items.hotKeys}</p>
      <Divider />
      <Link to="/"><p className={classes.link} onClick={logout}>{items.exit}</p></Link>
      <HelpModal visible={visibleHotKey} onClose={closeHelp} />
    </Drawer>    
  );
};

export default ProfileMenu;
