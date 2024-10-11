import { configureStore } from "@reduxjs/toolkit";
import firebaseDataReducer from "../features/firebaseSlice";
import firestoreMultipleDataReducer from "../features/firestoreMultipleData";
import listReducer from "../features/list";
import addToOrderReducer from "../features/addToOrderSlice";
import activeFooterItemReducer from "../features/activeFooterCategory";
import searchReducer from "../features/searchSlice";
import botToOrderReducer from "../features/botToOrderSlice";
import botChatReducer from "../features/botChatSlice";
import afterOrderReducer from "../features/afterOrderSlice";
import firebaseManagementDataReducer from "../features/managementInfo";
import adminRestaurantInfoReducer from "../features/adminRestaurantInfoSlice";
const store = configureStore({
  reducer: {
    // Add other reducers here if you have more slices
    firebaseManagementData: firebaseManagementDataReducer,
    firestoreMultipleData: firestoreMultipleDataReducer,
    firebaseData: firebaseDataReducer,
    listData: listReducer,
    addToOrderData: addToOrderReducer,
    activeFooterItem: activeFooterItemReducer,
    searchTerm: searchReducer,
    botToOrderData: botToOrderReducer,
    botChat: botChatReducer,
    afterOrderData: afterOrderReducer,
    adminRestaurantInfo: adminRestaurantInfoReducer,
  },
});

export default store;
