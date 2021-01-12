import React, { useState } from 'react';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import classes from './CreateColumns.module.scss';

interface Board {
  id?: string,
  title?: string,
  usersList?: string[],
  columns?: [
    {
      columnId?: string,
      columnTitle?: string,
      order?: number,
      cards?: [
        {
          cartId?: string,
          cartTitle?: string,
          userId?: string,
          cartDescription?: string,
          cardOrder?: number,
          todo?: [
            {
              todoId?: string,
              todoTitle?: string,
              isComplete?: boolean
            }
          ],
          cartComments?: [
            {
              commentId?: string,
              userName?: string,
              date?: string,
              message?: string
            }
          ],
          tags?: string[],
          background?: string
        }
      ]
    }
  ]
}

const CreateColumns: React.FC = () => {
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');
  // const [columns, setColumns] = useState<Array<{ id: number, title: string }>>([]);
  const [board, setBoard] = useState<Board>({})

  const btnAddClassNames: Array<any> = [classes.btnAddColumn, isCreation ? classes.hide : ''];

  const createColumnsClickHandler = (e: React.SyntheticEvent):void => {
    console.log(e);
    setIsCreation(true);
    console.log(isCreation);
  }

  const addColumnClickHandler = ():void => {
    if (!columnName) {
      return;
    }

    setIsCreation(false);

    console.log(columnName);
    setColumnName('');
  }

  const closeCreationClickHandler = ():void => {
    setIsCreation(false);
  }

  const inputNnameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { value } = e.target;
    setColumnName(value);
    console.log(value);
  }

  return (
    <div className={classes.container}>
      <h1>Create columns</h1>
      <Button 
        type="default"
        onClick={createColumnsClickHandler}
        className={btnAddClassNames.join(' ')}
      >
        <PlusCircleOutlined />
        Добавить список
      </Button>
      {isCreation && (
        <div className={classes.creationWrapper}>
          <input 
            placeholder="Введите заголовок списка" 
            onChange={inputNnameChangeHandler}
            className={classes.creationInput}
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
      {/* <button 
        className={btnAddClassNames.join(' ')}
        type="button"
        onClick={btnCreateColumnsHandler}
      >
        Добавить список
      </button> */}
    </div>
  );
};

export default CreateColumns;
