import React, {useState} from 'react';
import BoardList from './components/BoardList';

import classes from './home.module.scss';

const Home: React.FC = () => {
  const [listMenu, setListMenu] = useState([
    {id: 1, name: 'Доски', linkTo: '/', icon: '/svg/trello-brands.svg', isSelect: true},
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
    const {id, name, icon, isSelect} = item;
    return (
      <li
        key={id}
        onClick={() => {onToggleMenu(id)}}
        className={`${classes.tab} ${isSelect ? classes.active : ''}`}
      >
        <img className={classes.icon} src={icon} alt={name} />
        <span>{name}</span>
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes['control-panel']}>
        <ul className={classes['list-tabs']}>{elementsMenu}</ul>
      </div>
      <BoardList/>
    </div>
  );
};

export default Home;
