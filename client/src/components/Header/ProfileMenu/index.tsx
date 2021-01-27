import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Drawer, Divider } from 'antd';
import classes from './ProfileMenu.module.scss';
import './Drawer.scss';

type Settings = {
  user: {
    name: String,
    nameShort: String,
    email: String,
  }
  visible: boolean;
  onClose: () => void;
}

const ProfileMenu: React.FC<Settings> = ({user, visible, onClose}) => {
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
          <Avatar style={{ backgroundColor: '#f56a00', color: 'black', fontWeight: 'bold' }} size='large'>
            {user.nameShort}
          </Avatar>          
        </div>
        <div className={classes.userInfo}>
          <span className={classes.name}>{user.name}</span>
          <span className={classes.email}>{user.email}</span>
        </div>
      </div>
      <Divider />
      <Link to="/profile"><p className={classes.link}>{items.profile}</p></Link>
      <Link to="/"><p className={classes.link}>{items.actions}</p></Link>
      <Divider />
      <Link to="/"><p className={classes.link}>{items.hotKeys}</p></Link>
      <Divider />
      <Link to="/"><p className={classes.link}>{items.exit}</p></Link>
    </Drawer>    
  );
};

export default ProfileMenu;
