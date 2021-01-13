import React from 'react';
import Boards from './components/Boards';

import classes from './home.module.scss';

const Home: React.FC = () => {
  const dataBoards = [
    {id: 1, bg: '/images/bg_board_1.jpg', name: 'moon'},
    {id: 2, bg: '/images/bg_board_2.jpg', name: 'wood'},
    {id: 3, bg: '/images/bg_board_3.jpg', name: 'space'},
    {id: 4, bg: '/images/bg_board_4.jpg', name: 'winter'},
    {id: 5, bg: '/images/bg_board_5.jpg', name: 'target'}
  ];

  return (
    <div className={classes.container}>
      <div className={classes['control-panel']}>
        <ul className={classes['list-tabs']}>
          <li className={classes.tab}>
            <img className={classes.icon} src="/svg/trello-brands.svg" alt="trello-brands" />
            <span>Доски</span>
          </li>
          <li className={classes.tab}>
            <img className={classes.icon} src="/svg/pulse.svg" alt="pulse" />
            <span>Главная страница</span>
          </li>
        </ul>
      </div>
      <Boards dataBoards={dataBoards} />
    </div>
  );
};

export default Home;
