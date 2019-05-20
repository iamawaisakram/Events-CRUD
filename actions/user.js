import { SET_USER, CLEAR_USER } from '../utilities/keys';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}
