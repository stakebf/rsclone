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
  CHANGE_TODOS_TITLE,
  SET_DATE
} from './actionTypes';
import MainApiService from '../../services/MainApiService';

export const fetchBoard = (boardID) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      // const board = await MainApiService.getBoard(boardID);
      const board = {
        id: '1',
        title: 'some title for board',
        usersList: [{
          userId: 1,
          userName: 'blabla',
        }],
        columns: []
      }
      dispatch(fetchDataSuccess(board));
    } catch (e) {
      dispatch(fetchDataError(e));
    }
  }
};

export const fetchDataStart = () => {
  return {
    type: FETCH_BOARD_START,
  };
};

export const fetchDataSuccess = (board) => {
  return {
    type: FETCH_BOARD_SUCCESS,
    payload: board
  };
}

export const fetchDataError = (e) => {
  return {
    type: FETCH_BOARD_ERROR,
    payload: e
  };
};

export const addColumn = (column) => {
  // тут будет запрос на сервер...
  return {
    type: ADD_NEW_COLUMN,
    payload: column
  };
}

export const renameColumn = (id, title) => {
  // тут будет запрос на сервер...
  return {
    type: RENAME_COLUMN,
    payload: {
      id,
      title
    }
  };
}

export const removeColumn = (id) => {
  // тут будет запрос на сервер...
  return {
    type: REMOVE_COLUMN,
    payload: id
  };
}

export const addCard = (id, task) => {
  // тут будет запрос на сервер...
  // console.log('addCard', card);
  return {
    type: ADD_NEW_CARD,
    payload: {
      id,
      task
    }
  };
}

export const renameCard = (id, taskId, newTaskTitle) => { // !: id = columnId
  // тут будет запрос на сервер...
  // console.log(id, 
  //   taskId, 
  //   newTaskTitle);
  return {
    type: RENAME_CARD,
    payload: {
      id, 
      taskId, 
      newTaskTitle
    }
  };
}

export const removeCard = (id, taskId) => {
  // тут будет запрос на сервер...
  return {
    type: REMOVE_CARD,
    payload: {
      id, 
      taskId
    }
  };
}

export const addDescription = (id, taskId, description) => {
  // тут будет запрос на сервер...
  // console.log('addDescription', columnId, cardId, cardDescription);
  return {
    type: ADD_DESCRIPTION,
    payload: {
      id,
      taskId,
      description
    }
  };
}

export const addTodosTitle = (id, taskId, title) => {
  // тут будет запрос на сервер...
  return {
    type: ADD_TODOS_TITLE,
    payload: {
      id,
      taskId,
      title
    }
  };
}

let incrForTodo = 0; // ! потом удалить
export const addTodo = (id, taskId, title, isComplete) => {
  //  ! потом изменить
  // тут будет запрос на сервер...
  return {
    type: ADD_TODO,
    payload: {
      id,
      taskId,
      todoId: ++incrForTodo,
      title,
      isComplete
    }
  };
}

export const setTodoComplete = (id, taskId, todoId, isComplete) => {
  //  ! потом изменить
  // тут будет запрос на сервер...
  console.log(id, taskId, todoId, isComplete);
  return {
    type: SET_TODO_COMPLETE,
    payload: {
      id,
      taskId,
      todoId,
      isComplete
    }
  };
}

export const removeTodo = (id, taskId, todoId, isComplete) => {
  // тут будет запрос на сервер...
  return {
    type: REMOVE_TODO,
    payload: {
      id,
      taskId,
      todoId
    }
  };
}

export const changeTodoTitle = (id, taskId, title, isComplete, todoId) => {
  // тут будет запрос на сервер...
  return {
    type: CHANGE_TODO_TITLE,
    payload: {
      id,
      taskId,
      todoId,
      title,
      isComplete
    }
  };
}

export const removeTodos = (id, taskId) => {
  console.log('id, taskId', id, taskId);
  // тут будет запрос на сервер...
  return {
    type: CHANGE_TODOS_TITLE,
    payload: {
      id,
      taskId
    }
  };
}

export const setDate = (id, taskId, date) => {
  // тут будет запрос на сервер...
  return {
    type: SET_DATE,
    payload: {
      id,
      taskId,
      date
    }
  };
}
