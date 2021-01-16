import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN
} from '../actions/actionTypes';

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
    case FETCH_BOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case FETCH_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        board: {
          ...action.payload
        }
      };
    
    case FETCH_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case ADD_NEW_COLUMN:
      return {
        ...state,
        loading: false,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns,
            ...action.payload
          ]
        }
      };

    default: 
      return state;
  }
}

export default reducer;
