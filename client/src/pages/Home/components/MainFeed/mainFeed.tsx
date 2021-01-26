import React, {useState, useMemo, useCallback, useEffect} from 'react';
import MainFeedComment from '../MainFeedComment';
import {HeartOutlined} from '@ant-design/icons';
import MainApiService from '../../../../services/MainApiService';

import classes from './mainFeed.module.scss';

const MainFeed: React.FC = () => {
  const [dataBoards, setDataComments] = useState([]);

  const api = useMemo(() => new MainApiService(), []);

  const getCommentsAll = useCallback(() => {
    api
      .getBoardsAll()
      .then((data) => {
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
        setDataComments(listComments);
      })
      .catch((error) => console.log(error));
  }, [api]);

  useEffect(() => {
    getCommentsAll();

    return () => setDataComments([]);
  }, [getCommentsAll, setDataComments]);

  const elements = dataBoards.map((item) => {
    const {id} = item;
    return <MainFeedComment key={id} item={item} />;
  });

  return (
    <div className={classes['main-feed']}>
      <div className={classes['main-feed__head']}>
        <HeartOutlined className={classes['icon']} />
        <h4 className={classes['title']}>Важные события</h4>
      </div>
      <ul className={classes['main-feed__list']}>{elements}</ul>
    </div>
  );
};

export default MainFeed;
