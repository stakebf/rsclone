export interface ColumnProps {
  id?: string, 
  title?: string,
  order?: number
  cards?: []
}

export interface CardProps {
  columnId: string,
  _id: string,
  title: string,
  description?: string,
  usersList?: any[],
  order?: number,
  todos: any[],
  date: string,
  comments: any[],
  tags: any[],
  index: number
}

export interface CardInfoProps {
  columnId?: string,
  cardId?: string,
  cardTitle?: string,
  userId?: string,
  cardDescription?: string,
  cardOrder?: number,
  todo?: any[],
  comments?: any[],
  tags?: any[],
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
    usersList: any[],
    order: number,
    todos: object,
    date: string,
    comments: any[],
    tags: any[],
  ) => {
  return {
      id,
      title,
      description,
      usersList,
      order,
      todos,
      date,
      comments,
      tags,
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
