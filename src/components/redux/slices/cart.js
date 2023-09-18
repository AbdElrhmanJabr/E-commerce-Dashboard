import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        toast.success(`The Quantity Has Been Increased`);
      } else {
        state.cartItems.push(newItem);
        newItem.totalPrice = newItem.price * newItem.quantity;
        toast.success(`${newItem.productName} Has Been Added To Cart`, {
          style: {
            color: "#0a1d37",
            fontSize: "18px",
            fontWeight: "bold",
          },
        });
      }
      state.totalQuantity++;
    },
    getTotalAmount: (state) => {
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.totalPrice;
      });
      state.totalAmount = total;
    },
    deleteItem: (state, action) => {
      const theItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems.splice(theItemIndex, 1);
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
