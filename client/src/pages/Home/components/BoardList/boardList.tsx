import React, {useState, useEffect, useMemo, useCallback} from 'react';
import BoardItem from '../BoardItem';
import BoardAddItem from '../BoardAddItem';
import MainApiService from '../../../../services/MainApiService';
import {StarOutlined, UserOutlined, LoadingOutlined} from '@ant-design/icons';

import classes from './boardList.module.scss';
import 'antd/dist/antd.css';

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

  const getDataBoardAll = useCallback(
    (setLoadBoards?: any) => {
      if (setLoadBoards) setLoadBoards(true);
      api
        .getBoardsAll()
        .then((data) => setDataBoards(data))
        .catch((error) => console.log(error))
        .finally(() => (setLoadBoards ? setLoadBoards(false) : null));
    },
    [api]
  );

  useEffect(() => {
    getDataBoardAll(setLoadBoards);
    return () => setDataBoards([]);
  }, [getDataBoardAll, setDataBoards]);

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
        admin: localStorage.getItem('userId'),
        isFavorite: false
      })
      .then(() => getDataBoardAll())
      .catch((error) => console.log(error))
      .finally(() => setLoadNewBoard(false));
  };

  const onFavorite = (item: IBoardItem, setLoadStar: any): void => {
    setLoadStar(true);
    const {id, isFavorite} = item;
    api
      .putBoard({isFavorite: !isFavorite}, id)
      .then(() => getDataBoardAll())
      .catch((error) => console.log(error))
      .finally(() => setLoadStar(false));
  };

  const elementsAll = dataBoards.map((item: IBoardItem) => {
    return <BoardItem key={item.id} item={item} onFavorite={onFavorite} />;
  });

  const elementsFavorite = () => {
    const dataFavorite = dataBoards.filter((item: IBoardItem) => item.isFavorite === true);

    return dataFavorite.map((item: IBoardItem) => {
      return <BoardItem key={item.id} item={item} onFavorite={onFavorite} />;
    });
  };

  if (loadBoards) return <LoadingOutlined className={classes['spinner-all-boards']} />;

  return (
    <>
      <div className={classes['all-boards']}>
        {elementsFavorite().length > 0 ? (
          <>
            <div className={classes.head}>
              <StarOutlined className={classes['head-icon']} />
              <h4 className={classes['head-title']}>Отмеченные доски</h4>
            </div>
            <div className={classes['content']}>
              <ul className={classes['list-boards']}>{elementsFavorite()}</ul>
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
              {elementsAll}
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
        />
      )}
    </>
  );
};

export default BoardList;
