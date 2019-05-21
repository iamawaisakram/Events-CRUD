import axios from 'axios';

//Firebase Configuration
import firebase from '../components/firebase';

//keys
import { SET_DATA, SET_TOKEN } from '../utilities/keys';

let data = {};

export const setToken = (email, password, userId) => {
  data = {
    email: email,
    password: password
  };
  return dispatch => {
    return axios
      .post(`http://buzzevents.co/public/api/auth/login`, data)
      .then(async response => {
        await firebase
          .database()
          .ref('users')
          .child(userId)
          .update({ token: response.data.token });

        await dispatch(setTokenValue(response.data.token));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const setRegisterToken = (email, password) => {
  data = {
    email: email,
    password: password
  };
  return dispatch => {
    return axios
      .post(`http://buzzevents.co/public/api/auth/register`, data)
      .then(response => {
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
      .get(`http://buzzevents.co/public/api/events?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        dispatch(setValues(response.data.data));
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
