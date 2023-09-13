import axios from "axios";

import { POSTUSERNAME, ERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const USERNAME = import.meta.env.VITE_REACT_APP_URL_USERNAME;

export const postUserName = (input) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${USERNAME}`;
      const { data } = await axios.post(endpoint, input);
      dispatch({
        type: POSTUSERNAME,
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
