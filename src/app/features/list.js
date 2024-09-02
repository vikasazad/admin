import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listData: {}, 
};

export const list = createSlice({
  name: "list",
  initialState,
  reducers: {
    addData: (state, action) => {
      console.log(action.payload);
      state.listData = action.payload
    },
    
  },
});

export const {
  addData,
} = list.actions;
export default list.reducer;
