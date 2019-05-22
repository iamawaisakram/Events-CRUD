import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Firebase Configuration
import firebase from '../components/firebase';

//keys
import { SET_DATA, SET_TOKEN, SET_CURRENT_EVENT } from '../utilities/keys';

let data = {};

async function callTokenOnError() {
  const email = await AsyncStorage.getItem('email');
  const password = await AsyncStorage.getItem('password');
  const userId = await AsyncStorage.getItem('uid');

  console.log('called......', email, password, userId);
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
        getEvents(1, response.data.token);
      })
      .catch(error => {
        throw error;
      });
  };
}

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

export const getEvents = (page = 1, token) => {
  return dispatch => {
    return axios
      .get(`http://buzzevents.co/public/api/events?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async response => {
        const events = response.data.data.data;
        events &&
          events.map(async event => {
            await firebase
              .database()
              .ref('events')
              .child(`${event.id}`)
              .update({ event });
          });
        dispatch(setValues(response.data.data));
      })
      .catch(error => {
        callTokenOnError();
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

export function setCurrentEvent(event) {
  return {
    type: SET_CURRENT_EVENT,
    event
  };
}
