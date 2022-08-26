import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import leadsReducer from '../features/counter/leadsSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
