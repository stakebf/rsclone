import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  ADD_NEW_CARD,
  ADD_DESCRIPTION,
  RENAME_COLUMN,
  REMOVE_COLUMN,
  RENAME_CARD,
  REMOVE_CARD,
  ADD_TODOS_TITLE,
  ADD_TODO,
  SET_TODO_COMPLETE,
  REMOVE_TODO,
  CHANGE_TODO_TITLE,
  CHANGE_TODOS_TITLE
} from '../actions/actionTypes';

const getCurrentColumn = (state, action) => {
  const columnIndex = state.board.columns.findIndex((item) => item.id === action.payload.id);
  const copy = {...state.board.columns[columnIndex]};

  return {
    columnIndex,
    copy
  }
};

const initialState = {
  loading: false,
  error: null,
  board: {
    id: '',
    title: '',
    usersList: [],
    columns: []
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BOARD_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    
    case FETCH_BOARD_SUCCESS: {
      return {
        ...state,
        loading: false,
        board: {
          ...action.payload
        }
      };
    }
    
    case FETCH_BOARD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    
    case ADD_NEW_COLUMN: {
      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns,
            ...action.payload
          ]
        }
      };
    }
    
    case RENAME_COLUMN: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      copy.title = action.payload.title;

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }
    
    case REMOVE_COLUMN: {
      const columns = state.board.columns.filter((item) => item.id !== action.payload);

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...columns
          ]
        }
      };
    }
    
    case ADD_NEW_CARD: {
      const { columnIndex, copy } = getCurrentColumn(state, action);

      let taskList;
      if (state.board.columns[columnIndex].taskList) {
        taskList = [...state.board.columns[columnIndex].taskList, {...action.payload.task}];
      } else {
        taskList = [{...action.payload.task}];
      }
      
      copy.taskList = [...taskList];

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    case RENAME_CARD: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const cardIndex = copy.taskList.findIndex((item) => item.id === action.payload.taskId);
      copy.taskList[cardIndex].title = action.payload.newTaskTitle;

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }
    
    case REMOVE_CARD: {
      const { columnIndex } = getCurrentColumn(state, action);
      const cards = state.board.columns[columnIndex].taskList.filter((item) => item.id !== action.payload.taskId);

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {
              ...state.board.columns[columnIndex],
              taskList: [
                ...cards
              ]
            },
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }
    
    case ADD_DESCRIPTION: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.description = action.payload.description;

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }
    
    case ADD_TODOS_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.todos.title = action.payload.title;

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }
    
    case ADD_TODO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.todos.todo = [
        ...card.todos.todo,
        {
          id: action.payload.todoId,
          title: action.payload.title,
          isComplete: action.payload.isComplete
        }
      ];

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    case SET_TODO_COMPLETE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const currentTodo = card.todos.todo.find((item) => item.id === action.payload.todoId);
      currentTodo.isComplete = action.payload.isComplete;
      console.log(copy);

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    case REMOVE_TODO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.todos.todo = card.todos.todo.filter((item) => item.id !== action.payload.todoId);

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    case CHANGE_TODO_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const currentTodo = card.todos.todo.find((item) => item.id === action.payload.todoId);
      currentTodo.title = action.payload.title;

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    case CHANGE_TODOS_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      console.log(card);
      card.todos.title = '';
      card.todos.todo = [];

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    }

    default: 
      return state;
  }
}

export default reducer;

/* 
{
  columnId?: string,
  columnTitle?: string,
  order?: number,
  cards?: [
    {
      cardId?: string,
      cardTitle?: string,
      userId?: string,
      cardDescription?: string,
      cardOrder?: number,
      todo?: [
        {
          todoId?: string,
          todoTitle?: string,
          isComplete?: boolean
        }
      ],
      cardComments?: [
        {
          commentId?: string,
          userName?: string,
          date?: string,
          message?: string
        }
      ],
      tags?: string[],
      background?: string
    }
  ]
}
*/
