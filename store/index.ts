import { Action, AnyAction, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import rootReducer  from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
 export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;