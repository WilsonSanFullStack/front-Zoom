import axios from "axios";
import { GET_CORTE, POST_CORTE } from "./actionsTypes.js";

// const URL = import.meta.env.VITE_REACT_APP_URL;
const URL = 'http://localhost:3001'
const post = 'corte'

export const postCorte = (datas) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${post}`;
      const { data } = await axios.post(endpoint, {datas});
      dispatch({
        type: POST_CORTE,
        payload: data,
      })

    } catch (error) {
      console.log(error.message)
    }
  };
};

export const getAllQuincena = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${post}`
    const { data } = await axios.get(endpoint);
    dispatch({
      type: GET_CORTE,
      payload: data,
    })
    } catch (error) {
      console.log(error.message)
    }
  }
};
