import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';

const rootReducer = combineReducers({
    auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
