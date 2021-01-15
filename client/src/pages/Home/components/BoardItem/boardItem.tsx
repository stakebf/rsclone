import React from 'react';
import classes from './boardItem.module.scss';

interface IBoardItem {
  bg: string;
  name: string;
  isImg: boolean;
}

type BoardItemProps = {
  item: IBoardItem;
};

const BoardItem: React.FC<BoardItemProps> = ({item}) => {
  const {bg, name, isImg} = item;
  return (
    <li
      className={classes.item}
      style={isImg ? {backgroundImage: `url(${bg})`} : {backgroundColor: bg}}
    >
      <div className={classes['content-item']}>
        <h5 className={classes['title-item']}>{name}</h5>
      </div>
    </li>
  );
};

export default BoardItem;
