import axios from "axios";

import {
  POSTQUINCENA,
  GETALLQUINCENA,
  GETBIQUINCENA,
  PERROR,
  GERROR,
  GETQUINCENAMONEDA,
  GETQUINCENAADULT,
  GETQUINCENAAMATEUR,
  GETQUINCENABONGA,
  GETQUINCENACAM4,
  GETQUINCENACHATURBATE,
  GETQUINCENADIRTY,
  GETQUINCENAISLIVE,
  GETQUINCENASENDER,
  GETQUINCENASKYPE,
  GETQUINCENASTRIPCHAT,
  GETQUINCENAVX,
  GETQUINCENAXLOVE,
  GETQUINCENAXLOVENUEVA,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const QUINCENA = import.meta.env.VITE_REACT_APP_URL_QUINCENA;
const MONEDA = import.meta.env.VITE_REACT_APP_MONEDA;
const ADULT = import.meta.env.VITE_REACT_APP_ADULT;
const AMATEUR = import.meta.env.VITE_REACT_APP_AM;
const BONGA = import.meta.env.VITE_REACT_APP_BO;
const CAM4 = import.meta.env.VITE_REACT_APP_CA;
const CHATURBATE = import.meta.env.VITE_REACT_APP_CH;
const DIRTY = import.meta.env.VITE_REACT_APP_DI;
const ISLIVE = import.meta.env.VITE_REACT_APP_IL;
const SENDER = import.meta.env.VITE_REACT_APP_SE;
const SKYPE = import.meta.env.VITE_REACT_APP_SK;
const STRIPCHAT = import.meta.env.VITE_REACT_APP_ST;
const VX = import.meta.env.VITE_REACT_APP_VX;
const XLOVE = import.meta.env.VITE_REACT_APP_XL;
const XLOVENUEVA = import.meta.env.VITE_REACT_APP_XLN;

export const postQuincena = (quincena) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}`;
      const { data } = await axios.post(endpoint, quincena);
      dispatch({
        type: POSTQUINCENA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error,
      });
    }
  };
};

export const getAllQuincena = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETALLQUINCENA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaMoneda = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${MONEDA}/${id}`;
      const { data } = await axios.get(endpoint);
      console.log(data)
      dispatch({
        type: GETQUINCENAMONEDA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaAdult = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${ADULT}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAADULT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaAmateur = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${AMATEUR}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAAMATEUR,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaBonga = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${BONGA}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENABONGA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaCam4 = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${CAM4}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENACAM4,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaChaturbate = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${CHATURBATE}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENACHATURBATE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaDirty = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${DIRTY}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENADIRTY,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaIsLive = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${ISLIVE}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAISLIVE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaSender = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${SENDER}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENASENDER,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaSkype = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${SKYPE}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENASKYPE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaStripchat = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${STRIPCHAT}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENASTRIPCHAT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaVx = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${VX}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAVX,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaXlove = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${XLOVE}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAXLOVE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getQuincenaXloveNueva = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${QUINCENA}/${XLOVENUEVA}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETQUINCENAXLOVENUEVA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};
