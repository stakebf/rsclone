import React from 'react';
import { Button, Popconfirm } from 'antd';
import { 
  CloseCircleOutlined, 
  CarryOutOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import classes from './Todo.module.scss';

const Todo = () => {
  return (
    <div>
      <h3><CarryOutOutlined /> Задачи</h3>
    </div>
  );
};

export default Todo;
