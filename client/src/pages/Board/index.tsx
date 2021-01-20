import React from 'react';
import classes from './Board.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Page404: React.FC = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <Header />
        <Footer />
      </div>
    </div>
  )
};

export default Page404;
