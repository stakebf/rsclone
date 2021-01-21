import React from 'react';
import {CheckOutlined} from '@ant-design/icons';

import classes from './boardAddItem.module.scss';

interface IElemDataAddBoard {
  id: number;
  check: boolean;
  background: string;
}

type TypeBgItemProps = {
  item: IElemDataAddBoard;
  onToggle(id: number): void;
};

const TypeBgItem: React.FC<TypeBgItemProps> = ({item, onToggle}) => {
  const {id, check, background} = item;
  return (
    <li
      onClick={() => {
        onToggle(id);
      }}
      className={classes.item}
      style={
        background.endsWith('jpg' || 'jpeg' || 'png')
          ? {backgroundImage: `url(${background})`}
          : {backgroundColor: background}
      }
    >
      <div className={`${classes['item-overlay']} ${check ? classes['active'] : ''}`}>
        {check && <CheckOutlined className={classes['img-check']} />}
      </div>
    </li>
  );
};

export default TypeBgItem;
