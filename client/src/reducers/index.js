import { combineReducers } from 'redux';
import authReducer from './account/authReducers';
import errorReducer from './account/errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
