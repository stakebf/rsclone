import React from 'react';
import {Link} from 'react-router-dom';
import classes from './boardPanel.module.scss';

interface ICurrentBoard {
  id: string;
  background: string;
  title: string;
  isFavorite: boolean;
}

type BoardPanelProps = {
  item: ICurrentBoard;
};

const BoardPanel: React.FC<BoardPanelProps> = ({item}) => {
  const {title, isFavorite} = item;
  return <div>Panel</div>;
};

export default BoardPanel;
