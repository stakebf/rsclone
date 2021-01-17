import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { 
  CloseCircleOutlined, 
  OrderedListOutlined,
  CarryOutOutlined,
  CreditCardOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { renameCard, removeCard } from '../../../../../redux/actions';
import classes from './CardInfo.module.scss';
import Description from './Description';
import Todo from './Todo';

const CardInfo:React.FC<any> = ({ 
    columnId,
    closeCardInfo, 
    cardId,
    cardTitle,
    cardDescription = '',
    cardOrder,
    userId,
    todo = [],
    cardComments = [],
    tags = [],
    background,
    renameCard, removeCard },
    ) => {
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const [isCardRename, setIsCardRename] = useState<boolean>(false);

  const renameCardKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!newCardTitle.trim() || cardTitle === newCardTitle) {
        return;
      }

      renameCard(columnId, cardId, newCardTitle);
      setIsCardRename(false);
    }
  };

  const closeRenameCardKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setIsCardRename(false);
    }
  };

  const renameCardChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewCardTitle(e.target.value);
  }

  const renameCardClickHandler = () => {
    setNewCardTitle(cardTitle);
    setIsCardRename(true);
  };

  const removeCardClickHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    setIsCardRename(false);
    removeCard(columnId, cardId);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.contentWrapper}>
        <Button 
          danger
          className={classes.btnClose}
          onClick={closeCardInfo}
        >
          <CloseCircleOutlined />
        </Button>
        <Popconfirm
          title="Вы действительно хотите удалить эту карточку"
          onConfirm={removeCardClickHandler}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className={classes.deleteIcon}/>
        </Popconfirm>
        <div className={classes.cardTitleWrapper}>
          <CreditCardOutlined className={classes.cardIcon}/>
          {!isCardRename && <h2 
            className={classes.cardTitle}
            onClick={renameCardClickHandler}  
          >
            {cardTitle}
          </h2>}
          {isCardRename && <input 
            className={classes.cardTitleInput} 
            onKeyPress={renameCardKeypressHandler}
            onKeyDown={closeRenameCardKeydownHandler}
            onChange={renameCardChangeHandler}
            value={newCardTitle}
            placeholder='Введите название карточки'
            autoFocus
          />}
        </div>
        <div>
          <div>
            <Description 
              columnId={columnId}
              cardId={cardId}
              cardDescription={cardDescription}
              cardOrder={cardOrder}
            />
            <Todo />
            <div>
              <h3><OrderedListOutlined /> Действия</h3>
            </div>
          </div>
          <div>
            <ul>
              <li>li 1</li>
              <li>li 2</li>
              <li>li 3</li>
              <li>li 4</li>
              <li>li 5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    renameCard: (
      columnId:string, 
      cardId:string, 
      newCardTitle:string
    ) => dispatch(renameCard(columnId, cardId, newCardTitle)),
    removeCard: (columnId:string, cardId:string) => dispatch(removeCard(columnId, cardId))
  }
}

export default connect(null, mapDispatchStateToProps)(CardInfo);
