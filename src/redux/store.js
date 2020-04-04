import {combineReducers, createStore} from 'redux';
import songReducer from './reducers';

const rootReducer = combineReducers({
  songReducer,
});

const store = createStore(rootReducer);

export default store;
