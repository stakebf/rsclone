import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {StarOutlined, StarFilled, LoadingOutlined} from '@ant-design/icons';

import classes from './boardItem.module.scss';

interface IBoardItem {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

type BoardItemProps = {
  item: IBoardItem;
  onFavorite(item: IBoardItem, setLoad: any): void;
};

const BoardListItem: React.FC<BoardItemProps> = ({item, onFavorite}) => {
  const {background, title, id, isFavorite} = item;
  const [load, setLoad] = useState(false);

  const renderStars = () => {
    return isFavorite ? (
      <StarFilled
        onClick={() => {
          onFavorite(item, setLoad);
        }}
        className={`${classes['content__icon']} ${classes['active']}`}
      />
    ) : (
      <StarOutlined
        onClick={() => {
          onFavorite(item, setLoad);
        }}
        className={`${classes['content__icon']}`}
      />
    );
  };

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
        <Link className={classes['content__block-link']} to={`/currentBoard/${id}`}>
          <h5 className={classes['title']}>{title}</h5>
        </Link>
        {load ? <LoadingOutlined className={`${classes['content__icon']}`} /> : renderStars()}
      </div>
    </li>
  );
};

export default BoardListItem;
