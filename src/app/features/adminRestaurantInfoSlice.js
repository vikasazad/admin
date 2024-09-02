import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminRestaurantInfo: {
    type: "Restaurant",
    restaurantInfo: null,
    categories: [],
  },
};

export const adminRestaurantInfo = createSlice({
  name: "adminRestaurantInfo",
  initialState,
  reducers: {
    addData: (state, action) => {
      console.log("here");
      console.log(action.payload);
      if (Object.keys(action.payload)[0] === "resInfo") {
        state.adminRestaurantInfo.restaurantInfo = action.payload.resInfo;
      } else {
        state.adminRestaurantInfo.categories.push(action.payload.catInfo);
      }
    },
  },
});

export const { addData, setCategoryFlag } = adminRestaurantInfo.actions;
export default adminRestaurantInfo.reducer;
