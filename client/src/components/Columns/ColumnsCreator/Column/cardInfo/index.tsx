import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import classes from './CardInfo.module.scss';
import Description from './Description';

const CardInfo:React.FC<any> = ({ 
    columnId,
    closeCardInfo, 
    cardId,
    cardTitle,
    cardDescription = '',
    cardOrder,
    userId,
    todo = [],
    cardComments = [],
    tags = [],
    background },
    ) => {

  return (
    <div className={classes.popup}>
      <div className={classes.contentWrapper}>
        <Button 
          danger
          className={classes.btnClose}
          onClick={closeCardInfo}
        >
          <CloseCircleOutlined />
        </Button>
        <h2>{cardTitle}</h2>
        <div>
          <div>
            <Description 
              columnId={columnId}
              cardId={cardId}
              cardDescription={cardDescription}
              cardOrder={cardOrder}
            />
            <div>
              <h3>Todos</h3>
            </div>
            <div>
              <h3>Comments</h3>
            </div>
          </div>
          <div>
            <ul>
              <li>li 1</li>
              <li>li 2</li>
              <li>li 3</li>
              <li>li 4</li>
              <li>li 5</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
