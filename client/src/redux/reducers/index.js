import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_ERROR,
  ADD_NEW_COLUMN,
  ADD_NEW_CARD,
  ADD_DESCRIPTION
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
    
    case ADD_NEW_CARD:
      const columnIndex = state.board.columns.findIndex((item) => item.columnId === action.payload.columnId);
      const copy = {...state.board.columns[columnIndex]};

      let cards;
      if (state.board.columns[columnIndex].cards) {
        cards = [...state.board.columns[columnIndex].cards, {...action.payload.card}];
      } else {
        cards = [{...action.payload.card}];
      }
      
      copy.cards = [...cards];

      return {
        ...state,
        loading: false,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {...copy},
            ...state.board.columns.slice(columnIndex + 1),
          ]
        }
      };
    
    case ADD_DESCRIPTION:
      const columnIndexDesc = state.board.columns.findIndex((item) => item.columnId === action.payload.columnId);
      const columnCopyDesc = {...state.board.columns[columnIndexDesc]};
      const card = columnCopyDesc.cards.find((item) => item.cardId === action.payload.cardId);
      /* columnId, 
      cardId,
      cardDescription */
      // console.log('ADD_DESCRIPTION',columnIndexDesc,columnCopyDesc,card);
      
      card.cardDescription = action.payload.cardDescription;
      // console.log('ADDEDDDDDDDD',card);
      return {
        ...state,
        loading: false,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndexDesc),
            {...columnCopyDesc},
            ...state.board.columns.slice(columnIndexDesc + 1),
          ]
        }
      };

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
