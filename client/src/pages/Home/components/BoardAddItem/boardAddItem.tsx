import React, {useState, useEffect} from 'react';
import TypeBgItem from './typeBgItem';

import classes from './boardAddItem.module.scss';

interface ITypesBoards {
  id: number;
  bg: string;
  check: boolean;
  isImg: boolean;
}

type BoardAddItemProps = {
  onAddedBoard(name: string, bg: string, isImg: boolean): void;
  setShowPopup(value: boolean): void;
  typesBoard: ITypesBoards[];
  setTypesBoard(s: any): void;
};

const BoardAddItem: React.FC<BoardAddItemProps> = ({
  onAddedBoard,
  setShowPopup,
  typesBoard,
  setTypesBoard
}) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [currentItemBg, setCurrentItemBg] = useState('rgb(0, 0, 0)');
  const [currentItem_isImg, setCurrentItem_isImg] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setCurrentItemBg(typesBoard[0].bg);
    setCurrentItem_isImg(typesBoard[0].isImg);
  }, [setCurrentItemBg, setCurrentItem_isImg]);

  const setValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    setDisabledBtn(e.target.value.length ? false : true);
  };

  const onSend = (): void => {
    onAddedBoard(name, currentItemBg, currentItem_isImg);
    setShowPopup(false);
  };

  const closePopup = (e: any) => {
    if (e.target.hasAttribute('data-close-popup')) {
      setShowPopup(false);
    }
  };

  const onToggle = (id: number) => {
    const newTypeBoard = typesBoard.map((elem) => {
      elem.check = elem.id === id ? true : false;
      return elem;
    });
    setTypesBoard(newTypeBoard);

    const item = typesBoard.find((item) => item.id === id);
    if (item) {
      setCurrentItemBg(item.bg);
      setCurrentItem_isImg(item.isImg);
    }
  };

  const elementsSelectBg = typesBoard.map((item) => {
    return <TypeBgItem key={item.id} item={item} onToggle={onToggle} />;
  });

  return (
    <div
      className={classes['overlay']}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => closePopup(e)}
      data-close-popup
    >
      <div className={classes['popup']}>
        <div
          className={classes['popup-board']}
          style={
            currentItem_isImg
              ? {backgroundImage: `url(${currentItemBg})`}
              : {backgroundColor: currentItemBg}
          }
        >
          <input
            className={classes['field']}
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setValue(e)}
            placeholder="Добавить заголовок доски"
            autoFocus
          />
          <svg
            className={classes['btn-close']}
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            data-close-popup
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.586 12L5.293 6.707a1 1 0 011.414-1.414L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <ul className={classes['list-bg']}>{elementsSelectBg}</ul>
        <button
          onClick={() => onSend()}
          className={`${classes['popup-btn']} ${disabledBtn ? classes['disabled'] : ''}`}
          type="button"
          disabled={disabledBtn ? true : false}
        >
          Создать доску
        </button>
      </div>
    </div>
  );
};

export default BoardAddItem;
