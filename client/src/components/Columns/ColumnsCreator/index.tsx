import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { fetchBoard, addColumn, setCurrentUser } from '../../../redux/actions';
import { createColumn } from '../../../helpers/creationHelper';
import { Store } from '../../../redux/store/store';
import classes from './ColumnsCreator.module.scss';
import Column from './Column';

// let incr = 0;
const COLUMN_LENGTH = 275;

const ColumnCreator: React.FC<any> = ({ board: { columns = [], id: boardId }, fetchBoard, addColumn, setCurrentUser }) => {
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    // ! забираем борд fetchBoard(тут будем вытягивать :id борда из урла)
    fetchBoard('af80495d-e6f7-45b5-8767-acbec79b480f');
    setCurrentUser();
  }, [fetchBoard, setCurrentUser]);

  const btnAddClassNames: Array<string> = [classes.btnAddColumn, isCreation ? classes.hide : ''];

  const createColumnsClickHandler = (e: React.SyntheticEvent):void => {
    // console.log(e);
    setIsCreation(true);
    // console.log(isCreation);
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
    // console.log(value);
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
    // addColumn([createColumn(`someID${++incr}`, title, 0,)]); // потом переделать это При попадании на страницу - эти данные будут сразу, я их по запросу буду забирать
    addColumn(boardId, title);
    // console.log('addColumnClickHandler - createBoard', title);
    setTitle('');
  }

  return (
    <div className={classes.container}>
      {console.log(columns)}
      {!!columns.length && columns.map((item:any) => <Column 
        {...item}
        // key={`${item._id}_${incr}`}
        key={item._id}
      />)}
      <Button
        type="default"
        onClick={createColumnsClickHandler}
        className={btnAddClassNames.join(' ')}
        style={{
          left: `${columns.length * COLUMN_LENGTH}px`
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

const mapStateToProps = (state: Store) => {
  return {
    board: state.board
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    fetchBoard: (boardId: string) => dispatch(fetchBoard(boardId)),
    addColumn: (boardId:string, title:string) => dispatch(addColumn(boardId, title)),
    setCurrentUser: () => dispatch(setCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(ColumnCreator);
