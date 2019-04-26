import { combineReducers } from 'redux';
import chat from './Chat/Chat';

const combinedReducer = combineReducers({
  chat
});

export default combinedReducer;