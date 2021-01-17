import { 
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  ADD_NEW_CARD,
  ADD_DESCRIPTION,
  RENAME_COLUMN,
  REMOVE_COLUMN
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

export const renameColumn = (columnId, columnTitle) => {
  // тут будет запрос на сервер...
  return {
    type: RENAME_COLUMN,
    payload: {
      columnId,
      columnTitle
    }
  };
}

export const removeColumn = (columnId) => {
  // тут будет запрос на сервер...
  return {
    type: REMOVE_COLUMN,
    payload: columnId
  };
}

export const addCard = (columnId, card) => {
  // тут будет запрос на сервер...
  // console.log('addCard', card);
  return {
    type: ADD_NEW_CARD,
    payload: {
      columnId,
      card
    }
  };
}

export const addDescription = (columnId, cardId, cardDescription) => {
  // тут будет запрос на сервер...
  // console.log('addDescription', columnId, cardId, cardDescription);
  return {
    type: ADD_DESCRIPTION,
    payload: {
      columnId,
      cardId,
      cardDescription
    }
  };
}
