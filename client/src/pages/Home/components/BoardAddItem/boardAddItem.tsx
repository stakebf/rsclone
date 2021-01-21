import React, {useState, useEffect} from 'react';
import TypeBgItem from './typeBgItem';
import {CloseOutlined} from '@ant-design/icons';

import classes from './boardAddItem.module.scss';

interface ITypesBoards {
  id: number;
  background: string;
  check: boolean;
}

type BoardAddItemProps = {
  onAddedBoard(name: string, background: String): void;
  setShowPopup(value: boolean): void;
  typesBoards: ITypesBoards[];
  setTypesBoards(s: any): void;
};

const BoardAddItem: React.FC<BoardAddItemProps> = ({
  onAddedBoard,
  setShowPopup,
  typesBoards,
  setTypesBoards
}) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [currentItemBg, setCurrentItemBg] = useState('rgb(0, 0, 0)');
  const [name, setName] = useState('');

  useEffect(() => {
    setCurrentItemBg(typesBoards[0].background);
  }, [setCurrentItemBg]);

  const setValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    setDisabledBtn(e.target.value.length ? false : true);
  };

  const onSend = (): void => {
    onAddedBoard(name, currentItemBg);
    setShowPopup(false);
  };

  const closePopup = (e: any) => {
    if (e.target.hasAttribute('data-close-popup')) {
      setShowPopup(false);
    }
  };

  const onToggle = (id: number) => {
    const newTypeBoard = typesBoards.map((elem) => {
      elem.check = elem.id === id ? true : false;
      return elem;
    });
    setTypesBoards(newTypeBoard);

    const item = typesBoards.find((item) => item.id === id);
    if (item) {
      setCurrentItemBg(item.background);
    }
  };

  const elementsSelectBg = typesBoards.map((item) => {
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
            currentItemBg.endsWith('jpg' || 'jpeg' || 'png')
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
          <CloseOutlined className={classes['btn-close']} />
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
