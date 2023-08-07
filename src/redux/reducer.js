import {
  POST_CORTE,
  GET_CORTE,
  POST_PARCIAL,
  GET_PARCIAL,
  ERROR,
  POST_CHATUR,
  GET_CHATUR,
  RESETERROR,
} from './actionsTypes.js';

const initialState = {
  corteAdult: [],
  parcialAdult: [],
  corteChat: [],
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESETERROR:
      return {
        ...state,
        error: null,
      };

    case POST_CORTE:
      return {
        ...state,
        corteAdult: action.payload,
      };

      case GET_CORTE:
      return {
        ...state,
        corteAdult: action.payload,
      };
    case POST_PARCIAL:
      return {
        ...state,
        parcialAdult: action.payload,
      };

      case GET_PARCIAL:
      return {
        ...state,
        parcialAdult: action.payload,
      };
      case POST_CHATUR:
        return {
          ...state,
          corteChat: action.payload,
        };
      case GET_CHATUR:
        return {
          ...state,
          corteChat: action.payload,
        };

    default:
      return state;
  };
};