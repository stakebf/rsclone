import React from 'react';
import classes from './TestPage.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Board: React.FC = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <Header />
        <Footer />
      </div>
    </div>
  )
};

export default Board;
