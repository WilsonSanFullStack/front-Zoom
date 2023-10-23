import axios from "axios";
import {
  GETPRODUCTO,
  POSTPRODUCTO,
  GETBIPRODUCTO,
  UPDATEPRODUCTO,
  DELETEPRODUCTO,
  PERROR,
  GERROR,
} from "../../actionsTypes";

const URL = import.meta.env.VITE_REACT_APP_URL;
const PRODUCTO = import.meta.env.VITE_REACT_APP_URL_PRODUCTO;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postProducto = (producto) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRODUCTO}`;
      const { data } = await axios.post(endpoint, producto);
      dispatch({
        type: POSTPRODUCTO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllProductos = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRODUCTO}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETPRODUCTO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const getProductoById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRODUCTO}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETBIPRODUCTO,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GERROR,
        payload: error,
      });
    }
  };
};

export const updateProducto = (id, nProducto) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRODUCTO}/${id}`;
      const { data } = await axios.update(endpoint, nProducto);
      dispatch({
        type: UPDATEPRODUCTO,
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

export const deleteProducto = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${PRODUCTO}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETEPRODUCTO,
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
