import axios from "axios";
import { GUS, RU, ERROR, VACIAR_USE, CHECKUSE } from "./actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const REGISTRO = import.meta.env.VITE_REACT_APP_URL_REGISTRO;
const LOGIN = import.meta.env.VITE_REACT_APP_URL_LOGIN;

export const registroUser = (input) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}`;
      const { data } = await axios.post(endpoint, { input });
      // console.log(data)
      dispatch({
        type: RU,
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

export const setSingOut = (userVacio) => {
  return {
    type: VACIAR_USE,
    payload: userVacio,
  };
};

export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${LOGIN}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GUS,
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

export const checkUserById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${REGISTRO}/${LOGIN}/${id}`;
      const { data } = await axios.get(endpoint);
      // console.log(data)
      let check = '';
      if (data) {
        check = true;
      }
      dispatch({
        type: CHECKUSE,
        payload: check,
      });
    } catch (error) {
      let check = false;
      dispatch({
        type: CHECKUSE,
        payload: check,
      });
    }
  };
};
