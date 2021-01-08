import React from 'react';
import classes from './Page404.module.scss';

const Page404: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>WTF are you doing man (not user friendly message) :)</h1>
      <span className={classes.errorNumber}>404</span>
      <span className={classes.errorText}>Page not found</span>
    </div>
  )
};

export default Page404;
