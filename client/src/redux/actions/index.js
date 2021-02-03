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
  SET_NEW_TODOS,
  ADD_TODO,
  SET_TODO_INFO,
  REMOVE_TODO,
  SET_DATE,
  SET_CURRENT_USER,
  ADD_NEW_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  ADD_TAG,
  REMOVE_TAG,
  ATTACH_USER_TO_TASK,
  REMOVE_USER_FROM_TASK,
  REFRESH_COLUMNS,
  UPDATE_USERS_LIST,
  UPDATE_CURRENT_USER
} from './actionTypes';
import MainApiService from '../../services/MainApiService';

const service = new MainApiService();

export const fetchBoard = (boardID) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      const board = await service.getBoardById(boardID);
      dispatch(fetchDataSuccess(board));
    } catch (e) {
      dispatch(fetchDataError(e));
    }
  };
};

export const fetchDataStart = () => {
  return {
    type: FETCH_BOARD_START
  };
};

export const fetchDataSuccess = (board) => {
  return {
    type: FETCH_BOARD_SUCCESS,
    payload: board
  };
};

export const fetchDataError = (e) => {
  return {
    type: FETCH_BOARD_ERROR,
    payload: e
  };
};

export const addColumn = (boardId, title) => {
  return async (dispatch) => {
    let newColumn;

    try {
      newColumn = await service.postColumn(boardId, {title: title, boardId});
      dispatch(fetchColumnSuccess(newColumn));
    } catch (e) {
      console.log('column has"t been created');
    }
  };
};

export const fetchColumnSuccess = (column) => {
  return {
    type: ADD_NEW_COLUMN,
    payload: column
  };
};

export const renameColumn = (boardId, columnId, title) => {
  return async (dispatch) => {
    try {
      await service.renamePutColumn(boardId, columnId, {title: title});
      dispatch(fetchRenameColumnSuccess(columnId, title));
    } catch (e) {
      console.log('column has not been updated');
    }
  };
};

export const fetchRenameColumnSuccess = (id, title) => {
  return {
    type: RENAME_COLUMN,
    payload: {
      id,
      title
    }
  };
};

export const removeColumn = (boardId, _id) => {
  return async (dispatch) => {
    try {
      await service.removeColumn(boardId, _id);
      dispatch(fetchDeleteColumnSuccess(_id));
    } catch (e) {
      console.log('column has not been deleted', e);
    }
  };
};

export const fetchDeleteColumnSuccess = (_id) => {
  return {
    type: REMOVE_COLUMN,
    payload: _id
  };
};

export const addTaskList = (columnId, title) => {
  return async (dispatch) => {
    try {
      const reqTask = await service.postTask(columnId, {title, date: '', description: ''});
      const reqTodos = await service.postTodos(columnId, reqTask.id, {title: ''});
      reqTask.todos = [{...reqTodos}];

      dispatch(fetchAddTaskSuccess(columnId, reqTask));
    } catch (e) {
      console.log('task has not been added', e);
    }
  };
};

export const fetchAddTaskSuccess = (columnId, task) => {
  return {
    type: ADD_NEW_TASKLIST,
    payload: {
      id: columnId,
      task
    }
  };
};

export const renameTaskList = (id, taskId, title) => {
  return async (dispatch) => {
    try {
      await service.putTaskData(id, taskId, {title});

      dispatch(fetchRenameTaskSuccess(id, taskId, title));
    } catch (e) {
      console.log('task has not been renamed', e);
    }
  };
};

export const fetchRenameTaskSuccess = (id, taskId, newTaskTitle) => {
  return {
    type: RENAME_TASKLIST,
    payload: {
      id,
      taskId,
      newTaskTitle
    }
  };
};

export const removeTaskList = (id, taskId) => {
  return async (dispatch) => {
    try {
      await service.removeTask(id, taskId);

      dispatch(fetchRemoveTaskSuccess(id, taskId));
    } catch (e) {
      console.log('task has not been deleted', e);
    }
  };
};

export const fetchRemoveTaskSuccess = (id, taskId) => {
  return {
    type: REMOVE_TASKLIST,
    payload: {
      id,
      taskId
    }
  };
};

export const addDescription = (id, taskId, description) => {
  return async (dispatch) => {
    try {
      await service.putTaskData(id, taskId, {description});

      dispatch(fetchAddDescriptionSuccess(id, taskId, description));
    } catch (e) {
      console.log('description has not been setted', e);
    }
  };
};

