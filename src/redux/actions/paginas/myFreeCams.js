import axios from "axios";
import { MYFREECAMS, PERROR } from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const MYFREECAMS = import.meta.env.VITE_REACT_APP_MYFREECAMS;

export const postMyFreeCams = (myFreeCams) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${MYFREECAMS}`;
      const { data } = await axios.post(endpoint, myFreeCams);
      dispatch({
        type: MYFREECAMS,
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
