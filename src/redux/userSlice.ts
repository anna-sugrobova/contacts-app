import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataType } from '../types/userTypes';
import uniqueId from 'lodash/uniqueId';

const SLICE_NAME = 'users';

type InitialState = {
  users: UserDataType[];
};

export const initialUser = {
  id: '',
  name: 'John Doe',
  gender: 'Male / Female',
  location: 'Planet Earth',
  email: 'example@gmail.com',
  phone: '+0-000-000-00-00',
  picture: { large: 'https://randomuser.me/api/portraits/women/1.jpg' },
};

const initialState: InitialState = {
  users: Array.from({ length: 10 }, () => ({
    ...initialUser,
    id: uniqueId(),
  })),
};

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUsersData: (state, { payload }: PayloadAction<UserDataType[]>) => {
      state.users = payload;
    },
    deleteUser: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newUsers = state.users.filter((user) => user.id !== payload.id);
      return { users: newUsers };
    },
    updateUserData: (state, { payload: editedUser }) => {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === editedUser.id) {
            return editedUser;
          }
          return user;
        }),
      };
    },
    addNewUser: (state, { payload: newUser }) => {
      state.users.push({ ...newUser, id: uniqueId() });
    },
  },
});

export const { setUsersData, deleteUser, updateUserData, addNewUser } = usersSlice.actions;

export default usersSlice.reducer;
