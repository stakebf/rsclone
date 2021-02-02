import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  RENAME_COLUMN,
  REMOVE_COLUMN,
  ADD_NEW_TASKLIST,
  ADD_DESCRIPTION,
  RENAME_TASKLIST,
  REMOVE_TASKLIST,
  ADD_TODOS_TITLE,
  ADD_TODO,
  SET_TODO_INFO,
  REMOVE_TODO,
  CHANGE_TODO_TITLE,
  CHANGE_TODOS_TITLE,
  SET_DATE,
  SET_CURRENT_USER,
  ADD_NEW_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  ADD_TAG,
  REMOVE_TAG,
  ATTACH_USER_TO_TASK,
  REMOVE_USER_FROM_TASK,
  SET_NEW_TODOS,
  REFRESH_COLUMNS,
  UPDATE_USERS_LIST
} from '../actions/actionTypes';

export const getCurrentColumn = (state, action) => {
  const columnIndex = state.board.columns.findIndex((item) => item._id === action.payload.id);
  const copy = {...state.board.columns[columnIndex]};

  return {
    columnIndex,
    copy
  }
};

export const updateState = (state, columnIndex, copy) => {
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
  currentUser: {},
  board: {
    id: '',
    title: '',
    userList: [],
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
            {
              ...action.payload
            }
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
      const columns = state.board.columns.filter((item) => item._id !== action.payload);

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
        taskList = [...state.board.columns[columnIndex].taskList, {...action.payload.task, _id: action.payload.task.id}];
      } else {
        taskList = [{...action.payload.task, _id: action.payload.task.id}];
      }

      copy.taskList = [...taskList];

      return updateState(state, columnIndex, copy);
    }

    case RENAME_TASKLIST: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const cardIndex = copy.taskList.findIndex((item) => item._id === action.payload.taskId);
      copy.taskList[cardIndex].title = action.payload.newTaskTitle;

      return updateState(state, columnIndex, copy);
    }

    case SET_NEW_TODOS: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const cardIndex = copy.taskList.findIndex((item) => item._id === action.payload.taskId);
      copy.taskList[cardIndex].todos = [action.payload.todos];

      return updateState(state, columnIndex, copy);
    }
    
    case REMOVE_TASKLIST: {
      const { columnIndex } = getCurrentColumn(state, action);
      const cards = state.board.columns[columnIndex].taskList.filter((item) => item._id !== action.payload.taskId);

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
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.description = action.payload.description;

      return updateState(state, columnIndex, copy);
    }
    
    case ADD_TODOS_TITLE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.todos[0].title = action.payload.title;

      return updateState(state, columnIndex, copy);
    }
    
    case ADD_TODO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.todos[0].todo = [
        ...card.todos[0].todo,
        {
          _id: action.payload.todoId,
          title: action.payload.title,
          isComplete: action.payload.isComplete
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case SET_TODO_INFO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      const currentTodo = card.todos[0].todo.find((item) => item._id === action.payload.todoId);
      currentTodo.isComplete = action.payload.isComplete;
      currentTodo.title = action.payload.title;

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_TODO: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.todos[0].todo = card.todos[0].todo.filter((item) => item._id !== action.payload.todoId);

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
      card.todos.title = '';
      card.todos.todo = [];

      return updateState(state, columnIndex, copy);
    }

    case SET_DATE: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.date = action.payload.date;

      return updateState(state, columnIndex, copy);
    }

    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: {
          ...action.payload
        }
      };
    }

    case ADD_NEW_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      const { userName, userId, date, _id, message } = action.payload;

      card.comments = [
        ...card.comments,
        {
          message,
          userName,
          userId,
          date,
          _id
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.comments = card.comments.filter((item) => item._id !== action.payload.commentId);

      return updateState(state, columnIndex, copy);
    }

    case EDIT_COMMENT: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      const currentComment = card.comments.find((item) => item._id === action.payload.commentId);
      currentComment.date = action.payload.date;
      currentComment.message = action.payload.message;

      return updateState(state, columnIndex, copy);
    }

    case ADD_TAG: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);

      card.tags = [
        ...card.tags,
        {
          _id: action.payload._id,
          color: action.payload.color
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_TAG: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.tags = card.tags.filter((item) => item._id !== action.payload._id);

      return updateState(state, columnIndex, copy);
    }

    case ATTACH_USER_TO_TASK: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);

      card.usersList = [
        ...card.usersList,
        {
          id: action.payload.userId,
          name: action.payload.name
        }
      ];

      return updateState(state, columnIndex, copy);
    }

    case REMOVE_USER_FROM_TASK: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const card = copy.taskList.find((item) => item._id === action.payload.taskId);
      card.usersList = card.usersList.filter((item) => item.id !== action.payload.userId);

      return updateState(state, columnIndex, copy);
    }

    case REFRESH_COLUMNS: {
      const { source, destination } = action.payload;

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = state.board.columns.findIndex((item) => item._id === source.droppableId);
        const destColumn = state.board.columns.findIndex((item) => item._id === destination.droppableId);
        const [removed] = state.board.columns[sourceColumn].taskList.splice(source.index, 1);

        state.board.columns[destColumn].taskList.splice(destination.index, 0, removed);
      } else {
        const column = state.board.columns.findIndex((item) => item._id === source.droppableId);
        const [removed] = state.board.columns[column].taskList.splice(source.index, 1);

        state.board.columns[column].taskList.splice(destination.index, 0, removed);
      }

      return {
        ...state,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns
          ]
        }
      }
    }

    case UPDATE_USERS_LIST: {
      return {
        ...state,
        board: {
          ...state.board,
          userList: [
            ...state.userList,
            ...action.payload
          ]
        }
      };
    }

    default: 
      return state;
  }
}

export default reducer;
