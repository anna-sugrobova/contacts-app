import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../types/userTypes";

const SLICE_NAME = "users";

const initialState = {
  users: [
    {
      id: "",
      name: { title: "", first: "", last: "" },
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
    deleteUser: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const newUsers = state.users.filter(
        (user) => user.id !== payload.id
      );

      return { users: newUsers };
    },
  },
});

export const { setUsersData, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
