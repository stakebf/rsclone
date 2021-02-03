import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Droppable } from 'react-beautiful-dnd';

import { Store } from '../../../../redux/store/store';
import { addTaskList, renameColumn, removeColumn } from '../../../../redux/actions';
import Card from './Card';
import classes from './Column.module.scss';

const Column:React.FC<any> = ({ 
    boardId,
    _id,
    title,
    // order,
    taskList = [],
    addTaskList,
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
    addTaskList(_id, columnTitle);
    setColumnTitle('');
  };

  const renameColumnKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!newColumnTitle.trim() || title === newColumnTitle) {
        return;
      }

      renameColumn(boardId, _id, newColumnTitle);
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
    removeColumn(boardId, _id);
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

      <div className={classes.content}>
        <Droppable droppableId={_id} key={_id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : '',
                  borderRadius: 5,
                  padding: 4,
                }}
              >
                {!!taskList.length && taskList.map((task:any, index:number) => {
                  return (
                    <Card 
                      {...task}
                      columnId={_id}
                      key={`${task._id}`}
                      index={index}
                    />
                  )
                })}
                {provided.placeholder}
                <Button 
                  type="default"
                  style={{
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
                      color: '#fff',
                      marginRight: '5px'
                    }}
                    className={classes.addCardBtn}
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
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    columns: state.board.columns,
    boardId: state.board.id
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    addTaskList: (_id:string, title:string) => dispatch(addTaskList(_id, title)),
    renameColumn: (boardId:string, _id:string, newColumnTitle:string) => dispatch(renameColumn(boardId, _id, newColumnTitle)),
    removeColumn: (boardId:string, _id:string) => dispatch(removeColumn(boardId, _id)),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Column);
