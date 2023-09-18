import {
  PAD,
  GAD,
  PPA,
  GPA,
  ERROR,
  PAM,
  GAM,
  RESETERROR,
  PBO,
  GBO,
  PCA,
  GCA,
  PCH,
  GCH,
  PDI,
  GDI,
  PIL,
  GIL,
  PSE,
  GSE,
  PSK,
  GSK,
  PST,
  GST,
  PVX,
  GVX,
  PXL,
  GXL,
  PXLN,
  GXLN,
  RU,
  GUS,
  VACIAR_USE,
  CHECKUSE,
  GETPAG,
  PAGINA,
  POSTPRODUCTO,
  GETPRODUCTO,
  LOGOUT,
  GETUSER,
  GETUSERBI,
  POSTCOMMENT,
  GETALLQUINCENA,
  GETBIQUINCENA,
} from "./actionsTypes.js";

const initialState = {
  spg: [],
  coad: [], //corte adult
  copad: [], //corte parcial adult
  coam: [], //corte amateur
  cobo: [], //corte bonga
  coca: [], //corte cam4
  coch: [], //corte chaturbate
  codi: [], //corte dirty
  coil: [], //corte islive
  cose: [], //corte sender
  cosk: [], //corte skype
  cost: [], //corte stripchat
  covx: [], //corte vx
  coxl: [], //corte xlove
  coxln: [], //corte xlove
  allUser: [],
  userB: {},
  user: {},
  init: "",
  pagina: "",
  paginas: [],
  producto: "",
  productos: [],
  comment: [],
  quincenas: [],
  quincena: {},

  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESETERROR:
      return {
        ...state,
        error: "",
        spg: [],
      };
    //post corte adult
    case PAD:
      return {
        ...state,
        spg: action.payload,
      };
    //get corte adult
    case GAD:
      return {
        ...state,
        coad: action.payload,
      };
    //post partcial
    case PPA:
      return {
        ...state,
        spg: action.payload,
      };
    //get parcial
    case GPA:
      return {
        ...state,
        copad: action.payload,
      };
    // post amateur
    case PAM:
      return {
        ...state,
        spg: action.payload,
      };
    //get amateur
    case GAM:
      return {
        ...state,
        coam: action.payload,
      };
    //post bonga
    case PBO:
      return {
        ...state,
        spg: action.payload,
      };
    //get bonga
    case GBO:
      return {
        ...state,
        cobo: action.payload,
      };
    //post cam4
    case PCA:
      return {
        ...state,
        spg: action.payload,
      };
    // get cam4
    case GCA:
      return {
        ...state,
        coca: action.payload,
      };
    //post chatur
    case PCH:
      return {
        ...state,
        spg: action.payload,
      };
    //get chatur
    case GCH:
      return {
        ...state,
        coch: action.payload,
      };
    //post dirty
    case PDI:
      return {
        ...state,
        spg: action.payload,
      };
    //get dirty
    case GDI:
      return {
        ...state,
        codi: action.payload,
      };
    //post isLive
    case PIL:
      return {
        ...state,
        spg: action.payload,
      };
    //get islive
    case GIL:
      return {
        ...state,
        coil: action.payload,
      };
    //post sender
    case PSE:
      return {
        ...state,
        spg: action.payload,
      };
    //get sender
    case GSE:
      return {
        ...state,
        cose: action.payload,
      };
    //post skype
    case PSK:
      return {
        ...state,
        spg: action.payload,
      };
    //get skype
    case GSK:
      return {
        ...state,
        cosk: action.payload,
      };
    //post stripchat
    case PST:
      return {
        ...state,
        spg: action.payload,
      };
    //get stripchat
    case GST:
      return {
        ...state,
        cost: action.payload,
      };
    //post vs
    case PVX:
      return {
        ...state,
        spg: action.payload,
      };
    //get vx
    case GVX:
      return {
        ...state,
        covx: action.payload,
      };
    //post xlove
    case PXL:
      return {
        ...state,
        spg: action.payload,
      };
    //get xlove
    case GXL:
      return {
        ...state,
        coxl: action.payload,
      };
    //post xlove
    case PXLN:
      return {
        ...state,
        spg: action.payload,
      };
    //get xlove
    case GXLN:
      return {
        ...state,
        coxln: action.payload,
      };
    case RU:
      return {
        ...state,
        user: action.payload,
      };
    case GUS:
      return {
        ...state,
        user: action.payload,
      };

    case VACIAR_USE:
      return {
        ...state,
        user: action.payload,
      };
    case CHECKUSE:
      return {
        ...state,
        init: action.payload,
      };
    case GETUSER:
      return {
        ...state,
        allUser: action.payload,
      };
    case GETUSERBI:
      return {
        ...state,
        userB: action.payload,
      };

    case PAGINA:
      return {
        ...state,
        pagina: action.payload,
      };
    case GETPAG:
      return {
        ...state,
        paginas: action.payload,
      };
    case POSTPRODUCTO:
      return {
        ...state,
        producto: action.payload,
      };
    case GETPRODUCTO:
      return {
        ...state,
        productos: action.payload,
      };

    case POSTCOMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case GETALLQUINCENA:
      return {
        ...state,
        quincenas: action.payload,
      };
    case GETBIQUINCENA:
      return {
        ...state,
        quincena: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
