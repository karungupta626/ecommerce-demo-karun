import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';
import cardReducer from '../reducers/CardSlice';
import detailPageReducer from '../reducers/detailpageslice';
import searchReducer from '../reducers/SearchPageSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer,
    detailPage: detailPageReducer,
    search: searchReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
