import React, {useState, useEffect, useMemo, useCallback} from 'react';
import BoardItem from '../BoardItem';
import BoardAddItem from '../BoardAddItem';
import MainApiService from '../../../../services/MainApiService';
import {StarOutlined, UserOutlined, LoadingOutlined} from '@ant-design/icons';

import classes from './boardList.module.scss';

interface IBoardItem {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

const BoardList: React.FC = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [dataBoards, setDataBoards] = useState([]);
  const [loadBoards, setLoadBoards] = useState(false);
  const [loadNewBoard, setLoadNewBoard] = useState(false);
  const [typesBoards, setTypesBoards] = useState([
    {id: 1, background: '/images/bg_board_1.jpg', check: true},
    {id: 2, background: '/images/bg_board_2.jpg', check: false},
    {id: 3, background: '/images/bg_board_3.jpg', check: false},
    {id: 4, background: '/images/bg_board_4.jpg', check: false},
    {id: 5, background: 'rgb(137, 96, 158)', check: false},
    {id: 6, background: 'rgb(0, 121, 191)', check: false},
    {id: 7, background: 'rgb(210, 144, 52)', check: false},
    {id: 8, background: 'rgb(81, 152, 57)', check: false},
    {id: 9, background: 'rgb(176, 70, 50)', check: false}
  ]);

  const api = useMemo(() => new MainApiService(), []);

  const getBoardsForUser = useCallback(
    (setLoadElem?: any) => {
      if (setLoadElem) setLoadElem(true);
      api
        .getBoardsAll()
        .then((data) => {
          const curUserId = localStorage.getItem('rsclone_userId');
          const userDataBoards = data.filter((el: any) => {
            return el.userList.some((user: any) => user.id === curUserId);
          });
          setDataBoards(userDataBoards);
        })
        .catch((error) => console.log(error))
        .finally(() => (setLoadElem ? setLoadElem(false) : null));
    },
    [api]
  );

  useEffect(() => {
    getBoardsForUser(setLoadBoards);
    return () => setDataBoards([]);
  }, [getBoardsForUser, setDataBoards]);

  useEffect(() => {
    (function resetTypesBoards() {
      if (!showWindow) {
        const newTypeBoard = typesBoards.map((elem, i) => {
          elem.check = i === 0 ? true : false;
          return elem;
        });
        setTypesBoards(newTypeBoard);
      }
    })();
  }, [setTypesBoards, showWindow]);

  const onAddedBoard = (title: string, background: string) => {
    setLoadNewBoard(true);
    api
      .postBoard({
        title,
        background,
        admin: localStorage.getItem('rsclone_userId'),
        isFavorite: false
      })
      .then(() => getBoardsForUser(setLoadNewBoard))
      .catch((error) => console.log(error));
  };

  const onFavorite = (item: IBoardItem, setLoadStar: any): void => {
    setLoadStar(true);
    const {id, isFavorite} = item;
    api
      .putBoard({isFavorite: !isFavorite}, id)
      .then(() => getBoardsForUser(setLoadStar))
      .catch((error) => console.log(error));
  };

  const transformPathForBg = (path: string): string => {
    const transform = (path: string, num: number): string => {
      const typeFile = path.slice(path.length - num, path.length);
      const nameFile = path.slice(0, path.length - num);
      return `${nameFile}min.${typeFile}`;
    };

    if (path.endsWith('jpg' || 'png')) return transform(path, 3);
    if (path.endsWith('jpeg')) return transform(path, 4);
    return path;
  };

  const renderBoardsAll = dataBoards.map((item: IBoardItem) => {
    return (
      <BoardItem
        key={item.id}
        item={item}
        onFavorite={onFavorite}
        transformPathForBg={transformPathForBg}
      />
    );
  });

  const renderBoardsFavorite = () => {
    const dataFavorite = dataBoards.filter((item: IBoardItem) => item.isFavorite === true);

    return dataFavorite.map((item: IBoardItem) => {
      return (
        <BoardItem
          key={item.id}
          item={item}
          onFavorite={onFavorite}
          transformPathForBg={transformPathForBg}
        />
      );
    });
  };

  if (loadBoards) return <LoadingOutlined className={classes['spinner-all-boards']} />;

  return (
    <>
      <div className={classes['all-boards']}>
        {renderBoardsFavorite().length > 0 ? (
          <>
            <div className={classes.head}>
              <StarOutlined className={classes['head-icon']} />
              <h4 className={classes['head-title']}>Отмеченные доски</h4>
            </div>
            <div className={classes['content']}>
              <ul className={classes['list-boards']}>{renderBoardsFavorite()}</ul>
            </div>
          </>
        ) : null}
        <>
          <div className={classes.head}>
            <UserOutlined className={classes['head-icon']} />
            <h4 className={classes['head-title']}>Ваши доски</h4>
          </div>
          <div className={classes['content']}>
            <ul className={classes['list-boards']}>
              {renderBoardsAll}
              <li
                className={classes['add-item-list']}
                onClick={() => {
                  setShowWindow(true);
                }}
              >
                {loadNewBoard ? (
                  <LoadingOutlined className={classes['spinner-new-board']} />
                ) : (
                  <span>Создать доску</span>
                )}
              </li>
            </ul>
          </div>
        </>
      </div>
      {showWindow && (
        <BoardAddItem
          onAddedBoard={onAddedBoard}
          setShowWindow={setShowWindow}
          typesBoards={typesBoards}
          setTypesBoards={setTypesBoards}
          transformPathForBg={transformPathForBg}
        />
      )}
    </>
  );
};

export default BoardList;
