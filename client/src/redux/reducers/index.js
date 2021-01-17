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
  REMOVE_CARD
} from '../actions/actionTypes';

const getCurrentColumn = (state, action) => {
  const columnIndex = state.board.columns.findIndex((item) => item.columnId === action.payload.columnId);
  const copy = {...state.board.columns[columnIndex]};

  return {
    columnIndex,
    copy
  }
}

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
        loading: false,
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
      copy.columnTitle = action.payload.columnTitle; 

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
    }
    
    case REMOVE_COLUMN: {
      const columns = state.board.columns.filter((item) => item.columnId !== action.payload);

      return {
        ...state,
        loading: false,
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
    }

    case RENAME_CARD: {
      const { columnIndex, copy } = getCurrentColumn(state, action);
      const cardIndex = copy.cards.findIndex((item) => item.cardId === action.payload.cardId);
      copy.cards[cardIndex].cardTitle = action.payload.newCardTitle;

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
    }
    
    case REMOVE_CARD: {
      const { columnIndex } = getCurrentColumn(state, action);
      const cards = state.board.columns[columnIndex].cards.filter((item) => item.cardId !== action.payload.cardId);

      return {
        ...state,
        loading: false,
        board: {
          ...state.board,
          columns: [
            ...state.board.columns.slice(0, columnIndex),
            {
              ...state.board.columns[columnIndex],
              cards: [
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
      const card = copy.cards.find((item) => item.cardId === action.payload.cardId);
      card.cardDescription = action.payload.cardDescription;

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
