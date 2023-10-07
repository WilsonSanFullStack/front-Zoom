import axios from "axios";
import {
  POSTlOCATION,
  GETALLLOCATION,
  GETLOCATIONBYID,
  UPDATELOCATION,
  DELETELOCATION,
  ERROR,
} from "../../actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const LOCATION = import.meta.env.VITE_REACT_APP_URL_LOCATION;
const DELETE = import.meta.env.VITE_REACT_APP_URL_DELETE;

export const postLocation = (locations) => {
  return async (dispatch) => {
    try {
      console.log(locations)
      const endpoint = `${URL}/${LOCATION}`;
      const { data } = await axios.post(endpoint, locations);
      dispatch({
        type: POSTlOCATION,
        payload: data,
      });
    } catch (error) {
      console.log(error.message)
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllLocation = () => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${LOCATION}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETALLLOCATION,
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

export const getLocationById = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${LOCATION}/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GETLOCATIONBYID,
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

export const updateLocation = (id, nLocation) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${LOCATION}/${id}`;
      const { data } = await axios.put(endpoint, nLocation);
      dispatch({
        type: UPDATELOCATION,
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

export const deleteLocation = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${LOCATION}/${DELETE}/${id}`;
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: DELETELOCATION,
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
