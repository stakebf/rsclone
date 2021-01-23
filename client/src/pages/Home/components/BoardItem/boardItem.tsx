import React from 'react';
import {Link} from 'react-router-dom';
import {StarOutlined} from '@ant-design/icons';

import classes from './boardItem.module.scss';

interface IBoardItem {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

type BoardItemProps = {
  item: IBoardItem;
  onFavorite(item: IBoardItem): void;
};

const BoardListItem: React.FC<BoardItemProps> = ({item, onFavorite}) => {
  const {background, title, id, isFavorite} = item;
  return (
    <li
      className={classes.item}
      style={
        background.endsWith('jpg' || 'jpeg' || 'png')
          ? {backgroundImage: `url(${background})`}
          : {backgroundColor: background}
      }
    >
      <div className={classes['content']}>
        <Link className={classes['content__block-link']} to={`/${id}`}>
          <h5 className={classes['title']}>{title}</h5>
        </Link>
        <StarOutlined
          onClick={() => {
            onFavorite(item);
          }}
          className={`${classes['content__star']} ${isFavorite ? classes['active'] : ''}`}
        />
      </div>
    </li>
  );
};

export default BoardListItem;