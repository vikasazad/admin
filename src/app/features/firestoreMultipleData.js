import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../DB/firebase";

export const fetchFirestoreData = createAsyncThunk(
  "firebaseData/fetchFirestoreData",
  async ({ email, subCollection }) => {
    const docRef = doc(db, email, subCollection);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { rooms: docSnap.data().rooms, services: docSnap.data().services };
    } else {
      return { data: null, subCollection };
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
export const handleRoomInformation = createAsyncThunk(
  "firebaseData/handleRoomInformation",
  async ({ email }) => {
    try {
      console.log("HERE", email);
      const docRef = doc(db, email, "hotel");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          overview: {
            todayCheckIn: [],
            ongoing: [],
            todayCheckOut: [],
            vacant: [],
            maintenance: [],
          },
        };
        const reservation = docSnap.data().reservation;
        const live = docSnap.data().live;
        const history = docSnap.data().history;
        data.overview.todayCheckIn = reservation;
        data.overview.ongoing = live.rooms;
        live.rooms.map((item) => {
          if (item.checkOut) {
            const checkOutTime = new Date(JSON.parse(item.checkOut));
            if (checkOutTime.toDateString() === new Date().toDateString()) {
              data.overview.todayCheckOut.push(item);
            }
          }
        });

        live.roomsData.roomDetail.map((item) => {
          if (item.status === "available") {
            data.overview.vacant.push(item);
          }
          if (item.status === "fixing required") {
            data.overview.maintenance.push(item);
          }
        });

        data.live = live;
        data.history = history;
        console.log(data);

        return data;
      } else {
        console.log("here");
        return false;
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
      return false;
    }
  }
);
export const handleRoomStaffInformation = createAsyncThunk(
  "firebaseData/handleRoomStaffInformation",
  async ({ email }) => {
    try {
      console.log("HERE", email);
      const docRef = doc(db, email, "hotel");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          overview: {
            todayCheckIn: [],
            ongoing: [],
            todayCheckOut: [],
            vacant: [],
            maintenance: [],
          },
        };
        const reservation = docSnap.data().reservation;
        const live = docSnap.data().live;
        const history = docSnap.data().history;
        data.overview.todayCheckIn = reservation;
        data.overview.ongoing = live.rooms;
        live.rooms.map((item) => {
          if (item.checkOut) {
            const checkOutTime = new Date(JSON.parse(item.checkOut));
            if (checkOutTime.toDateString() === new Date().toDateString()) {
              data.overview.todayCheckOut.push(item);
            }
          }
        });

        live.roomsData.roomDetail.map((item) => {
          if (item.status === "available") {
            data.overview.vacant.push(item);
          }
          if (item.status === "fixing required") {
            data.overview.maintenance.push(item);
          }
        });

        data.live = live;
        data.history = history;
        console.log(data);

        return data;
      } else {
        console.log("here");
        return false;
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
      return false;
    }
  }
);

export const getTableData = createAsyncThunk(
  "firebaseData/getTableData",
  async ({ email, subCollection }) => {
    try {
      const docRef = doc(db, email, subCollection);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().tables;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
);
export const getMenuData = createAsyncThunk(
  "firebaseData/getMenuData",
  async ({ email, subCollection }) => {
    try {
      const docRef = doc(db, email, subCollection);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().menu);
        return docSnap.data().menu;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
);

export const handleTablesInformation = createAsyncThunk(
  "firebaseData/handleTablesInformation",
  async ({ email }) => {
    try {
      const docRef = doc(db, email, "restaurant");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          overview: {
            occupied: [],
            reserved: [],
            available: [],
            cleaning: [],
          },
        };
        const reservation = docSnap.data().reservation;
        const live = docSnap.data().live;
        const history = docSnap.data().history;
        data.overview.reserved = reservation;
        live.tables.map((item) => {
          if (item.diningDetails.status === "occupied") {
            data.overview.occupied.push(item);
          }
        });
        live.tablesData.tableDetails.map((item) => {
          if (item.status === "available") {
            data.overview.available.push(item);
          }
        });
        live.tablesData.tableDetails.map((item) => {
          if (item.status === "cleaning") {
            data.overview.cleaning.push(item);
          }
        });
        data.live = live;
        data.history = history;
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
      return false;
    }
  }
);

const initialState = {
  data: {},
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
        state.data = action.payload;
      })
      .addCase(fetchFirestoreData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFirestoreLiveData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirestoreLiveData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFirestoreLiveData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(handleRoomInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleRoomInformation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(handleRoomInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMenuData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenuData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getMenuData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(handleTablesInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleTablesInformation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(handleTablesInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default firebaseDataSlice.reducer;
