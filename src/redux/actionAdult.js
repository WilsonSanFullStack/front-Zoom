import axios from "axios";
import {
  ERROR,
  GCA,
  GP,
  PCA,
  PP,
  RESETERROR,
} from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const CORTE = import.meta.env.VITE_REACT_APP_CORTE;
const PARCIAL = import.meta.env.VITE_REACT_APP_PARCIAL;


export const postCorte = (corte) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CORTE}`;
      const { data } = await axios.post(endpoint, { corte });
      dispatch({
        type: PCA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  };
};

export const getAllQuincena = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CORTE}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GCA,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  };
};

export const postParcial = (parcial) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CORTE}/${PARCIAL}`;
      const { data } = await axios.post(endpoint, { parcial });
      dispatch({
        type: PP,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  };
};

export const getAllParcial = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CORTE}/${PARCIAL}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GP,
        payload: data,
      });
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  };
};

export const resetError = () => {
  return {
    type: RESETERROR,
  }
};
