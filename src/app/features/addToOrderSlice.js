import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToOrderData: [], // Change this to an array of objects with 'name', 'price', and 'count'
  addedItemIds: [],
  recommended: [],
  finalOrder: {},
};

export const addToOrder = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addData: (state, action) => {
      console.log(action.payload);
      state.addToOrderData.push({
        type: action.payload.data,
        selectedType: action.payload.selectedType,
        count: 1,
        cartbutton: true,
      });
      state.addedItemIds.push(action.payload.data.id);
    },
    addRecommended: (state, action) => {
      state.recommended = action.payload;
    },
    increment: (state, action) => {
      const { id } = action.payload;
      const item = state.addToOrderData.find((item) => item.type.id === id);
      if (item) {
        item.count += 1;
      }
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      const item = state.addToOrderData.find((item, k) => k === id);
      if (item && item.count > 0) {
        item.count -= 1;
      }
    },
    clearCart: (state, action) => {
      state.addToOrderData = [];
      state.addedItemIds = [];
    },
    clearSpecific: (state, action) => {
      state.addToOrderData = state.addToOrderData.filter(
        (item, id) => id !== action.payload
      );
      state.addedItemIds = state.addedItemIds.filter(
        (item, id) => id !== action.payload
      );
    },
    setFinalOrder: (state, action) => {
      state.finalOrder = action.payload;
    },
  },
});

export const {
  addData,
  increment,
  decrement,
  clearCart,
  clearSpecific,
  addRecommended,
  setFinalOrder,
} = addToOrder.actions;
export default addToOrder.reducer;
