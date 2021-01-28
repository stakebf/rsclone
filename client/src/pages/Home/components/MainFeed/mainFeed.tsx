import React, {useState, useMemo, useCallback, useEffect} from 'react';
import MainFeedComment from '../MainFeedComment';
import {HeartOutlined, LoadingOutlined} from '@ant-design/icons';
import MainApiService from '../../../../services/MainApiService';

import classes from './mainFeed.module.scss';

const MainFeed: React.FC = () => {
  const [dataBoards, setDataComments] = useState([]);
  const [load, setLoad] = useState(false);

  const api = useMemo(() => new MainApiService(), []);

  const getUserComments = (data: any) => {
    const listComments: any = [];
    for (let board of data) {
      if (board.columns.length) {
        for (let column of board.columns) {
          if (Object.keys(column).length) {
            if (column.taskList.length) {
              for (let task of column.taskList) {
                if (task.comments.length) {
                  for (let elem of task.comments) {
                    listComments.push({
                      id: elem._id,
                      boardId: board.id,
                      taskId: task._id,
                      boardTitle: board.title,
                      columnTitle: column.title,
                      taskTitle: task.title,
                      userList: task.userList,
                      message: elem.message,
                      date: elem.date,
                      userName: elem.userName,
                      countComment: task.comments.length
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    return listComments;
  };

  const getDataComments = useCallback(() => {
    setLoad(true);
    api
      .getBoardsAll()
      .then((data) => {
        const curUserId = localStorage.getItem('userId');
        const userDataBoards = data.filter((el: any) => {
          return el.userList.some((user: any) => user.id === curUserId);
        });
        setDataComments(getUserComments(userDataBoards));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, [api]);

  useEffect(() => {
    getDataComments();

    return () => setDataComments([]);
  }, [getDataComments, setDataComments]);

  const elements = dataBoards.map((item) => {
    const {id} = item;
    return <MainFeedComment key={id} item={item} />;
  });

  if (load) return <LoadingOutlined className={classes.spinner} />;

  return (
    <div className={classes['main-feed']}>
      <div className={classes['main-feed__head']}>
        <HeartOutlined className={classes['icon']} />
        <h4 className={classes['title']}>Важные события</h4>
      </div>
      {dataBoards.length ? (
        <ul className={classes['main-feed__list']}>{elements}</ul>
      ) : (
        <span className={classes['main-feed__message']}>У вас пока нету важных событий</span>
      )}
    </div>
  );
};

export default MainFeed;
