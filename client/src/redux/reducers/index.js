import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  ADD_NEW_TASKLIST,
  ADD_DESCRIPTION,
  RENAME_COLUMN,
  REMOVE_COLUMN,
  RENAME_TASKLIST,
  REMOVE_TASKLIST,
  ADD_TODOS_TITLE,
  ADD_TODO,
  SET_TODO_COMPLETE,
  REMOVE_TODO,
  CHANGE_TODO_TITLE,
  CHANGE_TODOS_TITLE,
  SET_DATE,
  SET_CURRENT_USER,
  ADD_NEW_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  ADD_TAG,
  REMOVE_TAG
} from '../actions/actionTypes';

const getCurrentColumn = (state, action) => {
  const columnIndex = state.board.columns.findIndex((item) => item.id === action.payload.id);
  const copy = {...state.board.columns[columnIndex]};

  return {
    columnIndex,
    copy
  }
};

const updateState = (state, columnIndex, copy) => {
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
};

const initialState = {
  loading: false,
  error: null,
  board: {
    id: '',
    title: '',
    currentUser: {},
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

      return updateState(state, columnIndex, copy);
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
    
    case ADD_NEW_TASKLIST: {
      const { columnIndex, copy } = getCurrentColumn(state, action);

      let taskList;
      if (state.board.columns[columnIndex].taskList) {
        taskList = [...state.board.columns[columnIndex].taskList, {...action.payload.task}];
      } else {
        taskList = [{...action.payload.task}];
      }
      
      copy.taskList = [...taskList];

      return updateState(state, columnIndex, copy);
    }

    case RENAME_TASKLIST: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const cardIndex = copy.taskList.findIndex((item) => item.id === action.payload.taskId);
      copy.taskList[cardIndex].title = action.payload.newTaskTitle;

      console.log(state);

      return updateState(state, columnIndex, copy);
    }
    
    case REMOVE_TASKLIST: {
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

      return updateState(state, columnIndex, copy);
    }
    
    case ADD_TODOS_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.todos.title = action.payload.title;

      return updateState(state, columnIndex, copy);
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

      return updateState(state, columnIndex, copy);
    }

    case SET_TODO_COMPLETE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const currentTodo = card.todos.todo.find((item) => item.id === action.payload.todoId);
      currentTodo.isComplete = action.payload.isComplete;
      console.log(copy);

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_TODO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.todos.todo = card.todos.todo.filter((item) => item.id !== action.payload.todoId);

      return updateState(state, columnIndex, copy);
    }

    case CHANGE_TODO_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const currentTodo = card.todos.todo.find((item) => item.id === action.payload.todoId);
      currentTodo.title = action.payload.title;

      return updateState(state, columnIndex, copy);
    }

    case CHANGE_TODOS_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      console.log(card);
      card.todos.title = '';
      card.todos.todo = [];

      return updateState(state, columnIndex, copy);
    }

    case SET_DATE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.date = action.payload.date;
      console.log(action.payload.date);

      return updateState(state, columnIndex, copy);
    }

    case SET_CURRENT_USER: {
      console.log(action.payload);
      return {
        ...state,
        board: {
          ...state.board,
          currentUser: {
            ...action.payload
          }
        }
      };
    }

    case ADD_NEW_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const { userName, userId, date, commentId, message } = action.payload;

      card.comments = [
        ...card.comments,
        {
          message,
          userName,
          userId,
          date,
          id: commentId
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.comments = card.comments.filter((item) => item.id !== action.payload.commentId);

      return updateState(state, columnIndex, copy);
    }

    case EDIT_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      const currentComment = card.comments.find((item) => item.id === action.payload.commentId);
      currentComment.date = action.payload.date;
      currentComment.message = action.payload.message;
      console.log('currentComment', currentComment);

      return updateState(state, columnIndex, copy);
    }

    case ADD_TAG: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);

      card.tags = [
        ...card.tags,
        {
          id: action.payload.tagId,
          color: action.payload.color
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_TAG: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item.id === action.payload.taskId);
      card.tags = card.tags.filter((item) => item.id !== action.payload.tagId);

      return updateState(state, columnIndex, copy);
    }

    default: 
      return state;
  }
}

export default reducer;
