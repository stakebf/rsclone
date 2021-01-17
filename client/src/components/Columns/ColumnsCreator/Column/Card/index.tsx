import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { CardProps } from '../../../../../helpers/creationHelper';
import classes from './Card.module.scss';
import CardInfo from '../CardInfo';

// TODO: добавить rename карточки

const Card:React.FC<CardProps> = ({
    columnId,
    cardId, 
    cardTitle, 
    userId, 
    cardDescription, 
    cardOrder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardInfo = {
    columnId,
    cardId, 
    cardTitle, 
    userId, 
    cardDescription, 
    cardOrder
  }
  
  const showCardInfo = () => {
    // console.log(`
      // cardId - ${cardId}\n
      // cardTitle - ${cardTitle}\n
      // cardId - ${cardId}\n
      // cardDescription - ${cardDescription}\n
    // `);
    setIsOpen(true);
  }

  const closeCardInfo = () => {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && <CardInfo 
        {...cardInfo}
        closeCardInfo={closeCardInfo}
      />}
      <div
        className={classes.card}
        onClick={showCardInfo}
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
    </>
  );
};

export default Card;
