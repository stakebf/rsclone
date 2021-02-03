import React from 'react';
import ColumnCreator from './ColumnsCreator';
import BoardPanel from '../BoardPanel/Panel';
import Header from '../Header';
import './Columns.scss';

const Columns: React.FC<any> = ({boardId}) => {
  return (
    <div>
      <Header />
      <BoardPanel boardId={boardId} />
      <ColumnCreator boardId={boardId} />
    </div>
  );
};

export default Columns;
