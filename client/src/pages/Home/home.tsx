import React, {useState} from 'react';
import BoardList from './components/BoardList';

import classes from './home.module.scss';

const Home: React.FC = () => {
  const [dataBoards, setDataBoards] = useState([
    {id: 1, bg: '/images/bg_board_1.jpg', name: 'moon', isImg: true},
    {id: 2, bg: '/images/bg_board_2.jpg', name: 'wood', isImg: true},
    {id: 3, bg: '/images/bg_board_3.jpg', name: 'space', isImg: true},
    {id: 4, bg: '/images/bg_board_4.jpg', name: 'winter', isImg: true},
    {id: 5, bg: 'rgb(137, 96, 158)', name: 'purple', isImg: false},
    {id: 6, bg: 'rgb(0, 121, 191)', name: 'blue', isImg: false},
    {id: 7, bg: 'rgb(210, 144, 52)', name: 'orange', isImg: false},
    {id: 8, bg: 'rgb(81, 152, 57)', name: 'green', isImg: false},
    {id: 9, bg: 'rgb(176, 70, 50)', name: 'red', isImg: false}
  ]);

  const createBoard = (name: string, bg: string, isImg: boolean) => {
    return {
      bg,
      name,
      isImg,
      id: ++dataBoards.length
    };
  };

  const onAddedBoard = (name: string, bg: string, isImg: boolean): void => {
    setDataBoards([...dataBoards, createBoard(name, bg, isImg)]);
  };

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
      <BoardList dataBoards={dataBoards} onAddedBoard={onAddedBoard} />
    </div>
  );
};

export default Home;
