import React from 'react';
import classes from './Header.module.scss';
import { ProjectOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
        <div className={classes.header__title}>
          <ProjectOutlined className={classes.logoApp} />
          <span>New Trello</span>
        </div>
   </header>
   );
};

export default Header;
