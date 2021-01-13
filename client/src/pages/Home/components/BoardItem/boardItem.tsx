import React from 'react';
import classes from './boardItem.module.scss';

type BoardItemProps = {
  bg: string;
  name: string;
};

const BoardItem: React.FC<BoardItemProps> = ({bg, name}) => {
  return (
    <li className={classes.item} style={{backgroundImage: `url(${bg})`}}>
      <div className={classes['content-item']}>
        <h5 className={classes['title-item']}>{name}</h5>
      </div>
    </li>
  );
};

export default BoardItem;