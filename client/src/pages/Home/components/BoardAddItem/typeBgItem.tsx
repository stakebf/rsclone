import React from 'react';

import classes from './boardAddItem.module.scss';

interface IElemDataAddBoard {
  id: number;
  isImg: boolean;
  check: boolean;
  bg: string;
}

type TypeBgItemProps = {
  item: IElemDataAddBoard;
  onToggle(id: number): void;
};

const TypeBgItem: React.FC<TypeBgItemProps> = ({item, onToggle}) => {
  const {id, isImg, check, bg} = item;
  return (
    <li
      onClick={() => {
        onToggle(id);
      }}
      className={classes.item}
      style={isImg ? {backgroundImage: `url(${bg})`} : {backgroundColor: bg}}
    >
      <div className={`${classes['item-overlay']} ${check ? classes['active'] : ''}`}>
        {check && <img className={classes['img-check']} src="/svg/check.svg" alt="check" />}
      </div>
    </li>
  );
};

export default TypeBgItem;
