import React from 'react';
import ColumnCreator from './ColumnsCreator';
import './Columns.scss';

const Columns: React.FC<any> = ({boardId}) => {
  return (
    <div>
       <ColumnCreator boardId={boardId}/>
    </div>
  );
};

export default Columns;
