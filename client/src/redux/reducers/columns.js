import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  RENAME_COLUMN,
  REMOVE_COLUMN,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  board: {
    id: '',
    title: '',
    currentUser: {},
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


    default: 
      return state;
  }
}

export default reducer;
