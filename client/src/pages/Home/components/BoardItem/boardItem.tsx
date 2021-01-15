import React from 'react';
import {Link} from 'react-router-dom';
import classes from './boardItem.module.scss';

interface IBoardItem {
  id: number;
  bg: string;
  name: string;
  isImg: boolean;
}

type BoardItemProps = {
  item: IBoardItem;
};

const BoardItem: React.FC<BoardItemProps> = ({item}) => {
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

export default BoardItem;
