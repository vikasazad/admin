import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reAddItem: null,
  removeItem: null,
  revisit: {},
};

export const afterOrder = createSlice({
  name: "afterOrder",
  initialState,
  reducers: {
    setReAddItem: (state, action) => {
      // console.log(action.payload);
      state.reAddItem = action.payload;
    },
    setRemoveItem: (state, action) => {
      state.removeItem = action.payload;
    },
    setRevisit: (state, action) => {},
  },
});

export const { setReAddItem, setRemoveItem, setRevisit } = afterOrder.actions;
export default afterOrder.reducer;
