import { Board } from '../components/Columns/ColumnsCreator/Board';

export interface ColumnProps {
  columnId?: string, 
  columnTitle?: string,
  order?: number
}

export interface CardProps {
  cardId?: string,
  cardTitle?: string,
  userId?: string,
  cardDescription?: string,
  cardOrder?: number
}

const createBoard = (id: string, title: string):Board => {
  return {
    id,
    title
  };
};

const createColumn = (
    columnId: string, 
    columnTitle: string,
    order: number
  ):ColumnProps => {
  return {
      columnId,
      columnTitle,
      order
  };
};

const createCard = (
    cardId: string,
    cardTitle: string,
    userId: string,
    cardDescription: string,
    cardOrder: number,
  ):CardProps => {
  return {
      cardId,
      cardTitle,
      userId,
      cardDescription,
      cardOrder
  };
};

const createTodo = (
  todoId?: string,
  todoTitle?: string,
  isComplete?: boolean
):object => {
  return {
    todoId,
    todoTitle,
    isComplete
  }
}

const createCardComment = (
  commentId?: string,
  userName?: string,
  date?: string,
  message?: string
):object => {
  return {
    commentId,
    userName,
    date,
    message
  }
}

export {
  createBoard,
  createColumn,
  createCard,
  createTodo,
  createCardComment,
}
