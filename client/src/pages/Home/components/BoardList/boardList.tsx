import React, {useState, useEffect /* useMemo */} from 'react';
import BoardItem from '../BoardItem';
import BoardAddItem from '../BoardAddItem';

import classes from './boardList.module.scss';

const BoardList: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentBoards, setCurrentBoards] = useState([
    {id: 1, bg: '/images/bg_board_1.jpg', name: 'moon', isImg: true},
    {id: 2, bg: '/images/bg_board_2.jpg', name: 'wood', isImg: true},
    {id: 3, bg: '/images/bg_board_3.jpg', name: 'space', isImg: true},
    {id: 4, bg: '/images/bg_board_4.jpg', name: 'winter', isImg: true},
    {id: 5, bg: 'rgb(137, 96, 158)', name: 'purple', isImg: false},
    {id: 6, bg: 'rgb(0, 121, 191)', name: 'blue', isImg: false},
    {id: 7, bg: 'rgb(210, 144, 52)', name: 'orange', isImg: false},
    {id: 8, bg: 'rgb(81, 152, 57)', name: 'green', isImg: false},
    {id: 9, bg: 'rgb(176, 70, 50)', name: 'red', isImg: false}
  ]);
  const [typesBoard, setTypesBoard] = useState([
    {id: 1, bg: '/images/bg_board_1.jpg', check: true, isImg: true},
    {id: 2, bg: '/images/bg_board_2.jpg', check: false, isImg: true},
    {id: 3, bg: '/images/bg_board_3.jpg', check: false, isImg: true},
    {id: 4, bg: '/images/bg_board_4.jpg', check: false, isImg: true},
    {id: 5, bg: 'rgb(137, 96, 158)', check: false, isImg: false},
    {id: 6, bg: 'rgb(0, 121, 191)', check: false, isImg: false},
    {id: 7, bg: 'rgb(210, 144, 52)', check: false, isImg: false},
    {id: 8, bg: 'rgb(81, 152, 57)', check: false, isImg: false},
    {id: 9, bg: 'rgb(176, 70, 50)', check: false, isImg: false}
  ]);

  /* const x = useMemo(() => typesBoard, []); */

  useEffect(() => {
    if (!showPopup) {
      const newTypeBoard = typesBoard.map((elem, i) => {
        elem.check = i === 0 ? true : false;
        return elem;
      });
      setTypesBoard(newTypeBoard);
    }
  }, [setTypesBoard, showPopup]);

  const createBoard = (name: string, bg: string, isImg: boolean) => {
    return {
      bg,
      name,
      isImg,
      id: ++currentBoards.length
    };
  };

  const onAddedBoard = (name: string, bg: string, isImg: boolean): void => {
    setCurrentBoards([...currentBoards, createBoard(name, bg, isImg)]);
  };

  const elements = currentBoards.map((item) => {
    const {id} = item;
    return <BoardItem key={id} item={item} />;
  });

  return (
    <>
      <div className={classes['all-boards']}>
        <div className={classes.block}>
          <div className={classes.head}>
            <img className={classes['icon-user']} src="/svg/user-regular.svg" alt="user-regular" />
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
