import axios from "axios";
import { PIL, GIL } from "./actionsTypes.js";
import { ERROR } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const IL = import.meta.env.VITE_REACT_APP_IL;

export const pil = (cil) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${IL}`;
      const { data } = await axios.post(endpoint, { cil });
      dispatch({
        type: PIL,
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
