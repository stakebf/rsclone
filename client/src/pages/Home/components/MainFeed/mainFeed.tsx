import React from 'react';
import {Link} from 'react-router-dom';
import classes from './mainFeed.module.scss';

const MainFee: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className={classes.title}>Home Page</h1>
        <Link to="/user123/boards">to boards</Link>
        <br />
        <Link to="/register">to register</Link>
        <br />
        <Link to="/login">to login</Link>
      </div>
    </div>
  );
};

export default MainFee;
