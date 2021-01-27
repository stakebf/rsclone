import React, { useState } from 'react';
import { EditOutlined, CheckSquareOutlined, FieldTimeOutlined, CommentOutlined } from '@ant-design/icons';

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
    userList = [],
    order,
    date,
    todos,
    comments = [],
    tags = [],
    background = '' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardInfo = {
    columnId,
    id, 
    title, 
    description, 
    userList,
    order,
    date,
    todos,
    comments,
    tags,
    background
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
        <div className={classes.taskColors}>
          {!!tags.length && tags.map((item) => <div
            className={classes[item.color]}
            style={{
              width: `${100 / tags.length}%`
            }}
            key={`${item.color}_${item.id}`}
          ></div>)}
        </div>
        {/*style={{
          width: '100%',
          height: '30px',
          background: 'red'
        }}*/}
        <div className={classes.taskInfoWrapper}>
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
              {!!comments.length && <span className={classes.commentsComponent}>
                <CommentOutlined 
                  className={classes.commentIcon}
                />
                {comments.length}
              </span>}
            </div>
          </div>
          <EditOutlined 
            className={classes.editIcon}
          />
        </div>
      </div>
    </>
  );
};

export default Card;

