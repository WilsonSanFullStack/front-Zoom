import axios from "axios";
import { POSTQUINCENA, GETALLQUINCENA, ERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const QUINCENA = import.meta.env.VITE_REACT_APP_URL_QUINCENA;

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
        type: ERROR,
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
        type: ERROR,
        payload: error,
      });
    }
  };
};
