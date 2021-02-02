import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Input } from 'antd';
import classes from './BoardsList.module.scss';
import './Drawer.scss';

type Settings = {
  boards: Array<{name: string, id: string}>;
  visible: boolean;
  onClose: () => void;
}

const BoardsList: React.FC<Settings> = ({boards, visible, onClose}) => {
  const title = 'Доски';
  const inputPlaceholder = 'Поиск по названию...';
  
  function list() {
    const result: Array<React.ReactNode> = [];
    boards.forEach((board) => {
      if (board.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())) {
        const linkTo = `/currentBoard/${board.id}`;
        result.push(<Link to={linkTo} key={board.id} onClick={closeList}><p className={classes.link}>{board.name}</p></Link>);
      }
    });
    if (result.length) return result;
    return null;
  }

  function changeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function  closeList() {
    onClose();
    setInputValue('');
  }

  const [inputValue, setInputValue] = useState('');

  return (
    <Drawer
      className="boardList"
      title={title}
      placement="left"
      closable={true}
      onClose={closeList}
      visible={visible}
    >
    <Input 
      className={classes.input} 
      placeholder={inputPlaceholder} 
      onChange={changeInputValue} 
      style={{ width: '90%' }}
      value={inputValue}
    />
    {list()}
    </Drawer>    
  );
};

export default BoardsList;
