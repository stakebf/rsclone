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

import { addTodosTitle, addTodo, setTodoInfo, removeTodo, removeTodos } from '../../../../../../redux/actions';
import { Store } from '../../../../../../redux/store/store';
import classes from './Todo.module.scss';

const Todo:React.FC<any> = ({ 
    columnId,
    taskId, 
    todos, 
    addTodosTitle, 
    addTodo,
    setTodoInfo,
    removeTodo,
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

  const todosChangeHandler:any = (e: React.ChangeEvent<HTMLInputElement>, setItem:any):void => {
    setItem(e.target.value);
  };

  const closeTodosClickHandler:any = (isSet:any):void => {
    isSet(false);
  };

  const createTodos:any = (setTitle?:any, setIsset?:any):void => {
    setTitle('');
    setIsset(true);
  };

  const closeTodosKeydownHandler:any = (e: React.KeyboardEvent<HTMLInputElement>, isSet:any):void => {
    if (e.key ===  'Escape') {
      setEditableTodoId('');
      isSet(false);
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

      add(columnId, taskId, todos[0]._id, title, isComplete, todoId);
      isSet(false);
      setEditableTodoId('');
    }
  };

  const addNewTodo = () => {
    setTodoTitle('');
    setIsTodoCreation(true);
  };

  const onCheckTodoChangeHandler = (e:any, todoId:string, title:string):void => {
    setTodoInfo(columnId, taskId, todos[0]._id, title, e.target.checked, todoId);
  };
  
  const progressBarWidth = !todos[0].todo.length ? 0 : (todos[0].todo.filter((item:any) => item.isComplete).length / todos[0].todo.length * 100);
  
  const editTodoTitleClickHandler = () => {
    setTodosTitle(todos[0].title);
    setIsTodosEdit(true);
  };
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>
          <CarryOutOutlined /> Задачи 
          {!isTodosEdit && <b
            onClick={editTodoTitleClickHandler}
          >
            {todos[0].title}
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
        {todos && todos[0] && !todos[0].title && !isSetTodosTitle && <Button 
          type="default"
          className={classes.btnCreateTodo}
          onClick={() => createTodos(setTodosTitle, setIsSetTodosTitle)}
        >
          <PlusCircleOutlined /> Чек-лист
        </Button>}
        {todos && todos[0] && todos[0].title && <Popconfirm
          title="Вы действительно хотите удалить чек-лист ?"
          onConfirm={() => removeTodos(columnId, taskId, todos[0]._id)}
          okText="Да"
          cancelText="Нет"
        >
          <DeleteOutlined className={classes.deleteIcon}/>
        </Popconfirm>}
      </div>
      {todos && todos[0] && todos[0].title.trim() && <div className={classes.progressBlock}>
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
        {todos && todos[0] && !!todos[0].todo.length && todos[0].todo.map((item:any) => <div key={item._id} className={classes.todoItem}>
          <Checkbox 
            checked={item.isComplete}
            onChange={(e) => onCheckTodoChangeHandler(e, item._id, item.title)}
            className={classes.checker}
          />
          <span 
            className={`${classes.todoTitle} ${item.isComplete && classes.checkedItem}`}
          >
            {(editableTodoId !== item._id) && item.title}
            {isTodoEdit && (editableTodoId === item._id) && <input 
              className={classes.todoItemEditInput}
              onChange={(e) => todosChangeHandler(e, setNewTodoTitle)}
              onKeyDown={(e) => closeTodosKeydownHandler(e, setIsTodoEdit)}
              onKeyPress={(e) => createTodosKeypressHandler(e, newTodoTitle, setTodoInfo, setIsTodoEdit, false, item._id)}
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
                      setEditableTodoId(item._id);
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
                      onConfirm={() => removeTodo(columnId, taskId, item._id, todos[0]._id)}
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
        {todos && todos[0] && todos[0].title.trim() && isTodoCreation && <div className={classes.creationTodoWrapper}>
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
        {todos && todos[0] && todos[0].title.trim() && !isTodoCreation && <Button 
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
    addTodosTitle: (columnId:string, taskId:string, todosId:string, title:string) => dispatch(addTodosTitle(
      columnId, taskId, todosId, title
    )),
    addTodo: (columnId:string, taskId:string, todosId:string, title:string, isComplete:boolean) => dispatch(addTodo(
      columnId, taskId, todosId, title, isComplete
    )), 
    setTodoInfo: (columnId:string, taskId:string, todosId:string, title:string, isComplete:boolean, todoId:string) => dispatch(setTodoInfo(
      columnId, taskId, todosId, title, isComplete, todoId
    )),
    removeTodo: (columnId:string, taskId:string, todoId:string, todosId:string) => dispatch(removeTodo(
      columnId, taskId, todoId, todosId
    )),
    removeTodos: (columnId:string, taskId:string, todosId: string) => dispatch(removeTodos(
      columnId, taskId, todosId
    )),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Todo);
