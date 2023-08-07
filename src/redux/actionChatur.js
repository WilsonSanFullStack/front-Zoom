import axios from "axios";
import { 
  ERROR, GET_CHATUR,
  POST_CHATUR 
} from './actionsTypes.js';

const URL = import.meta.env.VITE_REACT_APP_URL;
const CHATUR = import.meta.env.VITE_REACT_APP_CHATUR;

export const postChatur = (corteChat) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CHATUR}`
      const { data } = await axios.post(endpoint, {corteChat});
      dispatch({
        type: POST_CHATUR,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  }
};

export const getChatur = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${CHATUR}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_CHATUR,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      })
    }
  }
};