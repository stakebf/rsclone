import React from 'react';
import {Link} from 'react-router-dom';

import classes from './mainFeedComment.module.scss';

interface IDataComments {
  id: string;
  boardId: string;
  taskId: string;
  taskTitle: string;
  countComment: number;
  boardTitle: string;
  columnTitle: string;
  userName: string;
  date: string;
  message: string;
}

type MainFeedCommentProps = {
  item: IDataComments;
};

const MainFeedComment: React.FC<MainFeedCommentProps> = ({item}) => {
  const {
    boardId,
    taskId,
    taskTitle,
    countComment,
    boardTitle,
    columnTitle,
    userName,
    date,
    message
  } = item;
  return (
    <li className={classes['item-task']}>
      <div className={classes['item-task__info']}>
        <Link to={`/${taskId}`} className={classes['link']}>
          <h4 className={classes['link__name']}>{taskTitle}</h4>
          <div className={classes['link__content']}>
            <div className={classes['comment']}>
              <img className={classes['comment__icon']} src="/svg/comment.svg" alt="comment" />
              <span className={classes['comment__count']}>{countComment}</span>
            </div>
          </div>
        </Link>
        <div className={classes['info-board']}>
          <Link to={`/${boardId}`} className={classes['info-board__link']}>
            {boardTitle}:
          </Link>
          <span className="info-board__colum"> {columnTitle}</span>
        </div>
      </div>
      <div className={classes['item-task__comment']}>
        <div className={classes['user']}>
          <img className={classes['user__img']} src="/images/user.png" alt="user" />
          <div className={classes['user__info']}>
            <h5 className={classes['name']}>{userName}</h5>
            <span className={classes['date']}>{date}</span>
          </div>
        </div>
        <div className={classes['text']}>{message}</div>
      </div>
    </li>
  );
};

export default MainFeedComment;
