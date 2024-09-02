import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  botChat: [],
};

export const botChat = createSlice({
  name: "botChat",
  initialState,
  reducers: {
    setBotChat: (state, action) => {
      state.botChat = [action.payload];
    },
  },
});

export const { setBotChat } = botChat.actions;
export default botChat.reducer;
