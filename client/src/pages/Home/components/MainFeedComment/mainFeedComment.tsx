import React from 'react';
import {Link} from 'react-router-dom';
import {CommentOutlined} from '@ant-design/icons';

import classes from './mainFeedComment.module.scss';

interface IUserList {
  id: string;
  login: string;
  name: string;
}
interface IDataComments {
  id: string;
  boardId: string;
  taskId: string;
  taskTitle: string;
  countComment: number;
  boardTitle: string;
  columnTitle: string;
  userList: IUserList[];
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
    userList,
    userName,
    date,
    message
  } = item;

  const renderUserList = userList.map((item: IUserList) => {
    const {id, name, login} = item;
    return (
      <li key={id} className={classes['user-list__icon']} title={`${name} @${login}`}>
        {name.slice(0, 1).toLocaleUpperCase()}
      </li>
    );
  });

  return (
    <li className={classes['item-task']}>
      <Link to={`/currentBoard/${boardId}`} className={classes['item-task__info']}>
        <div className={classes['link']}>
          <h4 className={classes['link__name']}>{taskTitle}</h4>
          <div className={classes['link__content']}>
            <div className={classes['comment']}>
              <CommentOutlined className={classes['comment__icon']} />
              <span className={classes['comment__count']}>{countComment}</span>
            </div>
            <ul className={classes['user-list']}>{renderUserList}</ul>
          </div>
        </div>
        <div className={classes['info-board']}>
          <div className={classes['info-board__link']}>
            {boardTitle}:
          </div>
          <span className="info-board__colum"> {columnTitle}</span>
        </div>
      </Link>
      <div className={classes['item-task__comment']}>
        <div className={classes['user']}>
          <span className={classes['user__icon']}>{userName.slice(0, 1).toLocaleUpperCase()}</span>
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
