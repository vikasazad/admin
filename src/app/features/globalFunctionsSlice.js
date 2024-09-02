import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import html2canvas from "html2canvas";
const initialState = {
  orderImageUrl: {},
  billImageUrl: {},
};

export const generateBillTable = createAsyncThunk(
  "globalFunctions/generateBillTable",
  async (cartData) => {
    const tableElement = document.createElement("table");
    tableElement.style.borderCollapse = "collapse";
    tableElement.style.margin = "10px";
    tableElement.style.position = "absolute";
    tableElement.style.left = "-9999px";
    tableElement.style.border = "1px solid black";

    // Add restaurant name row
    const restaurantRow = tableElement.insertRow();
    const restaurantCell = restaurantRow.insertCell(0);
    restaurantCell.textContent = "Restaurant Name Here"; // Replace with the actual restaurant name
    restaurantCell.colSpan = 4;
    restaurantCell.style.textAlign = "center";
    restaurantCell.style.fontWeight = "bold";
    restaurantCell.style.fontSize = "1.2em";
    restaurantCell.style.padding = "10px";

    const headerRow = tableElement.insertRow();
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);
    const headerCell4 = headerRow.insertCell(3);
    headerCell1.textContent = "Item";
    headerCell2.textContent = "Type";
    headerCell3.textContent = "Quantity";
    headerCell4.textContent = "Price";

    [headerCell1, headerCell2, headerCell3, headerCell4].forEach((cell) => {
      cell.style.fontWeight = "bold";
      cell.style.border = "1px solid black";
      cell.style.padding = "10px";
    });

    let subtotal = 0;
    let totalcount = 0;

    cartData.forEach((item) => {
      const row = tableElement.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);

      cell1.textContent = item.type?.name || item.name;
      cell2.textContent = item.selectedType
        ? item.selectedType
        : "" || item.type;
      cell3.textContent = item.count;
      cell4.textContent = item.type?.portion
        ? item.type?.price[item.selectedType]
        : item.type?.price || item.price;

      [cell1, cell2, cell3, cell4].forEach((cell) => {
        cell.style.border = "1px solid black";
        cell.style.padding = "10px";
      });

      totalcount += item.count;

      subtotal += parseFloat(
        (item.type?.portion
          ? item.type?.price[item.selectedType]
          : item.type?.price) || item.price * item.count
      );
    });

    const addTotalCountRow = (row, label, value) => {
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      cell1.textContent = label;
      [cell1, cell2, cell3].forEach((cell) => {
        // cell.style.border = "1px solid black";
        cell.style.padding = "10px";
      });
      cell3.textContent = value; // Use ₹ for Rupee
      // cell3.style.border = "1px solid black";
      cell3.style.padding = "7px";
    };

    // Add Tax rows
    const totalCount = tableElement.insertRow();

    addTotalCountRow(totalCount, "Total Count", totalcount);

    const addTaxRow = (row, label, percentage, amount) => {
      // row.style.border = "1px solid black";
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      cell1.textContent = label;
      [cell1, cell2, cell3].forEach((cell) => {
        // cell.style.border = "1px solid black";
        cell.style.padding = "10px";
      });
      cell4.textContent = `₹${amount.toFixed(2)}`; // Use ₹ for Rupee
      // cell4.style.border = "1px solid black";
      cell4.style.padding = "7px";
    };

    // Add Subtotal row
    const subtotalRow = tableElement.insertRow();
    const subtotalCell1 = subtotalRow.insertCell(0);
    const subtotalCell2 = subtotalRow.insertCell(1);
    const subtotalCell3 = subtotalRow.insertCell(2);
    const subtotalCell4 = subtotalRow.insertCell(3);
    subtotalCell1.textContent = "Subtotal";
    // subtotalRow.style.border = "1px solid black";
    [subtotalCell1, subtotalCell2, subtotalCell3].forEach((cell) => {
      // cell.style.border = "1px solid black";
      cell.style.padding = "10px";
    });
    subtotalCell4.textContent = `₹${subtotal.toFixed(2)}`; // Use ₹ for Rupee
    // subtotalCell4.style.border = "1px solid black";
    subtotalCell4.style.padding = "10px";

    // Add Tax rows
    const serviceTaxRow = tableElement.insertRow();
    const sgstRow = tableElement.insertRow();
    const cgstRow = tableElement.insertRow();

    addTaxRow(serviceTaxRow, "Service Tax (10%)", 10, subtotal * 0.1);
    addTaxRow(sgstRow, "SGST (2.5%)", 2.5, subtotal * 0.025);
    addTaxRow(cgstRow, "CGST (2.5%)", 2.5, subtotal * 0.025);

    // Add Total row
    const totalRow = tableElement.insertRow();
    const totalCell1 = totalRow.insertCell(0);
    const totalCell2 = totalRow.insertCell(1);
    const totalCell3 = totalRow.insertCell(2);
    const totalCell4 = totalRow.insertCell(3);
    totalCell1.textContent = "Total";
    totalRow.style.border = "1px solid black";
    [totalCell1, totalCell2, totalCell3].forEach((cell) => {
      // cell.style.border = "1px solid black";
      cell.style.padding = "10px";
    });
    totalCell4.textContent = `₹${(
      subtotal +
      subtotal * 0.1 +
      subtotal * 0.05
    ).toFixed(2)}`; // Use ₹ for Rupee
    // totalCell4.style.border = "1px solid black";
    totalCell4.style.padding = "10px";

    document.body.appendChild(tableElement);

    const convertTableToImage = async () => {
      const canvas = await html2canvas(tableElement);
      const imageDataUrl = canvas.toDataURL("image/png");
      document.body.removeChild(tableElement);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageDataUrl }),
      });

      const { imageLink } = await response.json();
      return imageLink;
    };

    return convertTableToImage();
  }
);

