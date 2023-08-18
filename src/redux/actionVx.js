import axios from "axios";
import { PVX, ERROR, GVX } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const VX = import.meta.env.VITE_REACT_APP_VX;

export const pvx = (covx) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VX}`;
      const { data } = await axios.post(endpoint, { covx });
      dispatch({
        type: PVX,
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

export const gvx = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${VX}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GVX,
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
