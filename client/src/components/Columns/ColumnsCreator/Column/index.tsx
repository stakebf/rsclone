import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Store } from '../../../../redux/store/store';
import { addCard, renameColumn, removeColumn } from '../../../../redux/actions';
import Card from './Card';
import { createCard } from '../../../../helpers/creationHelper';
import classes from './Column.module.scss';

let incr = 0; // TODO: потом убрать 

const Column:React.FC<any> = ({ 
    columnId, 
    columnTitle, 
    order, 
    cards = [], 
    addCard,
    renameColumn,
    removeColumn
   }) => {
  const [title, setTitle] = useState<string>('');
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [isColumnRename, setIsColumnRename] = useState<boolean>(false);

  const btnAddClassNames: Array<any> = [classes.btnCreateCard, isCreation ? classes.hide : ''];

  const addCardClickHandler = ():void => {
    if (!title) {
      return;
    }

    endOfCreation();
  };

  const closeCreationClickHandler = ():void => {
    setIsCreation(false);
  };

  const inputNnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value);
  };

  const createCardKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      endOfCreation();
    }
  };

  const closeCreateCardKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setIsCreation(false);
    }
  };

  const endOfCreation = ():void => {
    setIsCreation(false);
    addCard(columnId, createCard(`someID${++incr}`, title, '1', '', 5)); // потом переделать это При попадании на страницу - эти данные будут сразу
    setTitle('');
  };

  const renameColumnKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!newColumnTitle.trim() || columnTitle === newColumnTitle) {
        return;
      }

      renameColumn(columnId, newColumnTitle);
    }
  };

  const closeRenameColumnKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setIsColumnRename(false);
    }
  };

  const renameColumnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewColumnTitle(e.target.value);
  }

  const renameColumnClickHandler = () => {
    setNewColumnTitle(columnTitle);
    setIsColumnRename(true);
  };

  const removeColumnClickHandler = () => {
    removeColumn(columnId);
  };

  const editMenu = (
    <Menu 
      style={{textAlign: 'center'}}
    >
      <Menu.Item>
        <Button 
          type="primary" 
          ghost
          onClick={renameColumnClickHandler}
        >
          Переименовать
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button 
          onClick={removeColumnClickHandler}
          danger
        >
          Удалить колонку
        </Button>
      </Menu.Item>
  </Menu>
  );

  return (
    <div
      className={classes.column}
    >
      <div className={classes.columnEdit}>
        <Dropdown overlay={editMenu} placement="bottomLeft" arrow>
          <Button><EllipsisOutlined /></Button>
        </Dropdown>
      </div>
      {!isColumnRename && <span 
        className={classes.columnTitle}
        onClick={renameColumnClickHandler}
      >{columnTitle}</span>}
      {isColumnRename && <input 
        className={classes.columnTitleInput} 
        onKeyPress={renameColumnKeypressHandler}
        onKeyDown={closeRenameColumnKeydownHandler}
        onChange={renameColumnChangeHandler}
        value={newColumnTitle}
        placeholder='Введите название колонки'
        autoFocus
      />}
      <span>{columnId}</span>
      <span>{order}</span>

      <div className={classes.content}>
        {!!cards.length && cards.map((card:any) => {
          return (
            <Card 
              {...card}
              columnId={columnId}
              key={`${card.cardId}`}
            />
          )
        })}
        <Button 
          type="default"
          style={{
            backgroundColor: 'green', 
            color: '#fff',
            marginRight: '5px',
            borderRadius: '3px'
          }}
          className={btnAddClassNames.join(' ')}
          onClick={() => {
            setIsCreation(true);
          }}
        >
          <PlusCircleOutlined />
          Добавить карточку
        </Button>
        {isCreation && (
          <div className={classes.creationWrapper}>
            <input 
              placeholder="Введите заголовок списка" 
              onChange={inputNnameChangeHandler}
              onKeyPress={createCardKeypressHandler}
              onKeyDown={closeCreateCardKeydownHandler}
              className={classes.creationInput}
              autoFocus
            />
            <Button 
              type="default"
              style={{
                backgroundColor: 'green', 
                color: '#fff',
                marginRight: '5px'
              }}
              onClick={addCardClickHandler}
            >
              <PlusCircleOutlined />
              Добавить карточку
            </Button>
            <Button 
              type="default"
              style={{color: 'red'}}
              onClick={closeCreationClickHandler}
            >
              <CloseCircleOutlined />
            </Button>
        </div>
      )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    columns: state.board.columns
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    addCard: (columnId:string, card:any[]) => dispatch(addCard(columnId, card)),
    renameColumn: (columnId:string, newTitle:string) => dispatch(renameColumn(columnId, newTitle)),
    removeColumn: (columnId:string) => dispatch(removeColumn(columnId)),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Column);
