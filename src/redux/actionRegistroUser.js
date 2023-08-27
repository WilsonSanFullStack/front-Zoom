import axios from "axios";
import { RU } from "./actionsTypes";
import { ERROR } from "./actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const REGISTRO = import.meta.env.VITE_REACT_APP_URL_REGISTRO;


export const registroUser = (input) => {
  console.log(input);
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}`;
      const { data } = await axios.post(endpoint, { input });
      console.log(data)
      dispatch({
        type: RU,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: 'error.response.data.error',
      });
    }
  };
};


