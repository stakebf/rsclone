import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Store } from '../../../../redux/store/store';
import { addCard } from '../../../../redux/actions';
import Card from './Card';
import { createCard, ColumnProps } from '../../../../helpers/creationHelper';
import classes from './Column.module.scss';

let incr = 0;

const Column:React.FC<any> = ({ columnId, columnTitle, order, cards = [], addCard }) => {
  // console.log('props', columnId, columnTitle, order);
  // const [cards, setCards] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [isCreation, setIsCreation] = useState<boolean>(false);

  const btnAddClassNames: Array<any> = [classes.btnCreateCard, isCreation ? classes.hide : ''];

  const addCardClickHandler = ():void => {
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

  const createCardKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      endOfCreation();
    }
  }

  const closeCreateCardKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setIsCreation(false);
    }
  }

  const endOfCreation = ():void => {
    setIsCreation(false);
    addCard(columnId, createCard(`someID${++incr}`, title, '1', '', 5)); // потом переделать это При попадании на страницу - эти данные будут сразу
    // console.log('addCardClickHandler - createBoard', title);
    setTitle('');
  }

  return (
    <div
      className={classes.column}
    >
      <div className={classes.columnEdit}>
        <Button 
          type="default"
          onClick={addCardClickHandler}
        >
          <EllipsisOutlined />
        </Button>
      </div>
      <span className={classes.columnTitle}>{columnTitle}</span>
      <span>{columnId}</span>
      <span>{order}</span>

      <div className={classes.content}>
        {!!cards.length && cards.map((card:any) => {
          // console.log('1.MYcards DESCRIPTION', card.description);
          return (
            <Card 
              {...card}
              columnId={columnId}
              key={`${card.cardId}_${card.cardTitle}`}
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
            // console.log('create Card');
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
    addCard: (columnId:string, card:any[]) => dispatch(addCard(columnId, card))
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Column);
