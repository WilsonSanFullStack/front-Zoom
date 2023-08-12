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
  GS,
  PIL,
} from './actionsTypes.js';

const initialState = {
  spg: [],
  ca:[], //corte adult
  pa: [], //parcial adult
  cc: [], //corte chaturbate
  cb: [], //corte bonga
  cs: [], //corte sender
  cil: [], //corte isLive

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
//post corte adult
    case PCA:
      return {
        ...state,
        spg: action.payload,
      };
//get corte adult 
      case GCA:
      return {
        ...state,
        ca: action.payload,
      };
      //post partcial
    case PP:
      return {
        ...state,
        spg: action.payload,
      };
//get parcial
      case GP:
      return {
        ...state,
        cp: action.payload,
      };
      //post chatur
      case PC:
        return {
          ...state,
          spg: action.payload,
        };
        //get chatur
      case GC:
        return {
          ...state,
          cc: action.payload,
        };
        //post bonga
      case PB:
        return {
          ...state,
          spg: action.payload,
        };
        //get bonga
      case GB:
        return {
          ...state,
          cb: action.payload,
        };
        //post sender
        case PS:
          return {
            ...state,
            spg: action.payload,
          };
          //get sender
        case GS:
          return {
            ...state,
            cs: action.payload,
          };
        //post isLive
        case PIL:
        return {
        ...state,
        cil: action.payload,
        };
        
    default:
      return state;
  };
};