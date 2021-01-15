import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { 
  createBoard,
  createColumn,
  createCard,
  createTodo,
  createCardComment
} from '../../../helpers/creationHelper';
import { Board } from './Board';
import classes from './ColumnsCreator.module.scss';
import Column from './Column';

const ColumnCreator: React.FC = () => {
  // const [boards, setBoard] = useState<Board>({});
  const [board, setBoard] = useState<Board>({
    id: 'sime board ID',
    title: 'board title',
    usersList: [],
  });
  const [columns, setColumns] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [cardComments, setCardComments] = useState<any[]>([]);
  
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    // забираем борд
  }, []);

  const btnAddClassNames: Array<any> = [classes.btnAddColumn, isCreation ? classes.hide : ''];

  const createColumnsClickHandler = (e: React.SyntheticEvent):void => {
    console.log(e);
    setIsCreation(true);
    console.log(isCreation);
  }

  const addColumnClickHandler = ():void => {
    if (!title) {
      return;
    }

    endOfCreation();
  }

  const closeCreationClickHandler = ():void => {
    setIsCreation(false);
  }

  
  const inputNnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { value } = e.target;
    setTitle(value);
    console.log(value);
  }

  const createColumnKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      endOfCreation();
    }
  }

  const closeCreateColumnKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setIsCreation(false);
    }
  }

  const endOfCreation = ():void => {
    setIsCreation(false);
    setColumns([...columns, createColumn('someID', title, 0)]); // потом переделать это При попадании на страницу - эти данные будут сразу
    console.log('addColumnClickHandler - createBoard', title);
    setTitle('');
  }

  return (
    <div className={classes.container}>
      {!!columns.length && columns.map((column) => {
        return (
          <Column 
            {...column}
            key={`${column.columnId}_${column.columnTitle}`}
          />
        )
      })}
      <Button 
        type="default"
        onClick={createColumnsClickHandler}
        className={btnAddClassNames.join(' ')}
        style={{
          left: `${columns.length * 275}px`
        }}
      >
        <PlusCircleOutlined />
        {!!columns.length ? 'Добавьте еще одну колонку' : 'Добавить список'}
      </Button>
      {isCreation && (
        <div className={classes.creationWrapper}>
          <input 
            placeholder="Введите заголовок списка" 
            onChange={inputNnameChangeHandler}
            onKeyPress={createColumnKeypressHandler}
            onKeyDown={closeCreateColumnKeydownHandler}
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
            onClick={addColumnClickHandler}
          >
            <PlusCircleOutlined />
            Добавить список
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
};

export default ColumnCreator;
