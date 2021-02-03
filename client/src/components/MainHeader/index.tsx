import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainHeader.module.scss';
import { ProjectOutlined } from '@ant-design/icons';

const MainHeader: React.FC<any> = () => {
  
  return (
    <header className={classes.header}>
        <div className={classes.title}>
          <Link className={classes.link} to="/">
            <ProjectOutlined className={classes.logoApp} />
            <span className={classes.text}>New Trello</span>
          </Link>
        </div>
   </header>
   );
};

export default MainHeader;
