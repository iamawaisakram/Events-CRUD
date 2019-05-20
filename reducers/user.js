import { SET_USER, CLEAR_USER } from '../utilities/keys';

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

    default:
      return state;
  }
}
