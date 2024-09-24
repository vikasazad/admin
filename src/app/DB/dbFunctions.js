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
    await setDoc(doc(db, email, "analytics"), {
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
