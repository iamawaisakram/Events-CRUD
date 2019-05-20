import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//root Reducer
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
