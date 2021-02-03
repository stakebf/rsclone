import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import { fetchBoard, addColumn, setCurrentUser, refreshColumns } from '../../../redux/actions';
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
  setCurrentUser: any,
  refreshColumns: any
}

const ColumnCreator: React.FC<PropsType> = ({ 
  error, 
  boardId: id, 
  board: { columns = [], id: boardId, background }, 
  fetchBoard, 
  addColumn, 
  setCurrentUser, 
  refreshColumns }) => {
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    fetchBoard(id);
    setCurrentUser();

    document.body.style.background = background.indexOf('rgb') >= 0 ? background : `url(${background})`;

    return () => {
      document.body.style.background = '';
    }
  }, [fetchBoard, setCurrentUser, id, background]);

  if (error) {
    window.location.href = '/';
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

  const onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    refreshColumns(
      source,
      destination,
      result.draggableId
    );
  };

  return (
    <div className={classes.container}>
      {console.log(background)}
      <DragDropContext
        onDragEnd={(result:any) => onDragEnd(result)}
      >
        {!!columns.length && columns.map((item:any) => <Column 
          {...item}
          key={item._id}
        />)}
      </DragDropContext>
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
            className={classes.btnAddTaskList}
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
    setCurrentUser: () => dispatch(setCurrentUser()),
    refreshColumns: (source:any, destination:any, taskId:string) => dispatch(refreshColumns(source, destination, taskId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchStateToProps)(ColumnCreator));

