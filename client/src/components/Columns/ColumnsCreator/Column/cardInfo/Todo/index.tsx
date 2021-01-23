import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Checkbox, Menu, Dropdown } from 'antd';
import { 
  CloseCircleOutlined, 
  PlusCircleOutlined, 
  EditOutlined,
  DeleteOutlined,
  CarryOutOutlined
} from '@ant-design/icons';

import { addTodosTitle, addTodo, setTodoComplete, removeTodo, changeTodoTitle, removeTodos } from '../../../../../../redux/actions';
import { Store } from '../../../../../../redux/store/store';
import classes from './Todo.module.scss';

const Todo:React.FC<any> = ({ 
    columnId,
    taskId, 
    columns, 
    todos: {title, todo}, 
    addTodosTitle, 
    addTodo,
    setTodoComplete,
    removeTodo,
    changeTodoTitle,
    removeTodos
     }) => {
  const [todosTitle, setTodosTitle] = useState<string>('');
  const [isTodosEdit, setIsTodosEdit] = useState<boolean>(false);
  const [isSetTodosTitle, setIsSetTodosTitle] = useState<boolean>(false);

  const [isTodoCreation, setIsTodoCreation] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [isTodoEdit, setIsTodoEdit] = useState<boolean>(false);
  const [editableTodoId, setEditableTodoId] = useState<string>('');

  // ! при ринейме - нельзя чтобы был пустой todos = '', Так же - это будет update
  const todosChangeHandler:any = (e: React.ChangeEvent<HTMLInputElement>, setItem:any):void => {
    setItem(e.target.value);
    // setTodosTitle(e.target.value);
  };

  const closeTodosClickHandler:any = (isSet:any):void => {
    console.log('clicked');
    isSet(false);
    // setIsSetTodosTitle(false);
  };

  const createTodos:any = (setTitle?:any, setIsset?:any):void => {
    setTitle('');
    setIsset(true);
    // setTodosTitle('');
    // setIsSetTodosTitle(true);
  };

  const closeTodosKeydownHandler:any = (e: React.KeyboardEvent<HTMLInputElement>, isSet:any):void => {
    if (e.key ===  'Escape') {
      setEditableTodoId('');
      isSet(false);
      // setIsSetTodosTitle(false);
    }
  };

  const createTodosKeypressHandler:any = (
      e: React.KeyboardEvent<HTMLInputElement>, 
      title:string, 
      add:any, 
      isSet:any,
      isComplete?: boolean,
      todoId?:string
      ):void => {
    if (e.key === 'Enter') {
      if (!title.trim()) {
        return;
      }

      add(columnId, taskId, title, isComplete, todoId);
      isSet(false);
      setEditableTodoId('');
    }
    /* if (e.key === 'Enter') {
      if (!todosTitle.trim()) {
        return;
      }

      addTodosTitle(columnId, taskId, todosTitle);
      setIsSetTodosTitle(false);
    } */
  };

  const addNewTodo = () => {
    setTodoTitle('');
    setIsTodoCreation(true);
  };

  const onCheckTodoChangeHandler = (e:any, todoId:string):void => {
    setTodoComplete(columnId, taskId, todoId, e.target.checked);
  };
  
  const progressBarWidth = !todo.length ? 0 : (todo.filter((item:any) => item.isComplete).length / todo.length * 100);
  
  const editTodoTitleClickHandler = () => {
    setTodosTitle(title);
    setIsTodosEdit(true);
  };
  
  return (
    <div className={classes.wrapper}>
      {console.log(columns)}
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>
          <CarryOutOutlined /> Задачи 
          {!isTodosEdit && <b
            onClick={editTodoTitleClickHandler}
          >
            {title}
          </b>}
          {isTodosEdit && <input 
            className={classes.todoEditInput}
            onChange={(e) => todosChangeHandler(e, setTodosTitle)}
            onKeyDown={(e) => closeTodosKeydownHandler(e, setIsTodosEdit)}
            onKeyPress={(e) => createTodosKeypressHandler(e, todosTitle, addTodosTitle, setIsTodosEdit)}
            value={todosTitle}
            autoFocus
            placeholder='Введите название чек-листа'
          />}
        </h3>
        {!title && !isSetTodosTitle && <Button 
          type="default"
          className={classes.btnCreateTodo}
          onClick={() => createTodos(setTodosTitle, setIsSetTodosTitle)}
        >
          <PlusCircleOutlined /> Чек-лист
        </Button>}
        {title && <Popconfirm
          title="Вы действительно хотите удалить чек-лист ?"
          onConfirm={() => removeTodos(columnId, taskId)}
          okText="Да"
          cancelText="Нет"
        >
          <DeleteOutlined className={classes.deleteIcon}/>
        </Popconfirm>}
      </div>
      {title.trim() && <div className={classes.progressBlock}>
        <span className={classes.progressPercents}>{Math.floor(progressBarWidth)} %</span>
        <div className={classes.progressBarWrapper}>
          <div 
            className={classes.progressBar}
            style={{
              width: `${progressBarWidth}%`,
          }}>
          </div>  
        </div>
      </div>}
      <div className={classes.todoList}>
        {isSetTodosTitle && <div className={classes.creationTodoWrapper}>
          <Button 
            danger
            onClick={() => closeTodosClickHandler(setIsSetTodosTitle)}
            className={classes.btnCloseCreationTodo}
          >
            <CloseCircleOutlined />
          </Button>
          <input 
            className={classes.todosInput}
            onChange={(e) => todosChangeHandler(e, setTodosTitle)}
            onKeyDown={(e) => closeTodosKeydownHandler(e, setIsSetTodosTitle)}
            onKeyPress={(e) => createTodosKeypressHandler(e, todosTitle, addTodosTitle, setIsSetTodosTitle)}
            value={todosTitle}
            autoFocus
            placeholder='Введите название чек-листа'
          />
        </div>}
        {!!todo.length && todo.map((item:any) => <div key={item.id} className={classes.todoItem}>
          <Checkbox 
            checked={item.isComplete}
            onChange={(e) => onCheckTodoChangeHandler(e, item.id)}
            className={classes.checker}
          />
          <span 
            className={`${classes.todoTitle} ${item.isComplete && classes.checkedItem}`}
            onClick={() => console.log('click')}
          >
            {(editableTodoId !== item.id) && item.title}
            {isTodoEdit && (editableTodoId === item.id) && <input 
              className={classes.todoItemEditInput}
              onChange={(e) => todosChangeHandler(e, setNewTodoTitle)}
              onKeyDown={(e) => closeTodosKeydownHandler(e, setIsTodoEdit)}
              onKeyPress={(e) => createTodosKeypressHandler(e, newTodoTitle, changeTodoTitle, setIsTodoEdit, false, item.id)}
              value={newTodoTitle}
              autoFocus
              placeholder='Введите название задачи'
            />}
          </span>
          <Dropdown 
            overlay={
              <Menu 
                style={{textAlign: 'center'}}
              >
                <Menu.Item>
                  <Button 
                    type="primary" 
                    ghost
                    onClick={() => {
                      setEditableTodoId(item.id);
                      setNewTodoTitle(item.title);
                      setIsTodoEdit(true);
                    }}
                  >
                    Переименовать
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    className={classes.btnDeleteTodoItem}
                  >
                    <Popconfirm
                      title="Вы действительно хотите удалить эту карточку"
                      onConfirm={() => removeTodo(columnId, taskId, item.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <DeleteOutlined className={classes.deleteIcon}/>
                    </Popconfirm>
                  </Button>
                </Menu.Item>
            </Menu>
            } 
            placement="bottomLeft" arrow>
            <Button className={classes.btnEditTodo}><EditOutlined /></Button>
          </Dropdown>
        </div>)}
        {title.trim() && isTodoCreation && <div className={classes.creationTodoWrapper}>
          <Button 
            danger
            onClick={() => closeTodosClickHandler(setIsTodoCreation)}
            className={classes.btnCloseCreationTodo}
          >
            <CloseCircleOutlined />
          </Button>
          <input 
            className={classes.todosInput}
            onChange={(e) => todosChangeHandler(e, setTodoTitle)}
            onKeyDown={(e) => closeTodosKeydownHandler(e, setIsTodoCreation)}
            onKeyPress={(e) => createTodosKeypressHandler(e, todoTitle, addTodo, setIsTodoCreation, false)}
            value={todoTitle}
            autoFocus
            placeholder='Введите название задачи'
          />
        </div>}
        {title.trim() && !isTodoCreation && <Button 
            type="default"
            className={classes.btnAddTodo}
            onClick={addNewTodo}
          >
            <PlusCircleOutlined /> Добавить элемент
          </Button>}
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
    addTodosTitle: (columnId:string, taskId:string, title:string) => dispatch(addTodosTitle(
      columnId, taskId, title
    )),
    addTodo: (columnId:string, taskId:string, title:string, isComplete:boolean) => dispatch(addTodo(
      columnId, taskId, title, isComplete
    )), 
    setTodoComplete: (columnId:string, taskId:string, todoId:string, isComplete:boolean) => dispatch(setTodoComplete(
      columnId, taskId, todoId, isComplete 
    )),
    removeTodo: (columnId:string, taskId:string, todoId:string) => dispatch(removeTodo(
      columnId, taskId, todoId 
    )),
    changeTodoTitle: (columnId:string, taskId:string, title:string, isComplete:boolean, todoId:string) => dispatch(changeTodoTitle(
      columnId, taskId, title, isComplete, todoId
    )),
    removeTodos: (columnId:string, taskId:string) => dispatch(removeTodos(
      columnId, taskId 
    )),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Todo);
