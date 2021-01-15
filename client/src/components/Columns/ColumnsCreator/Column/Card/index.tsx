import React from 'react';
import { EditOutlined } from '@ant-design/icons';

import { CardProps } from '../../../../../helpers/creationHelper';
import classes from './Card.module.scss';

const Card:React.FC<CardProps> = ({cardId, cardTitle, userId, cardDescription, cardOrder}) => {
  return (
    <div
      className={classes.card}
      onClick={() => {
        console.log('onClick - Card menu');
      }}
    >
      <span>{cardTitle}</span>
      <EditOutlined />
    </div>
  );
};

export default Card;
