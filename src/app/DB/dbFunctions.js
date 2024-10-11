"use server";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../DB/firebase";
import { auth } from "../../auth";

export async function registerUserEmail(email, token) {
  try {
    await setDoc(doc(db, email, "info"), {
      //setdoc is to create if not or if exists then overwrite
      token,
    });
    console.log("here");
    return "Email regestered Successfully";
  } catch (error) {
    console.log("eror");
    console.log(error);
    return false;
  }
}

export async function registerUser(email, newUser) {
  try {
    await setDoc(doc(db, email, "hotel"), {
      //setdoc is to create if not or if exists then overwrite // to add new sub-collection this function can be used
      ...newUser,
    });
    return "User registered Successfully";
  } catch (error) {
    console.log("eror");
    console.log(error);
    return false;
  }
}

export async function updateUser(primaryEmail, data) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    await updateDoc(docRef, data);
    return { success: "User updated successfully" };
  } catch (error) {
    return { error: "Error while updating user!" };
  }
}

export async function getData(email, subCollection) {
  try {
    const docRef = doc(db, email, subCollection);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function getRoomData() {
  const session = await auth();
  const user = session?.user?.personalInfo.contactInfo.email;
  try {
    const docRef = doc(db, user, "hotel");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = {
        foodMenuItems: [],
        hotelRoomIssues: [],
        hotelServices: [],
      };
      if (docSnap.data().menu) {
        const category = docSnap.data().menu.categories;
        category.map((menu) =>
          menu.menuItems.map((item) => {
            const portionSizes = Object.keys(item.price); // Get the portion sizes (e.g., ["Single"], ["Half", "Full"], ["Medium", "Large"])
            portionSizes.map((portion) => {
              const obj = {
                id: item.id,
                name: item.name,
                quantity: portion, // Portion size (e.g., "Single", "Half", "Full", etc.)
                price: item.price[portion], // Corresponding price for the portion size
              };
              data.foodMenuItems.push(obj);
            });
          })
        );
      }

      if (docSnap.data().issues) {
        const arr = docSnap.data().issues;
        Object.entries(arr).forEach(([key, value]) => {
          value.forEach((subtype) => {
            const obj = {
              name: key,
              issueSubtype: subtype,
              description: false,
            };
            data.hotelRoomIssues.push(obj);
          });
        });
      }
      if (docSnap.data().services) {
        const arr = docSnap.data().services.categories;
        Object.values(arr).map((category, i) =>
          Object.values(category).map((item) => {
            item.map((detail) => {
              const obj = {
                name: detail.typeName || "Service",
                startTime: detail.startTime || "N/A",
                endTime: detail.endTime || "N/A",
                price: detail.price || 0,
              };
              data.hotelServices.push(obj);
            });
          })
        );
      }

      return data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function getTableData() {
  const session = await auth();
  const user = session?.user?.personalInfo.contactInfo.email;
  try {
    const docRef = doc(db, user, "restaurant");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = {
        foodMenuItems: [],
        hotelTableIssues: [],
      };
      if (docSnap.data().menu) {
        const category = docSnap.data().menu.categories;
        category.map((menu) =>
          menu.menuItems.map((item) => {
            const portionSizes = Object.keys(item.price); // Get the portion sizes (e.g., ["Single"], ["Half", "Full"], ["Medium", "Large"])
            portionSizes.map((portion) => {
              const obj = {
                id: item.id,
                name: item.name,
                quantity: portion, // Portion size (e.g., "Single", "Half", "Full", etc.)
                price: item.price[portion], // Corresponding price for the portion size
              };
              data.foodMenuItems.push(obj);
            });
          })
        );
      }

      if (docSnap.data().issues) {
        const arr = docSnap.data().issues;
        Object.entries(arr).forEach(([key, value]) => {
          value.forEach((subtype) => {
            const obj = {
              name: key,
              issueSubtype: subtype,
              description: false,
            };
            data.hotelTableIssues.push(obj);
          });
        });
      }

      return data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function getLiveData(email) {
  try {
    const docRefHotel = doc(db, email, "hotel");
    const docRefRestaurant = doc(db, email, "restaurant");

    const [docSnapHotel, docSnapRestaurant] = await Promise.all([
      getDoc(docRefHotel),
      getDoc(docRefRestaurant),
    ]);

    const result = {};

    if (docSnapHotel.exists()) {
      result.hotel = docSnapHotel.data()?.live || null;
    }

    if (docSnapRestaurant.exists()) {
      result.restaurant = docSnapRestaurant.data()?.live || null;
    }

    // Return false if neither document exists or if both 'live' fields are null
    if (
      Object.keys(result).length === 0 ||
      (result.hotel === null && result.restaurant === null)
    ) {
      return false;
    }

    return result;
  } catch (error) {
    console.error("Error in getLiveData:", error);
    return false;
  }
}

export async function get7daysData(email, subCollection, type) {
  try {
    const docRef = doc(db, email, subCollection);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const currentDayOfYear = Math.floor(diff / oneDay);
      const result = {
        [type]: {
          days: [],
        },
      };
      const categories = data[type]?.categories || {};
      for (const categoryName in categories) {
        const categoryData = categories[categoryName];
        const totalEarnings = new Array(7).fill(0);
        const totalBookings = new Array(7).fill(0); // Initialize array for last 7 days of earnings

        for (let i = 0; i < 7; i++) {
          const day = currentDayOfYear - i;
          if (categoryData.days?.[day]?.totalEarnings) {
            totalEarnings[6 - i] = categoryData.days[day].totalEarnings;
            totalBookings[6 - i] = categoryData.days[day].totalBookings;

            if (!result[type].days.includes(day)) {
              result[type].days.unshift(day);
            }
          }
        }

        result[type][categoryName] = totalEarnings;
        result[type][`${categoryName} Bookings`] = totalBookings;
      }

      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching total earnings data:", error);
    return false;
  }
}

export async function get7daysDataFromAll(email, subCollection) {
  try {
    const docRef = doc(db, email, subCollection);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const currentDayOfYear = Math.floor(diff / oneDay);

      const result = {
        days: [], // Track the days for all categories
      };

      // Loop through all types (rooms, food, services, issues)
      for (const type in data) {
        const categories = data[type]?.categories || {};

        // Create a result entry for each type (rooms, food, etc.)
        result[type] = {};

        for (const categoryName in categories) {
          const categoryData = categories[categoryName];
          const totalEarnings = new Array(7).fill(0); // Initialize array for last 7 days of earnings
          const totalBookings = new Array(7).fill(0); // Initialize array for last 7 days of bookings

          for (let i = 0; i < 7; i++) {
            const day = currentDayOfYear - i;
            if (categoryData.days?.[day]?.totalEarnings) {
              totalEarnings[6 - i] = categoryData.days[day].totalEarnings;
              totalBookings[6 - i] = categoryData.days[day].totalBookings;
              // Track the days globally for all categories
              if (!result.days.includes(day)) {
                result.days.unshift(day);
              }
            }
          }

          // Store the earnings for each category under the respective type
          result[type][categoryName] = totalEarnings;
          result[type][`${categoryName} Bookings`] = totalBookings;
        }
      }

      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching 7 days data from all categories:", error);
    return false;
  }
}

export async function handleRoomInformation(email) {
  try {
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
          const checkOutTime = new Date(item.checkOut);
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

      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return false;
  }
}
export async function handleRoomStaffInformation(email) {
  const session = await auth();
  const user = session?.user?.personalInfo.contactInfo.email;
  try {
    const docRefHotel = doc(db, user, "hotel");
    const docRefRestaurant = doc(db, user, "restaurant");
    const [docSnapHotel, docSnapRestaurant] = await Promise.all([
      getDoc(docRefHotel),
      getDoc(docRefRestaurant),
    ]);

    const result = {
      hotelOverview: {
        todayCheckIn: [],
        ongoing: [],
        todayCheckOut: [],
        vacant: [],
        maintenance: [],
        status: {},
      },
      restaurantOverview: {
        occupied: [],
        reserved: [],
        available: [],
        cleaning: [],
        status: {},
      },
    };

    if (docSnapHotel.exists()) {
      const reservation = docSnapHotel.data().reservation;
      const live = docSnapHotel.data().live;
      result.hotelOverview.todayCheckIn = reservation;
      result.hotelOverview.ongoing = live.rooms;
      result.hotelOverview.status = live.roomsData.status;
      live.rooms.map((item) => {
        if (item.checkOut) {
          const checkOutTime = new Date(item.checkOut);
          if (checkOutTime.toDateString() === new Date().toDateString()) {
            result.hotelOverview.todayCheckOut.push(item);
          }
        }
      });
      live.roomsData.roomDetail.map((item) => {
        if (item.status === "available") {
          result.hotelOverview.vacant.push(item);
        }
        if (item.status === "fixing required") {
          result.hotelOverview.maintenance.push(item);
        }
      });
    }

    if (docSnapRestaurant.exists()) {
      const reservation = docSnapRestaurant.data().reservation;
      const live = docSnapRestaurant.data().live;
      result.restaurantOverview.reserved = reservation;
      result.restaurantOverview.status = live.tablesData.status;
      live.tables.map((item) => {
        if (item.diningDetails.status === "occupied") {
          result.restaurantOverview.occupied.push(item);
        }
      });
      live.tablesData.tableDetails.map((item) => {
        if (item.status === "available") {
          result.restaurantOverview.available.push(item);
        }
      });
      live.tablesData.tableDetails.map((item) => {
        if (item.status === "cleaning") {
          result.restaurantOverview.cleaning.push(item);
        }
      });
    }

    if (
      Object.keys(result).length === 0 ||
      (result.hotelOverview === null && result.restaurantOverview === null)
    ) {
      console.log("HERE1", result);
      return false;
    }

    return result;
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return false;
  }
}

export async function findUserByEmail(email) {
  try {
    const docRef = doc(db, email, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function findNoPasswordLogin(email) {
  try {
    const docRef = doc(db, email, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user.password;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function findIfStaffLogin(primaryEmail, staffEmail) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const staffArr = docSnap.data().staff;
      const isUserExists = staffArr.findIndex(
        (val) => val.email === staffEmail
      );
      if (staffArr[isUserExists]) {
        return staffArr[isUserExists];
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function findUserByToken(primaryEmail, token) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tokenArr = docSnap.data().token;
      const isUserExists = tokenArr.findIndex((val) => val.token === token);
      if (tokenArr[isUserExists]) {
        return tokenArr[isUserExists];
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export async function findTokenByEmail(email) {
  console.log("Finding Email using", email);
  try {
    const docRef = doc(db, email, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tokenArr = docSnap.data().token;
      const isUserExists = tokenArr.findIndex((val) => val.email === email);
      if (tokenArr[isUserExists]) {
        return tokenArr[isUserExists];
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function addToken(primaryEmail, tokenToAdd) {
  console.log(primaryEmail, tokenToAdd);
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let updatedTokens;
      const data = docSnap.data();
      if (data.token) {
        const tokens = data.token || [];
        tokens.push(tokenToAdd);
        updatedTokens = tokens;
      } else {
        updatedTokens = [tokenToAdd];
      }
      await updateDoc(docRef, { token: updatedTokens });

      return "Token added successfully";
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteToken(primaryEmail, tokenToRemove) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const tokens = data.token || [];

      // Check if there are 0 tokens
      if (tokens.length === 0) {
        return { error: "No tokens to remove!" };
      }

      const updatedTokens = tokens.filter(
        (tokenObj) => tokenObj.token !== tokenToRemove
      );

      await updateDoc(docRef, { token: updatedTokens });

      return { success: "Token removed successfully" };
    } else {
      return { error: "No such document!" };
    }
  } catch (error) {
    console.error("Error while updating document:", error);
    return { error: "Error while updating document!" };
  }
}

export async function addStaff(primaryEmail, staffToAdd) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let updatedStaff;
      const data = docSnap.data();
      if (data.staff) {
        const staffs = data.staff || [];
        staffs.push(staffToAdd);
        updatedStaff = staffs;
      } else {
        updatedStaff = [staffToAdd];
      }
      await updateDoc(docRef, { staff: updatedStaff });

      return { success: "Staff added successfully" };
    } else {
      return { error: "No such document!" };
    }
  } catch (error) {
    return { error: "Error while updating document!" };
  }
}

export async function deleteStaff(primaryEmail, staffToRemove) {
  try {
    const docRef = doc(db, primaryEmail, "info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const staffs = data.staff || [];
      if (staffs.length === 0) {
        return { error: "No staff to remove!" };
      }
      const updatedstaff = staffs.filter(
        (staffObj) => staffObj.email !== staffToRemove
      );
      await updateDoc(docRef, { staff: updatedstaff });
      return { success: "Staff removed successfully" };
    } else {
      return { error: "No such document!" };
    }
  } catch (error) {
    return { error: "Error while updating document!" };
  }
}
