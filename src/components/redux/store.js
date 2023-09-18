import cartSlice from "./slices/cart";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
