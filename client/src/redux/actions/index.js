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
  REMOVE_TAG,
  ATTACH_USER_TO_TASK,
  REMOVE_USER_FROM_TASK
} from './actionTypes';
import MainApiService from '../../services/MainApiService';

const service = new MainApiService();

export const fetchBoard = (boardID) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      const board = await service.getBoardById(boardID);
      console.log(board);
      /* const board = {
        id: '1',
        title: 'some title for board',
        userList: [
          {
            id: 1,
            name: 'blabl aa',
          },
          {
            id: 2,
            name: 'Al b',
          },
          {
            id: 3,
            name: 'Rs s',
          },
        ],
        columns: []
      } */
      dispatch(fetchDataSuccess(board));
    } catch (e) {
      console.log(e);
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

export const addColumn = (boardId, title) => {
  return async (dispatch) => {
    let newColumn;
    console.log(title);

    try {
      newColumn = await service.postColumn(boardId, { title: title, boardId});
      console.log(newColumn);
      dispatch(fetchColumnSuccess(newColumn));
    } catch (e) {
      console.log('column has"t been created');
    }
  }
}

export const fetchColumnSuccess = (column) => {
  return {
    type: ADD_NEW_COLUMN,
    payload: column
  };
}

export const renameColumn = (boardId, columnId, title) => {
  return async (dispatch) => {
    try {
      await service.renamePutColumn(boardId, columnId, { title: title });
      dispatch(fetchRenameColumnSuccess(columnId, title));
    } catch (e) {
      console.log('column has not been updated');
    }
  }
}

export const fetchRenameColumnSuccess = (id, title) => {
  return {
    type: RENAME_COLUMN,
    payload: {
      id,
      title
    }
  };
}

export const removeColumn = (boardId, _id) => {
  return async (dispatch) => {
    try {
      await service.removeColumn(boardId, _id);
      dispatch(fetchDeleteColumnSuccess(_id));
    } catch (e) {
      console.log('column has not been deleted');
    }
  }
}

export const fetchDeleteColumnSuccess = (_id) => {
  return {
    type: REMOVE_COLUMN,
    payload: _id
  };
}

export const addTaskList = (id, task) => {
  // тут будет запрос на сервер...
  // console.log('addTaskList', card);
  return {
    type: ADD_NEW_TASKLIST,
    payload: {
      id,
      task
    }
  };
}

export const renameTaskList = (id, taskId, newTaskTitle) => { // !: id = columnId
  // тут будет запрос на сервер...
  // console.log(id, 
  //   taskId, 
  //   newTaskTitle);
  return {
    type: RENAME_TASKLIST,
    payload: {
      id, 
      taskId, 
      newTaskTitle
    }
  };
}

export const removeTaskList = (id, taskId) => {
  // тут будет запрос на сервер...
  return {
    type: REMOVE_TASKLIST,
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

export const setCurrentUser = () => {
  return async (dispatch) => {
    let currentUser;
    const currentUserId = localStorage.getItem('rsclone_userId');

    // ! придумать обработку, если не будет userId в LS
    if (!currentUserId) {
      return;
    }

    try {
      currentUser = await service.getUserById(currentUserId);
      dispatch(fetchUserSuccess(currentUser));
    } catch (e) {
      currentUser = {};
    }
    // тут будет запрос на сервер...
    // ! потом заменить MOK user На реальные данные с сервера по id
    /* const MOK_USER = {
      userName: 'Alex',
      email: 'alex@alex.ru',
      login: 'alex-alex',
      id
    };
      */
  };
}

export const fetchUserSuccess = (currentUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
}

let comInc = 0;
export const addComment = (id, taskId, message, userName, userId, date) => {
  // тут будет запрос на сервер...

  return {
    type: ADD_NEW_COMMENT,
    payload: {
      id,
      taskId,
      message,
      userName,
      userId,
      date,
      commentId: `${++comInc}`
    }
  };
}

export const removeComment = (id, taskId, commentId) => {
  // тут будет запрос на сервер...

  return {
    type: REMOVE_COMMENT,
    payload: {
      id,
      taskId,
      commentId
    }
  };
}

export const editComment = (id, taskId, commentId, message, date) => {
  // тут будет запрос на сервер...

  return {
    type: EDIT_COMMENT,
    payload: {
      id,
      taskId,
      commentId,
      message,
      date
    }
  };
}

let taskidd = 0; // ! удалить потом

export const addTag = (id, taskId, color) => {
  // тут будет запрос на сервер...

  return {
    type: ADD_TAG,
    payload: {
      id,
      taskId,
      color,
      tagId: ++taskidd
    }
  };
}

export const removeTag = (id, taskId, tagId) => {
  // тут будет запрос на сервер...

  return {
    type: REMOVE_TAG,
    payload: {
      id,
      taskId,
      tagId
    }
  };
}

export const attachUserToTask = (id, taskId, user) => {
  // тут будет запрос на сервер...

  return {
    type: ATTACH_USER_TO_TASK,
    payload: {
      id,
      taskId,
      userId: user.id,
      name: user.name
    }
  };
}

export const removeUserFromTask = (id, taskId, userId) => {
  // тут будет запрос на сервер...

  return {
    type: REMOVE_USER_FROM_TASK,
    payload: {
      id,
      taskId,
      userId
    }
  };
}
