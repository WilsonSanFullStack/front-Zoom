import axios from 'axios';
import { 
  POST_BONGA,
  GET_BONGA,
  ERROR,
} from './actionsTypes.js'


const URL = import.meta.env.VITE_REACT_APP_URL;
const BONGA = import.meta.env.VITE_REACT_APP_BONGA;


export const postBonga = (corteBonga) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BONGA}`;
      const { data } = await axios.post(endpoint, {corteBonga});
      dispatch({
        type: POST_BONGA,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error
      })
    }
  }
};

export const getBonga = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BONGA}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_BONGA,
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
