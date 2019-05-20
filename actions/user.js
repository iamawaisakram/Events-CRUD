import {
  SET_USER,
  SET_MODAL,
  TAB_BAR_SCREEN,
  CLEAR_USER
} from '../utilities/keys';

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

export function setModalValue(value) {
  return {
    type: SET_MODAL,
    value
  };
}

export function setTabBarScreen(value) {
  return {
    type: TAB_BAR_SCREEN,
    value
  };
}
