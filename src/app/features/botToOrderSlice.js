import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatbot: false,
  isOrder: false,
  orderData: {}, // Add activeItem to the state
};

export const botToOrder = createSlice({
  name: "botToOrder",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = { ...action.payload };
    },
    setChatbot: (state, action) => {
      state.isChatbot = action.payload;
    },
    setOrder: (state, action) => {
      // console.log("running", state.isOrder, action.payload);
      state.isOrder = action.payload;
    },
  },
});

export const { setOrderData, setChatbot, setOrder } = botToOrder.actions;
export default botToOrder.reducer;
