import axios from "axios";
import { STREAMATE, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const STREAMATES = import.meta.env.VITE_REACT_APP_STREMATE;

export const postStreamate = (streamate) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${STREAMATES}`;
      const { data } = await axios.post(endpoint, streamate);
      dispatch({
        type: STREAMATE,
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
