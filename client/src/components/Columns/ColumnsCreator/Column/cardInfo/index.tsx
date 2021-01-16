import React from 'react';
import classes from './CardInfo.module.scss';

import { CardInfoProps } from '../../../../../helpers/creationHelper';

const CardInfo:React.FC<CardInfoProps> = ({ 
    columnId,
    closeCardInfo, 
    cardId,
    cardTitle,
    userId,
    cartDescription,
    cardOrder,
    todo = [],
    cardComments = [],
    tags = [],
    background}) => {

  return (
    <div className={classes.popup}>
      <div className={classes.contentWrapper}>
        <h2>some title</h2>
        <div>
          <div>
            <div>
              <h3>Description</h3>
            </div>
            <div>
              <h3>Todos</h3>
            </div>
            <div>
              <h3>Comments</h3>
            </div>
          </div>
          <div>
            <ul>
              <li>li 1</li>
              <li>li 2</li>
              <li>li 3</li>
              <li>li 4</li>
              <li>li 5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
