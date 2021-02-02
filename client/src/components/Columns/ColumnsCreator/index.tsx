import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';

import { fetchBoard, addColumn, setCurrentUser } from '../../../redux/actions';
import { Store } from '../../../redux/store/store';
import classes from './ColumnsCreator.module.scss';
import Column from './Column';

const COLUMN_LENGTH = 275;

type PathParamsType = {
  boardId: string,
}

type PropsType = RouteComponentProps<PathParamsType> & {
  error: any,
  boardId: string,
  board: any,
  fetchBoard: any,
  addColumn: any,
  setCurrentUser: any
}

const ColumnCreator: React.FC<PropsType> = ({ error, boardId: id, board: { columns = [], id: boardId }, fetchBoard, addColumn, setCurrentUser }) => {
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    fetchBoard(id);
    setCurrentUser();
  }, [fetchBoard, setCurrentUser, id]);

  if (error) {
    window.location.href = '/boards';
  }

  const btnAddClassNames: Array<string> = [classes.btnAddColumn, isCreation ? classes.hide : ''];

  const createColumnsClickHandler = (e: React.SyntheticEvent):void => {
    setIsCreation(true);
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
    setTitle(e.target.value);
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
    addColumn(boardId, title);
    setTitle('');
  }

  return (
    <div className={classes.container}>
      {!!columns.length && columns.map((item:any) => <Column 
        {...item}
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
    board: state.board,
    error: state.error
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    fetchBoard: (boardId: string) => dispatch(fetchBoard(boardId)),
    addColumn: (boardId:string, title:string) => dispatch(addColumn(boardId, title)),
    setCurrentUser: () => dispatch(setCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchStateToProps)(ColumnCreator));
