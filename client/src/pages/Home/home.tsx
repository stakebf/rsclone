import React, {useState} from 'react';
import BoardList from './components/BoardList';
import MainFeed from './components/MainFeed';

import {Link} from 'react-router-dom';

import classes from './home.module.scss';

type HomeProps = {
  type: string;
  userId?: any;
};

const Home: React.FC<HomeProps> = ({type, userId}) => {
  const [listMenu, setListMenu] = useState([
    {
      id: 1,
      name: 'Доски',
      linkTo: '/user123/boards',
      icon: '/svg/brands.svg',
      isSelect: true
    },
    {id: 2, name: 'Главная страница', linkTo: '/', icon: '/svg/pulse.svg', isSelect: false}
  ]);

  const onToggleMenu = (id: number) => {
    const newListMenu = listMenu.map((elem) => {
      elem.isSelect = elem.id === id ? true : false;
      return elem;
    });
    setListMenu(newListMenu);
  };

  const elementsMenu = listMenu.map((item) => {
    const {id, name, icon, isSelect, linkTo} = item;
    return (
      <li
        key={id}
        onClick={() => {
          onToggleMenu(id);
        }}
        className={`${classes.tab} ${isSelect ? classes.active : ''}`}
      >
        <Link className={classes.link} to={linkTo}>
          <img className={classes.icon} src={icon} alt={name} />
          <span>{name}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes['control-panel']}>
        <ul className={classes['list-tabs']}>{elementsMenu}</ul>
      </div>
      {type === 'main' ? <MainFeed /> : <BoardList />}
    </div>
  );
};

export default Home;
