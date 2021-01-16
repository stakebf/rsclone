import React from 'react';
import { EditOutlined } from '@ant-design/icons';

import { CardProps } from '../../../../../helpers/creationHelper';
import classes from './Card.module.scss';

const Card:React.FC<CardProps> = ({cardId, cardTitle, userId, cardDescription, cardOrder}) => {
  return (
    <div
      className={classes.card}
      onClick={() => {
        console.log(`
          cardId - ${cardId}\n
          cardTitle - ${cardTitle}\n
          cardId - ${cardId}\n
        `);
      }}
    >
      <span>{cardTitle}</span>
      <EditOutlined 
        style={{
          alignSelf: 'flex-end',
          marginBottom: '3px'
        }}
        className={classes.editIcon}
      />
    </div>
  );
};

export default Card;
