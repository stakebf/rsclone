import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import classes from './Column.module.scss';
import { ColumnProps } from '../../../../helpers/creationHelper';


const Column:React.FC<ColumnProps> = ({columnId, columnTitle, order}) => {
  console.log('props', columnId, columnTitle, order);

  return (
    <div
      className={classes.column}
    >
      <span>{columnTitle}</span>
      <span>{columnId}</span>
      <span>{order}</span>

      <div>
        <Button 
          type="default"
          style={{
            backgroundColor: 'green', 
            color: '#fff',
            marginRight: '5px'
          }}
          onClick={() => {
            console.log('create Card');
          }}
          className={classes.btnCreateCard}
        >
            <PlusCircleOutlined />
            Добавить карточку
          </Button>
      </div>
    </div>
  );
};

export default Column;
