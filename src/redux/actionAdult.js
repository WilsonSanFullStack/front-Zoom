import axios from "axios";
import {
  GET_CORTE,
  GET_PARCIAL,
  POST_CORTE,
  POST_PARCIAL,
} from "./actionsTypes.js";

// const URL = import.meta.env.VITE_REACT_APP_URL;
// const URL = "http://localhost:3001";
const URL = 'https://zoomvirtuel.onrender.com'
const CORTE = "corte";
const PARCIAL = "corte/parcial";

export const postCorte = (corte) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CORTE}`;
      const { data } = await axios.post(endpoint, { corte });
      dispatch({
        type: POST_CORTE,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.error || "Error al enviar el corte";
        return Promise.reject(errorMessage);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getAllQuincena = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${post}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_CORTE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const postParcial = (parcial) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PARCIAL}`;
      const { data } = await axios.post(endpoint, { parcial });
      dispatch({
        type: POST_PARCIAL,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.error || "Error al enviar el corte";
        return Promise.reject(errorMessage);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getAllParcial = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PARCIAL}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_PARCIAL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
