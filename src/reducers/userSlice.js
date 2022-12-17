import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const initialState = {
  user: userInfo,
  foodItems: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setFoodItems } = userSlice.actions;
