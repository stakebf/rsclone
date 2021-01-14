import React, {useState, useEffect} from 'react';
import SelectBgItem from './selectBgItem';

import classes from './addBoardItem.module.scss';

type AddBoardItemProps = {
  onAddedBoard(name: string, bg: string, isImg: boolean): void;
  setShowPopup(value: boolean): void;
};

const AddBoardItem: React.FC<AddBoardItemProps> = ({onAddedBoard, setShowPopup}) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [currentItemBg, setCurrentItemBg] = useState('rgb(0, 0, 0)');
  const [currentItem_isImg, setCurrentItem_isImg] = useState(false);
  const [name, setName] = useState('');
  const [dataAddBoard, setDataAddBoard] = useState([
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

  useEffect(() => {
    setCurrentItemBg(dataAddBoard[0].bg);
    setCurrentItem_isImg(dataAddBoard[0].isImg);
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
    const newDataAddBoard = dataAddBoard.map((elem) => {
      elem.check = elem.id === id ? true : false;
      return elem;
    });
    setDataAddBoard(newDataAddBoard);

    const item = dataAddBoard.find((item) => item.id === id);
    if (item) {
      setCurrentItemBg(item.bg);
      setCurrentItem_isImg(item.isImg);
    }
  };

  const elementsSelectBg = dataAddBoard.map((item) => {
    return <SelectBgItem key={item.id} item={item} onToggle={onToggle} />;
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

export default AddBoardItem;
