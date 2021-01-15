import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { ProjectOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
        <div className={classes.title}>
          <Link className={classes.link} to="/">
            <ProjectOutlined className={classes.logoApp} />
            <span>New Trello</span>
          </Link>
        </div>
   </header>
   );
};

export default Header;
