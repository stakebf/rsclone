import React, { useState } from 'react';
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons';

import { CardProps } from '../../../../../helpers/creationHelper';
import classes from './Card.module.scss';
import CardInfo from '../CardInfo';

// TODO: добавить rename карточки

const Card:React.FC<CardProps> = ({
    columnId,
    id, 
    title, 
    description = '', 
    userList,
    order,
    todos }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardInfo = {
    columnId,
    id, 
    title, 
    description, 
    userList,
    order,
    todos
  }
  
  const showCardInfo = () => {
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
        <div className={classes.titleWrapper}>
          <span>{title}</span>
          <span>
            {!!todos.todo.length && <>
              <CheckSquareOutlined 
                className={classes.checkIcon}
              />
              {`${todos.todo.length && todos.todo.filter((item) => item.isComplete).length}/${todos.todo.length}`}
            </>}
          </span>
        </div>
        <EditOutlined 
          className={classes.editIcon}
        />
      </div>
    </>
  );
};

export default Card;

