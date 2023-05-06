import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';
import cardReducer from '../reducers/CardSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
