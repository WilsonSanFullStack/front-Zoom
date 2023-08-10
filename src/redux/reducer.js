import {
  PCA,
  GCA,
  PP,
  GP,
  ERROR,
  PC,
  GC,
  RESETERROR,
  PB,
  GB,
  PS,
} from './actionsTypes.js';

const initialState = {
  spg: [],
  parcialAdult: [],
  corteChat: [],
  corteBonga: [],
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
        spg: [],
      };

    case PCA:
      return {
        ...state,
        spg: action.payload,
      };

      case GCA:
      return {
        ...state,
        corteAdult: action.payload,
      };
    case PP:
      return {
        ...state,
        spg: action.payload,
      };

      case GP:
      return {
        ...state,
        parcialAdult: action.payload,
      };
      case PC:
        return {
          ...state,
          spg: action.payload,
        };
      case GC:
        return {
          ...state,
          corteChat: action.payload,
        };
      case PB:
        return {
          ...state,
          spg: action.payload,
        };
      case GB:
        return {
          ...state,
          corteBonga: action.payload,
        };
        case PS:
          return {
            ...state,
            spg: action.payload,
          }

    default:
      return state;
  };
};