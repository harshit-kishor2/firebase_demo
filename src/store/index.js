import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authReducer} from './auth.slice';
import {SharedPreference} from '../helpers';

//  Combine all reducers
const combinedReducer = combineReducers({
  authReducer,
});

// Root reducer for redux store
const rootReducers = (state, action) => {
  if (action?.type === 'USER_LOGOUT') {
    SharedPreference.clearAllData();
    state = undefined;
  }
  return combinedReducer(state, action);
};

//  Configure Store
const store = configureStore({
  reducer: rootReducers,
});

export default store;
