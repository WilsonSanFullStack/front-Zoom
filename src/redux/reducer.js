import {
  POST_CORTE,
  GET_CORTE,
} from './actionsTypes.js';

const initialState = {
  estadoInicial: [],
  corteAdult: [],
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

    default:
      return state;
  };
};