export const fetchAddDescriptionSuccess = (id, taskId, description) => {
  return {
    type: ADD_DESCRIPTION,
    payload: {
      id,
      taskId,
      description
    }
  };
};

export const addTodosTitle = (id, taskId, todosId, title) => {
  return async (dispatch) => {
    try {
      await service.putTodosTitle(id, taskId, todosId, {title});

      dispatch(fetchAddTodosTitleSuccess(id, taskId, title));
    } catch (e) {
      console.log('Title for todos has not been setted', e);
    }
  };
};

export const fetchAddTodosTitleSuccess = (id, taskId, title) => {
  return {
    type: ADD_TODOS_TITLE,
    payload: {
      id,
      taskId,
      title
    }
  };
};

export const addTodo = (id, taskId, todosId, title, isComplete) => {
  return async (dispatch) => {
    try {
      const todos = await service.postAddTodo(id, taskId, todosId, {title, isComplete});
      const todo = todos.todo[todos.todo.length - 1];

      dispatch(fetchAddTodoSuccess(id, taskId, todo.title, todo.isComplete, todo._id));
    } catch (e) {
      console.log('Todo has not been added', e);
    }
  };
};

export const fetchAddTodoSuccess = (id, taskId, title, isComplete, todoId) => {
  return {
    type: ADD_TODO,
    payload: {
      id,
      taskId,
      todoId,
      title,
      isComplete
    }
  };
};

export const setTodoInfo = (id, taskId, todosId, title, isComplete, todoId) => {
  return async (dispatch) => {
    try {
      if (isComplete === undefined) {
        await service.putTodo(id, taskId, todosId, todoId, {title});
      } else {
        await service.putTodo(id, taskId, todosId, todoId, {title, isComplete});
      }

      dispatch(fetchSetTodoInfoSuccess(id, taskId, title, isComplete, todoId));
    } catch (e) {
      console.log('Todo info has not been setted', e);
    }
  };
};

export const fetchSetTodoInfoSuccess = (id, taskId, title, isComplete, todoId) => {
  return {
    type: SET_TODO_INFO,
    payload: {
      id,
      taskId,
      todoId,
      title,
      isComplete
    }
  };
};

export const removeTodo = (id, taskId, todoId, todosId) => {
  return async (dispatch) => {
    try {
      await service.removeTodo(id, taskId, todoId, todosId);

      dispatch(fetchRemoveTodoSuccess(id, taskId, todoId));
    } catch (e) {
      console.log('Todo has not been deleted', e);
    }
  };
};

export const fetchRemoveTodoSuccess = (id, taskId, todoId) => {
  return {
    type: REMOVE_TODO,
    payload: {
      id,
      taskId,
      todoId
    }
  };
};

export const removeTodos = (id, taskId, todosId) => {
  return async (dispatch) => {
    try {
      await service.removeTodos(id, taskId, todosId);

      const reqTodos = await service.postTodos(id, taskId, {title: ''});

      dispatch(fetchRemoveTodosSuccess(id, taskId, reqTodos));
    } catch (e) {
      console.log('Todos has not been removed', e);
    }
  };
};

export const fetchRemoveTodosSuccess = (id, taskId, todos) => {
  return {
    type: SET_NEW_TODOS,
    payload: {
      id,
      taskId,
      todos
    }
  };
};

export const setDate = (id, taskId, date) => {
  return async (dispatch) => {
    try {
      await service.putTaskData(id, taskId, {date});

      dispatch(fetchSetDateSuccess(id, taskId, date));
    } catch (e) {
      console.log('date has not been setted', e);
    }
  };
};

export const fetchSetDateSuccess = (id, taskId, date) => {
  return {
    type: SET_DATE,
    payload: {
      id,
      taskId,
      date
    }
  };
};

export const setCurrentUser = () => {
  return async (dispatch) => {
    let currentUser;
    const currentUserId = localStorage.getItem('rsclone_userId');

    try {
      currentUser = await service.getUserById(currentUserId);
      dispatch(fetchUserSuccess(currentUser));
    } catch (e) {
       // currentUser = await service.getUserById(currentUserId);
    } finally {
      if (!currentUser) {
        // window.location.href = '/';
      } else {
        dispatch(fetchUserSuccess(currentUser));
      }
    }
  };
};

export const fetchUserSuccess = (currentUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
};

