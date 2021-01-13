import React from 'react';
import BoardItem from '../BoardItem';

import classes from './boards.module.scss';

interface IDataBoards {
  id: number;
  bg: string;
  name: string;
}

type BoardsProps = {
  dataBoards: IDataBoards[];
};

const Boards: React.FC<BoardsProps> = ({dataBoards}) => {
  const elements = dataBoards.map((item) => {
    const {id, bg, name} = item;
    return <BoardItem key={id} bg={bg} name={name} />;
  });

  return (
    <div className={classes['all-boards']}>
      <div className={classes.block}>
        <h4 className={classes['title']}>Ваши доски</h4>
        <div className={classes['content']}>
          <ul className={classes['list-boards']}>{elements}</ul>
        </div>
      </div>
    </div>
  );
};

export default Boards;
