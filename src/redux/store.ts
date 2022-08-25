import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    contacts: usersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;