export const addComment = (id, taskId, message, userName, userId, date) => {
  return async (dispatch) => {
    try {
      const comment = await service.postComment(id, taskId, {
        userName,
        date,
        message,
        userId
      });

      dispatch(fetchAddCommentSuccess(id, taskId, message, userName, userId, date, comment._id));
    } catch (e) {
      console.log('Comment has not been added', e);
    }
  };
};

export const fetchAddCommentSuccess = (id, taskId, message, userName, userId, date, commentId) => {
  return {
    type: ADD_NEW_COMMENT,
    payload: {
      id,
      taskId,
      message,
      userName,
      userId,
      date,
      _id: commentId
    }
  };
};

export const removeComment = (id, taskId, commentId) => {
  return async (dispatch) => {
    try {
      await service.removeComment(id, taskId, commentId);

      dispatch(fetchRemoveCommentSuccess(id, taskId, commentId));
    } catch (e) {
      console.log('Comment has not been removed', e);
    }
  };
};

export const fetchRemoveCommentSuccess = (id, taskId, commentId) => {
  return {
    type: REMOVE_COMMENT,
    payload: {
      id,
      taskId,
      commentId
    }
  };
};

export const editComment = (id, taskId, commentId, message, date) => {
  return async (dispatch) => {
    try {
      dispatch(fetchEditCommentSuccess(id, taskId, commentId, message, date));

      await service.putCommentData(id, taskId, commentId, {message, date});
    } catch (e) {
      console.log('Comment has not been edited', e);
    }
  };
};

export const fetchEditCommentSuccess = (id, taskId, commentId, message, date) => {
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
};

export const addTag = (id, taskId, color) => {
  return async (dispatch) => {
    try {
      const newTag = await service.postTag(id, taskId, {color});

      dispatch(fetchAddTagSuccess(id, taskId, color, newTag._id));
    } catch (e) {
      console.log('Tag has not been setted', e);
    }
  };
};

export const fetchAddTagSuccess = (id, taskId, color, tagId) => {
  return {
    type: ADD_TAG,
    payload: {
      id,
      taskId,
      color,
      _id: tagId
    }
  };
};

export const removeTag = (id, taskId, tagId) => {
  return async (dispatch) => {
    try {
      await service.removeTag(id, taskId, tagId);

      dispatch(fetchRemoveTagSuccess(id, taskId, tagId));
    } catch (e) {
      console.log('Tag has not been deleted', e);
    }
  };
};

export const fetchRemoveTagSuccess = (id, taskId, tagId) => {
  return {
    type: REMOVE_TAG,
    payload: {
      id,
      taskId,
      _id: tagId
    }
  };
};

export const attachUserToTask = (id, taskId, user) => {
  return async (dispatch) => {
    try {
      await service.postAttachUserToTask(user.id, {taskId});

      dispatch(fetchAttachUserToTaskSuccess(id, taskId, user));
    } catch (e) {
      console.log('Comment has not been added', e);
    }
  };
};

export const fetchAttachUserToTaskSuccess = (id, taskId, user) => {
  return {
    type: ATTACH_USER_TO_TASK,
    payload: {
      id,
      taskId,
      userId: user.id,
      name: user.name
    }
  };
};

export const removeUserFromTask = (id, taskId, userId) => {
  return async (dispatch) => {
    try {
      await service.removeUserFromTask(userId, {taskId});

      dispatch(fetchRemoveUserToTaskSuccess(id, taskId, userId));
    } catch (e) {
      console.log('User has not been removed', e);
    }
  };
};

export const fetchRemoveUserToTaskSuccess = (id, taskId, userId) => {
  return {
    type: REMOVE_USER_FROM_TASK,
    payload: {
      id,
      taskId,
      userId
    }
  };
};

export const refreshColumns = (source, destination, taskId) => {
  return async (dispatch) => {
    try {
      await service.putOnDNDTask(source.droppableId, taskId, { 
        columnId: destination.droppableId,
        position: destination.index
      });

      dispatch(fetchMoveTaskSuccess(source, destination));
    } catch (e) {
      console.log('Task has not been moved', e);
    }
  }
};

export const fetchMoveTaskSuccess = (source, destination) => {
  return {
    type: REFRESH_COLUMNS,
    payload: {
      source, 
      destination
    }
  };
};

export const updateUsersList = (usersList) => {
  return {
    type: UPDATE_USERS_LIST,
    payload: usersList
  };
};

export const updateCurrentUser = (name, login) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: {
      name, 
      login
    }
  };
};
