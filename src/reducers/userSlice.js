import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();

const initialState = {
  user: userInfo,
  foodItems: null,
  isMenuOpen: false,
  cart: { isOpen: false, cartItems: [] },
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
    setIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setCartIsOpen: (state, action) => {
      state.cart.isOpen = action.payload;
    },
    setCartItems: (state, action) => {
      state.cart.cartItems = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  setIsMenuOpen,
  setFoodItems,
  setCartIsOpen,
  setCartItems,
} = userSlice.actions;
