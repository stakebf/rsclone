import React, { useState } from 'react';
import { EditOutlined, CheckSquareOutlined, FieldTimeOutlined } from '@ant-design/icons';

import { CardProps } from '../../../../../helpers/creationHelper';
import getColorByDate from '../../../../../helpers/dateHelper';
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
    date,
    todos }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardInfo = {
    columnId,
    id, 
    title, 
    description, 
    userList,
    order,
    date,
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
          <div className={classes.componentsWrapper}>
            <span>
              {!!todos.todo.length && <>
                <CheckSquareOutlined 
                  className={classes.checkIcon}
                />
                {`${todos.todo.length && todos.todo.filter((item) => item.isComplete).length}/${todos.todo.length}`}
              </>}
            </span>
            {date && <span className={`${classes.dateComponent} ${classes[getColorByDate(date)]}`}>
              <FieldTimeOutlined 
                className={classes.timeIcon}
              />
              {date}
            </span>}
          </div>
        </div>
        <EditOutlined 
          className={classes.editIcon}
        />
      </div>
    </>
  );
};

export default Card;