export const handleOrderImageUrl = createAsyncThunk(
  "globalFunctions/handleOrderImageUrl",
  async (cartData) => {
    console.log("reducer1", cartData);
    const table = [];
    const tableElement = document.createElement("table");
    tableElement.style.borderCollapse = "collapse";
    tableElement.style.margin = "10px";
    tableElement.style.position = "absolute";
    tableElement.style.left = "-9999px";

    const headerRow = tableElement.insertRow();
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);
    const headerCell4 = headerRow.insertCell(3);
    headerCell1.textContent = "Name";
    headerCell2.textContent = "Type";
    headerCell3.textContent = "Quantity";
    headerCell4.textContent = "Price";

    [headerCell1, headerCell2, headerCell3, headerCell4].forEach((cell) => {
      cell.style.fontWeight = "bold";
      cell.style.border = "1px solid black";
      cell.style.padding = "10px";
    });

    cartData.forEach((index) => {
      // console.log(JSON.stringify(index));
      const row = tableElement.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);

      cell1.textContent = index.type?.name || index.name;
      cell2.textContent = index.selectedType
        ? index.selectedType
        : "" || index.type;
      cell3.textContent = index.count;
      cell4.textContent = index.type?.portion
        ? index.type?.price[index.selectedType]
        : index.type?.price || index.price;
      table.push({
        name: index.type?.name || index.name,
        type: index.selectedType ? index.selectedType : "" || index.type,
        quantity: index.count,
        price: index.type?.portion
          ? index.type?.price[index.selectedType]
          : index.type?.price || index.price,
      });

      [cell1, cell2, cell3, cell4].forEach((cell) => {
        cell.style.border = "1px solid black";
        cell.style.padding = "10px";
      });
    });
    console.log("reducer2", table);
    document.body.appendChild(tableElement);

    const convertTableToImage = async () => {
      const canvas = await html2canvas(tableElement);
      const imageDataUrl = canvas.toDataURL("image/png");
      document.body.removeChild(tableElement);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageDataUrl }),
      });

      const { imageLink } = await response.json();
      // console.log("image", imageLink);
      return imageLink;
    };

    return convertTableToImage();
  }
);

export const globalFunctions = createSlice({
  name: "globalFunctions",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(handleOrderImageUrl.fulfilled, (state, action) => {
      const result = action.payload;
      // console.log("Result of handleOrderImageUrl:", result);
      state.orderImageUrl = result;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(generateBillTable.fulfilled, (state, action) => {
      const result = action.payload;
      // console.log("Result of handleOrderImageUrl:", result);
      state.billImageUrl = result;
    });
  },
});

export const { setOrderImageUrl } = globalFunctions.actions;

export default globalFunctions.reducer;
