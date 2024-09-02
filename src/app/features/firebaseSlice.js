import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../DB/firebase";

const firestore = getFirestore(app);

// Define an async thunk to fetch data from Firestore
export const fetchDataFromFirestore = createAsyncThunk(
  "firebaseData/fetchDataFromFirestore",
  async () => {
    const docRef = doc(firestore, "restaurant", "1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().data);
      return docSnap.data().data;
    } else {
      // Handle the case when the document does not exist
      return null;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const firebaseData = createSlice({
  name: "firebaseData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataFromFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDataFromFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { fetchData } = firebaseData.actions;
export default firebaseData.reducer;
