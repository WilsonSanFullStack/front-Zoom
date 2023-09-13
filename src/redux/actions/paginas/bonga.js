import axios from 'axios';
import { 
  PBO,
  GBO,
  ERROR,
} from '../../actionsTypes.js'


const URL = import.meta.env.VITE_REACT_APP_URL;
const BO = import.meta.env.VITE_REACT_APP_BO;


export const pbo = (cobo) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}`;
      const { data } = await axios.post(endpoint, { cobo });
      dispatch({
        type: PBO,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      })
    }
  }
};

export const gbo = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${BO}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GBO,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      })
    }
  }
};
