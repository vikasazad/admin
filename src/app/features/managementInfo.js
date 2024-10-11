import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../DB/firebase";

export const fetchFirestoreManagementData = createAsyncThunk(
  "firebaseData/fetchFirestoreManagementData",
  async ({ email }) => {
    const docRef = doc(db, email, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { data: null, subCollection };
    }
  }
);

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

const firebaseManagementDataSlice = createSlice({
  name: "firebaseData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirestoreManagementData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirestoreManagementData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFirestoreManagementData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default firebaseManagementDataSlice.reducer;
