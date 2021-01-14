import React, {useState} from 'react';
import BoardItem from '../BoardItem';
import AddBoardItem from '../AddBoardItem';

import classes from './boardList.module.scss';

interface IDataBoards {
  id: number;
  bg: string;
  name: string;
  isImg: boolean;
}

type BoardListProps = {
  dataBoards: IDataBoards[];
  onAddedBoard(name: string, bg: string, isImg: boolean): void;
};

const BoardList: React.FC<BoardListProps> = ({dataBoards, onAddedBoard}) => {
  const [showPopup, setShowPopup] = useState(false);

  const elements = dataBoards.map((item) => {
    const {id, bg, name, isImg} = item;
    return <BoardItem key={id} bg={bg} name={name} isImg={isImg} />;
  });

  return (
    <>
      <div className={classes['all-boards']}>
        <div className={classes.block}>
          <div className={classes.head}>
            <img className={classes['icon-user']} src="svg/user-regular.svg" alt="user-regular" />
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
      {showPopup && <AddBoardItem onAddedBoard={onAddedBoard} setShowPopup={setShowPopup} />}
    </>
  );
};

export default BoardList;
