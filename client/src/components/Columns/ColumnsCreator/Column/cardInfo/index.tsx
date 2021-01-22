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
    id,
    title,
    description,
    order,
    todos,
    cardComments = [],
    tags = [],
    userList = [],
    background,
    closeCardInfo, 
    renameCard, removeCard }) => {
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const [isCardRename, setIsCardRename] = useState<boolean>(false);

  const renameCardKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!newCardTitle.trim() || title === newCardTitle) {
        return;
      }

      renameCard(columnId, id, newCardTitle);
      // console.log(title);
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
    setNewCardTitle(title);
    setIsCardRename(true);
  };

  const removeCardClickHandler = () => {
    setIsCardRename(false);
    removeCard(columnId, id);
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
          okText="Да"
          cancelText="Нет"
        >
          <DeleteOutlined className={classes.deleteIcon}/>
        </Popconfirm>
        <div className={classes.cardTitleWrapper}>
          <CreditCardOutlined className={classes.cardIcon}/>
          {!isCardRename && <h2 
            className={classes.cardTitle}
            onClick={renameCardClickHandler}  
          >
            {title}
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
              taskId={id}
              description={description}
              order={order}
            />
            <Todo 
              columnId={columnId} 
              taskId={id}
              todos={todos}
            />
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
      taskId:string, 
      newCardTitle:string
    ) => dispatch(renameCard(columnId, taskId, newCardTitle)),
    removeCard: (columnId:string, taskId:string) => dispatch(removeCard(columnId, taskId))
  }
}

export default connect(null, mapDispatchStateToProps)(CardInfo);
