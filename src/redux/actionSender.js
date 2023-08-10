import axios from "axios";
import { ERROR, GS, PS } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const S = import.meta.env.VITE_REACT_APP_S;

export const ps = (cs) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${S}`;
      const { data } = await axios.post(endpoint, { cs });
      dispatch({
        type: PS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      });
    }
  };
};

export const gs = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${S}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      });
    }
  };
};
