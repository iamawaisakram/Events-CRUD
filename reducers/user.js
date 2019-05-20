import {
  SET_USER,
  SET_MODAL,
  TAB_BAR_SCREEN,
  CLEAR_USER
} from '../utilities/keys';

const initialState = {
  currentUser: null,
  tabBar: 'main',
  modal: false,
  isLoading: true
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.user, isLoading: false };
    case CLEAR_USER:
      return { ...initialState, isLoading: false };
    case SET_MODAL:
      return { ...state, modal: action.value };
    case TAB_BAR_SCREEN:
      return { ...state, tabBar: action.value };
    default:
      return state;
  }
}
