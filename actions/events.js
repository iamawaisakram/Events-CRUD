import axios from 'axios';

//keys
import { SET_DATA, SET_TOKEN } from '../utilities/keys';

let data = {};

export const setToken = (email, password) => {
  console.log('called......2', email, password);
  data = {
    email: email,
    password: password
  };
  return dispatch => {
    return axios
      .post(`http://buzzevents.co/public/api/auth/login`, data)
      .then(response => {
        console.log('called......2', data, response.data);
        dispatch(setTokenValue(response.data.token));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const getEvents = (page, token) => {
  return dispatch => {
    return axios
      .get(`http://buzzevents.co/public/api/events?page=${page}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        dispatch(setValues(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

function setValues(data) {
  return {
    type: SET_DATA,
    data
  };
}

function setTokenValue(token) {
  return {
    type: SET_TOKEN,
    token
  };
}
