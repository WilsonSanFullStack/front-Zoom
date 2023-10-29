import axios from "axios";

import { MONDO, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MONDO = import.meta.env.VITE_REACT_APP_MONDO;

export const portMondo = (mondo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MONDO}`;
      const { data } = await axios.post(endpoint, mondo);
      dispatch({
        type: MONDO,
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
