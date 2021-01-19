import React from 'react';
import {Link} from 'react-router-dom';
import classes from './boardListItem.module.scss';

interface IBoardListItem {
  id: number;
  bg: string;
  name: string;
  isImg: boolean;
}

type BoardListItemProps = {
  item: IBoardListItem;
};

const BoardListItem: React.FC<BoardListItemProps> = ({item}) => {
  const {bg, name, isImg, id} = item;
  return (
    <li
      className={classes.item}
      style={isImg ? {backgroundImage: `url(${bg})`} : {backgroundColor: bg}}
    >
      <Link className={classes['content-item']} to={`/${id}`}>
        <h5 className={classes['title-item']}>{name}</h5>
      </Link>
    </li>
  );
};

export default BoardListItem;
