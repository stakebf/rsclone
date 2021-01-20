import React, {useState, useEffect, useMemo} from 'react';
import BoardItem from '../BoardItem';
import BoardAddItem from '../BoardAddItem';
import MainApiService from '../../../../services/MainApiService';

import classes from './boardList.module.scss';

interface IBoardItem {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

const BoardList: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [dataBoards, setDataBoards] = useState([]);
  const [typesBoard, setTypesBoard] = useState([
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

  useEffect(() => {
    api.getBoards().then((data) => setDataBoards(data));
  }, [api, setDataBoards]);

  useEffect(() => {
    if (!showPopup) {
      const newTypeBoard = typesBoard.map((elem, i) => {
        elem.check = i === 0 ? true : false;
        return elem;
      });
      setTypesBoard(newTypeBoard);
    }
  }, [setTypesBoard, showPopup]);

  const onAddedBoard = (title: string, background: string): void => {
    api
      .postBoards({
        title,
        background,
        admin: '5419127b-4546-4e6f-ad44-cf9ffebb0d29', // TODO idUSre
        isFavorite: false
      })
      .catch((error) => console.log(error));
    api
      .getBoards()
      .then((data) => setDataBoards(data))
      .catch((error) => console.log(error));
  };

  const onFavorite = (item: IBoardItem) => {
    const {background, title, id, isFavorite} = item;
    api.putBoards({isFavorite: !isFavorite}, id).then((data) => console.log(data));
    console.log(id);
  };

  const elements = dataBoards.map((item) => {
    const {id} = item;
    return <BoardItem key={id} item={item} onFavorite={onFavorite} />;
  });

  return (
    <>
      <div className={classes['all-boards']}>
        <div className={classes.head}>
          <img className={classes['head-icon']} src="/svg/user.svg" alt="user" />
          <h4 className={classes['head-title']}>Ваши доски</h4>
        </div>
        <div className={classes['content']}>
          <ul className={classes['list-boards']}>
            {elements}
            <li
              className={classes['add-item-list']}
              onClick={() => {
                setShowPopup(true);
              }}
            >
              <span>Создать доску</span>
            </li>
          </ul>
        </div>
      </div>
      {showPopup && (
        <BoardAddItem
          onAddedBoard={onAddedBoard}
          setShowPopup={setShowPopup}
          typesBoard={typesBoard}
          setTypesBoard={setTypesBoard}
        />
      )}
    </>
  );
};

export default BoardList;
