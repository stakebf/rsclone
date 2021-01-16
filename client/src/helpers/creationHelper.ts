import { Board } from '../components/Columns/ColumnsCreator/Board';

export interface ColumnProps {
  columnId?: string, 
  columnTitle?: string,
  order?: number
  cards?: []
}

export interface CardProps {
  columnId?: string,
  cardId?: string,
  cardTitle?: string,
  userId?: string,
  cardDescription?: string,
  cardOrder?: number
}

export interface CardInfoProps {
  columnId?: string,
  cardId?: string,
  cardTitle?: string,
  userId?: string,
  cartDescription?: string,
  cardOrder?: number,
  todo?: any[],
  cardComments?: any[],
  tags?: any[],
  background?: string,
  closeCardInfo: () => void
}

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
    userId?: string,
    cardDescription?: string,
    cardOrder?: number,
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
  createColumn,
  createCard,
  createTodo,
  createCardComment,
}
