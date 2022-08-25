import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../types/userTypes";

const SLICE_NAME = "users";

const initialState = {
  users: [
    {
      id: { value: "" },
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
      state.users = [...state.users, ...payload];
    },
  },
});

export const { setUsersData } = usersSlice.actions;

export default usersSlice.reducer;
