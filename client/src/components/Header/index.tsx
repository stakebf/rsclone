import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
        <div className={classes.header__title}>
            <img src='/svg/trello.svg' alt='logo' />
            <span>New Trello</span>
        </div>
   </header>
   );
};

export default Header;
