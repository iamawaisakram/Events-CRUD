import { SET_DATA, SET_TOKEN } from '../utilities/keys';

const initialState = {
  events: null,
  currentPage: 1,
  lastPage: null,
  loading: true,
  token: null
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        events: action.data.data,
        currentPage: action.data.current_page,
        lastPage: action.data.last_page,
        loading: false
      };
    case SET_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
}
