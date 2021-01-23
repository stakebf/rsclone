import { Board } from '../components/Columns/ColumnsCreator/Board';

export interface ColumnProps {
  id?: string, 
  title?: string,
  order?: number
  cards?: []
}

export interface CardProps {
  columnId: string,
  id: string,
  title: string,
  description?: string,
  userList?: any[],
  order?: number,
  todos: {
    title?: string,
    id?: string,
    todo: any[]
  },
  date: string
}

export interface CardInfoProps {
  columnId?: string,
  cardId?: string,
  cardTitle?: string,
  userId?: string,
  cardDescription?: string,
  cardOrder?: number,
  todo?: any[],
  cardComments?: any[],
  tags?: any[],
  background?: string,
  closeCardInfo: () => void,
  addDescription: (columnId?:string, cardId?:string, cardDescription?:string) => any
}

const createColumn = (
    id: string, 
    title: string,
    order: number
  ):ColumnProps => {
  return {
      id,
      title,
      order
  };
};

const createCard = (
    id: string,
    title: string,
    description: string,
    userList: any[],
    order: number,
    todos: object,
    date: string
  ) => {
  return {
      id,
      title,
      description,
      userList,
      order,
      todos,
      date
  };
};

const createTodos = (
  todoId?: string,
  todoTitle?: string,
) => {
  return {
    todoId,
    todoTitle,
  }
}

const createTodo = (
  id?: string,
  title?: string,
  isComplete?: boolean
) => {
  return {
    id,
    title,
    isComplete
  }
}

const createCardComment = (
  commentId?: string,
  userName?: string,
  date?: string,
  message?: string
) => {
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
  createTodos,
  createTodo,
  createCardComment,
}
