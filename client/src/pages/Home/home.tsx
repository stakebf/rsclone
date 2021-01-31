import React, {useState, useEffect} from 'react';
import BoardList from './components/BoardList';
import MainFeed from './components/MainFeed';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {Link} from 'react-router-dom';

import classes from './home.module.scss';
// import { Header } from 'antd/lib/layout/layout';

type HomeProps = {
  type: string;
};

const Home: React.FC<HomeProps> = ({type}) => {
  const [listMenu, setListMenu] = useState([
    {
      name: 'Доски',
      linkTo: '/boards',
      icon: '/svg/brands.svg',
      isSelect: false,
      type: 'boards'
    },
    {
      name: 'Главная страница',
      linkTo: '/',
      icon: '/svg/pulse.svg',
      isSelect: false,
      type: 'main'
    }
  ]);

  const onToggleMenu = (type: string) => {
    const newListMenu = listMenu.map((elem) => {
      elem.isSelect = elem.type === type ? true : false;
      return elem;
    });
    setListMenu(newListMenu);
  };

  useEffect(() => {
    onToggleMenu(type);
  }, [type]);

  const elementsMenu = listMenu.map((item, i) => {
    const {name, icon, isSelect, linkTo, type} = item;
    return (
      <li
        key={i}
        onClick={() => {
          onToggleMenu(type);
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
    <>
    <Header type="main"/>
    <div className={classes.container}>
      <div className={classes['menu-panel']}>
        <ul className={classes['list-tabs']}>{elementsMenu}</ul>
      </div>
      <div className={classes.content}>{type === 'main' ? <MainFeed /> : <BoardList />}</div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
