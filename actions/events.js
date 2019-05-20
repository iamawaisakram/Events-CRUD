import { SET_DATA } from '../utilities/keys';

let data = {};

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
        throwErrorAlert();
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
