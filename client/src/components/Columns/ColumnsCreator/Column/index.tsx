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
    id,
    title,
    order,
    taskList = [],
    addCard,
    renameColumn,
    removeColumn
   }) => {
  const [columnTitle, setColumnTitle] = useState<string>('');
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [isColumnRename, setIsColumnRename] = useState<boolean>(false);

  const btnAddClassNames: Array<any> = [classes.btnCreateCard, isCreation ? classes.hide : ''];

  const addCardClickHandler = ():void => {
    if (!columnTitle) {
      return;
    }

    endOfCreation();
  };

  const closeCreationClickHandler = ():void => {
    setIsCreation(false);
  };

  const inputNnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setColumnTitle(e.target.value);
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
    addCard(id, createCard(`someID_card${++incr}`, columnTitle, '', [], 5, {title: '', id: `id${incr}`, todo: []})); // ! потом переделать это При попадании на страницу - эти данные будут сразу
    // ! так же - тут будет сразу отправляться запрос на create для todos: {title: '', todo: []};
    setColumnTitle('');
  };

  const renameColumnKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      // console.log(title, newColumnTitle);
      if (!newColumnTitle.trim() || title === newColumnTitle) {
        return;
      }

      renameColumn(id, newColumnTitle);
      setIsColumnRename(false);
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
    setNewColumnTitle(title);
    setIsColumnRename(true);
  };

  const removeColumnClickHandler = () => {
    removeColumn(id);
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
      >{title}</span>}
      {isColumnRename && <input 
        className={classes.columnTitleInput} 
        onKeyPress={renameColumnKeypressHandler}
        onKeyDown={closeRenameColumnKeydownHandler}
        onChange={renameColumnChangeHandler}
        value={newColumnTitle}
        placeholder='Введите название колонки'
        autoFocus
      />}
      <span>{id}</span>
      <span>{order}</span>

      <div className={classes.content}>
        {!!taskList.length && taskList.map((task:any) => {
          return (
            <Card 
              {...task}
              columnId={id}
              key={`${task.id}`}
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
    addCard: (id:string, card:any[]) => dispatch(addCard(id, card)),
    renameColumn: (id:string, newTitle:string) => dispatch(renameColumn(id, newTitle)),
    removeColumn: (id:string) => dispatch(removeColumn(id)),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Column);
