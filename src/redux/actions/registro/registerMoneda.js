import axios from "axios";

import { POSTMONEDA, ERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MONEDA = import.meta.env.VITE_REACT_APP_URL_MONEDA;

export const postMoneda = (moneda) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MONEDA}`;
      const { data } = await axios.post(endpoint, moneda);
      dispatch({
        type: POSTMONEDA,
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
