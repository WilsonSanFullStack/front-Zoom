import axios from "axios";
import { PERROR, PRESTAMO } from "../../actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const PRESTAMOS = import.meta.env.VITE_REACT_APP_URL_PRESTAMOS;

export const postPrestamos = (prestamo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRESTAMOS}`;
      const { data } = await axios.post(endpoint, prestamo);
      dispatch({
        type: PRESTAMO,
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
