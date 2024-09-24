import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../DB/firebase";

// Define a dynamic async thunk to fetch data from Firestore
export const fetchFirestoreData = createAsyncThunk(
  "firebaseData/fetchFirestoreData",
  async ({ email, subCollection }) => {
    const docRef = doc(db, email, subCollection);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data(), subCollection }; // Return both data and the collection name
    } else {
      return { data: null, subCollection }; // Handle when the document does not exist
    }
  }
);
export const fetchFirestoreLiveData = createAsyncThunk(
  "firebaseData/fetchFirestoreLiveData",
  async ({ email, subCollection }) => {
    try {
      const docRef = doc(db, email, subCollection);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().live;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
);

const initialState = {
  fetchedData: {},
  status: "idle",
  error: null,
};

const firebaseDataSlice = createSlice({
  name: "firebaseData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirestoreData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirestoreData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { subCollection, data } = action.payload;
        state.fetchedData[subCollection] = data; // Dynamically store data based on subCollection name
      })
      .addCase(fetchFirestoreData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchFirestoreLiveData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirestoreLiveData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedData[subCollection] = action.payload;
      })
      .addCase(fetchFirestoreLiveData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default firebaseDataSlice.reducer;
