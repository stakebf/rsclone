import React, { useState } from 'react';
import { EditOutlined, CheckSquareOutlined, FieldTimeOutlined, CommentOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { CardProps } from '../../../../../helpers/creationHelper';
import getColorByDate from '../../../../../helpers/dateHelper';
import classes from './Card.module.scss';
import CardInfo from '../cardInfo';

const Card:React.FC<CardProps> = ({
    columnId,
    _id, 
    title, 
    description = '', 
    usersList = [],
    order,
    date,
    todos,
    comments = [],
    tags = [],
    index }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardInfo = {
    columnId,
    _id, 
    title, 
    description, 
    usersList,
    order,
    date,
    todos,
    comments,
    tags
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

        <Draggable
          key={_id}
          draggableId={_id}
          index={index}
        >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  backgroundColor: '#fff',
                  ...provided.draggableProps.style
                }}
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
                <div className={classes.taskInfoWrapper}>
                  <div className={classes.titleWrapper}>
                    <span>{title}</span>
                    <div className={classes.componentsWrapper}>
                      {todos && todos[0] && !!Object.keys(todos[0]).length && !!todos[0].todo.length && <span>
                        <>
                          <CheckSquareOutlined 
                            className={classes.checkIcon}
                          />
                          {`${todos[0].todo.length && todos[0].todo.filter((item:any) => item.isComplete).length}/${todos[0].todo.length}`}
                        </>
                      </span>}
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
                      {!!usersList.length && <div className={classes.additionalUsersComponent}>
                        {usersList.map((item) => <div
                          key={item.id}
                          title={item.name}
                          className={classes.avatarWrapper}
                        >
                          <div className={classes.avatar}>
                            {item.name[0].toUpperCase()}
                          </div>
                        </div>)}
                      </div>}
                    </div>
                  </div>
                  <EditOutlined 
                    className={classes.editIcon}
                  />
                </div>
              </div>
            )}}
        </Draggable>
      </div>
    </>
  );
};

export default Card;

