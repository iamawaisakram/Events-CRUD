import { combineReducers } from 'redux';

import user from './user';
import events from './events';

const rootReducer = combineReducers({
  user,
  events
});

export default rootReducer;
