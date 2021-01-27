import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { 
  CloseCircleOutlined, 
  CreditCardOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { renameTaskList, removeTaskList } from '../../../../../redux/actions';
import classes from './CardInfo.module.scss';
import Description from './Description';
import Todo from './Todo';
import DatePicker from './DateSetter';
import Comments from './Comments';
import Tags from './Tags';
import AdditionalUsers from './AdditionalUsers';

const CardInfo:React.FC<any> = ({ 
    columnId,
    id,
    title,
    description,
    order,
    todos,
    comments,
    tags,
    usersList,
    date,
    closeCardInfo, 
    renameTaskList, removeTaskList }) => {
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const [isCardRename, setIsCardRename] = useState<boolean>(false);

  const renameCardKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!newCardTitle.trim() || title === newCardTitle) {
        return;
      }

      renameTaskList(columnId, id, newCardTitle);
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
    removeTaskList(columnId, id);
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
            <AdditionalUsers 
              columnId={columnId}
              taskId={id}
              usersList={usersList}
            />
            <Tags 
              columnId={columnId}
              taskId={id}
              tags={tags}
            />
            <DatePicker 
              columnId={columnId} 
              taskId={id}
              date={date}
            />
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
            <Comments 
              columnId={columnId}
              taskId={id}
              comments={comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    renameTaskList: (
      columnId:string, 
      taskId:string, 
      newCardTitle:string
    ) => dispatch(renameTaskList(columnId, taskId, newCardTitle)),
    removeTaskList: (columnId:string, taskId:string) => dispatch(removeTaskList(columnId, taskId))
  }
}

export default connect(null, mapDispatchStateToProps)(CardInfo);
