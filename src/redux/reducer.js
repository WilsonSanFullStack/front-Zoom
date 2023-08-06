import {
  POST_CORTE,
  GET_CORTE,
  POST_PARCIAL,
  GET_PARCIAL,
} from './actionsTypes.js';

const initialState = {
  estadoInicial: [],
  corteAdult: [],
  parcialAdult: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case POST_CORTE:
      return {
        ...state,
        estadoInicial: action.payload,
      };

      case GET_CORTE:
      return {
        ...state,
        corteAdult: action.payload,
      };
    case POST_PARCIAL:
      return {
        ...state,
        estadoInicial: action.payload,
      };

      case GET_PARCIAL:
      return {
        ...state,
        parcialAdult: action.payload,
      };

    default:
      return state;
  };
};