import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';

const store = configureStore({
  reducer: {
    contacts: usersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

