import { SET_DATA } from '../utilities/keys';

const initialState = {
  events: null,
  currentPage: 1,
  lastPage: null,
  loading: true
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

    default:
      return state;
  }
}
