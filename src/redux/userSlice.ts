import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../types/userTypes";

const SLICE_NAME = "users";

const initialState = {
  users: [
    {
      id: "",
      name: "",
      gender: "",
      location: { city: "", country: "", postcode: "" },
      email: "",
      phone: "",
      picture: { large: "" },
    },
  ],
};

const usersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUsersData: (state, { payload }: PayloadAction<UserDataType[]>) => {
      state.users = [...payload];
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
  },
});

export const { setUsersData, deleteUser, updateUserData } = usersSlice.actions;

export default usersSlice.reducer;
