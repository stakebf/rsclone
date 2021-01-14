import React from 'react';
import classes from './boardItem.module.scss';

type BoardItemProps = {
  bg: string;
  name: string;
  isImg: boolean;
};

const BoardItem: React.FC<BoardItemProps> = ({bg, name, isImg}) => {
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
