"use client";
import React, { useEffect, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  Container,
  InputLabel,
  Chip,
  MenuItem,
  Avatar,
  FormHelperText,
  Box,
  OutlinedInput,
  FormControl,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  FormGroup,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Popover,
} from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StatusChip from "../../../utils/StatusChip";
import { getTableData } from "../../../DB/dbFunctions";

const foodMenuItems = [
  { name: "Grilled Chicken Sandwich", quantity: "Full", price: 8.99 },
  { name: "Caesar Salad", quantity: "Half", price: 6.99 },
  { name: "Cheeseburger", quantity: "Full", price: 9.99 },
  { name: "Margherita Pizza", quantity: "Full", price: 12.99 },
  { name: "Pasta Carbonara", quantity: "Half", price: 7.99 },
  { name: "French Fries", quantity: "Half", price: 3.99 },
  { name: "Chocolate Cake", quantity: "Full", price: 5.99 },
  { name: "Fruit Platter", quantity: "Half", price: 7.99 },
  { name: "Vegetarian Wrap", quantity: "Full", price: 8.49 },
  { name: "Steak Frites", quantity: "Full", price: 18.99 },
];

const hotelRoomIssues = [
  { name: "Cleanliness", issueSubtype: "Dust", description: true },
  {
    name: "Functionality",
    issueSubtype: "Air Conditioning",
    description: true,
  },
  { name: "Safety", issueSubtype: "Door Lock", description: true },
  { name: "Amenities", issueSubtype: "TV Not Working", description: true },
  { name: "Aesthetics", issueSubtype: "Peeling Paint", description: true },
  { name: "Noise", issueSubtype: "Loud Neighbors", description: true },
  { name: "Cleanliness", issueSubtype: "Stained Sheets", description: true },
  { name: "Functionality", issueSubtype: "Leaking Faucet", description: true },
  { name: "Safety", issueSubtype: "Broken Window", description: true },
  { name: "Amenities", issueSubtype: "No Towels", description: true },
];

const hotelServices = [
  {
    name: "Spa Treatment",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    price: 75.0,
  },
  {
    name: "Room Cleaning",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    price: 20.0,
  },
  {
    name: "Laundry Service",
    startTime: "8:00 AM",
    endTime: "12:00 PM",
    price: 15.0,
  },
  {
    name: "Airport Shuttle",
    startTime: "6:00 AM",
    endTime: "10:00 PM",
    price: 50.0,
  },
  {
    name: "Gym Access",
    startTime: "6:00 AM",
    endTime: "10:00 PM",
    price: 10.0,
  },
  {
    name: "Swimming Pool Access",
    startTime: "7:00 AM",
    endTime: "9:00 PM",
    price: 80.0,
  },
  {
    name: "Breakfast Buffet",
    startTime: "7:00 AM",
    endTime: "10:00 AM",
    price: 15.0,
  },
  { name: "Yoga Class", startTime: "8:00 AM", endTime: "9:00 AM", price: 12.0 },
  {
    name: "Concierge Service",
    startTime: "24 Hours",
    endTime: "24 Hours",
    price: 0.0,
  },
  { name: "Car Rental", startTime: "9:00 AM", endTime: "6:00 PM", price: 45.0 },
];

const checklistItems = [
  {
    name: "Room Cleanliness: Is the room in good condition? Any deep cleaning needed?",
  },
  {
    name: "Damages/Missing Items: Any damages or missing items (e.g., towels, electronics)?",
  },
  {
    name: "Laundry/Towels: Are laundry and towels left properly (e.g., laundry bag, bathroom)?",
  },
  { name: "Maintenance Issues: Any issues (e.g., broken fixtures)?" },
  { name: "Repairs Needed: Any repairs required before next occupancy?" },
  {
    name: "Outstanding Charges: Are all charges (e.g., mini-bar, room service) settled?",
  },
  { name: "Keys Returned: Were all room keys returned?" },
  { name: "Left-Behind Items: Were any personal belongings left behind?" },
];
const minibarItems = [
  { name: "Coca-Cola", weight: "330ml", price: 3.5 },
  { name: "Pepsi", weight: "330ml", price: 3.5 },
  { name: "Orange Juice", weight: "250ml", price: 4.0 },
  { name: "Mineral Water", weight: "500ml", price: 2.0 },
  { name: "Chocolate Bar", weight: "50g", price: 2.5 },
  { name: "Mixed Nuts", weight: "100g", price: 5.0 },
  { name: "Beer", weight: "330ml", price: 6.0 },
  { name: "Red Wine", weight: "375ml", price: 15.0 },
  { name: "White Wine", weight: "375ml", price: 15.0 },
  { name: "Vodka", weight: "50ml", price: 8.0 },
  { name: "Whiskey", weight: "50ml", price: 10.0 },
  { name: "Potato Chips", weight: "40g", price: 3.0 },
  { name: "Gourmet Cookies", weight: "75g", price: 6.0 },
  { name: "Sparkling Water", weight: "330ml", price: 3.0 },
  { name: "Energy Drink", weight: "250ml", price: 4.5 },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Ongoing = ({ data, status }) => {
  console.log(data);
  //   Object.values(data).map((item) => console.log(typeof item));
  const [age, setAge] = useState("");
  const [addItems, setAddItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [categorySelect, setCategorySelect] = useState("Food");
  const [open, setOpen] = useState(false);
  const [checkListOpen, setCheckListOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [isMiniBarChecked, setIsMiniBarChecked] = useState(false);
  const [anchorEls, setAnchorEls] = useState({});
  const [openPaymentConfirmation, setOpenPaymentConfirmation] = useState(false);
  const [currentStatusChange, setCurrentStatusChange] = useState(null);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    getTableData().then((data) => {
      console.log(data);
      setAddItems(data);
    });
  }, []);

  const handleClickMoreVert = (event, id) => {
    setAnchorEls((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search) {
      const filtered = addItems.foodMenuItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };
  const handleCategorySearchChange = (e) => {
    const search = e.target.value;
    console.log(search);
    setCategorySearchTerm(search);

    if (search) {
      const arr =
        categorySelect === "Food"
          ? addItems.foodMenuItems
          : categorySelect === "Issue"
          ? addItems.hotelRoomIssues
          : [];

      const filtered = arr.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setCategoryItems(filtered);
    } else {
      setCategoryItems([]);
    }
  };

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleCategoryItemSelect = (item) => {
    if (selectedCategoryItems.includes(item)) {
      setSelectedCategoryItems(
        selectedCategoryItems.filter((selected) => selected !== item)
      );
    } else {
      setSelectedCategoryItems([...selectedCategoryItems, item]);
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCheckListClickOpen = () => {
    setCheckListOpen(true);
  };

  const handleCheckListOpen = () => {
    setCheckListOpen(true);
  };
  const handleCheckListClose = () => {
    setCheckListOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategorySelect(value);
  };

  const handleAdd = (category, items, index) => {
    // Close any modals or popups
    setOpen(false);
    setOpenConfirmation(false);
    console.log(category, items);

    // Copy the current state of tableData
    const updatedtableData = [...tableData];

    items.forEach((item) => {
      if (item.quantity) {
        // Food item
        const newOrder = {
          itemId: item.id,
          itemName: item.name,
          portionSize: item.quantity,
          price: parseFloat(item.price),
        };

        updatedtableData[index] = {
          ...updatedtableData[index],
          diningDetails: {
            ...updatedtableData[index].diningDetails,
            orders: [
              ...(updatedtableData[index].diningDetails?.orders || []),
              {
                orderId: `OR:${new Date().toLocaleTimeString()}`,
                items: [newOrder],
                attendant: "Attendant Name",
                status: "open",
                timeOfRequest: new Date(),
                timeOfFullfilment: "",
                payment: {},
              },
            ],
          },
        };
      } else if (item.issueSubtype) {
        // Issue item
        const newIssue = {
          issueId: `IS:${new Date().getTime()}`,
          name: item.name,
          issueSubtype: item.issueSubtype,
          description: issueDescription
            ? issueDescription
            : "No description provided",
          reportTime: new Date(),
          status: "Assigned",
          attendant: "Attendant Name",
        };

        updatedtableData[index] = {
          ...updatedtableData[index],
          issuesReported: {
            ...updatedtableData[index].issuesReported,
            [item.name.toLowerCase().replace(/\s+/g, "_")]: newIssue,
          },
        };
      }
    });

    // Update the state with the modified array
    setTableData(updatedtableData);
    console.log("Updated Room Data:", updatedtableData);
  };

  const handleStatusChange = (status, orderId, index) => {
    console.log(
      `Attempting to change status to: ${status} for order: ${orderId}`
    );
    if (status === "Paid" || status === "Completed") {
      console.log("Status is paid or completed, opening confirmation dialog");
      setCurrentStatusChange({ status, orderId, index });
      setOpenPaymentConfirmation(true);
    } else {
      console.log("Updating status directly");
      updateStatus(status, orderId, index);
    }
  };

  const updateStatus = (status, orderId, index) => {
    console.log(`Updating status to: ${status} for order: ${orderId}`);
    setTableData((prevtableData) => {
      const updatedtableData = [...prevtableData];
      let updated = false;

      if (orderId.startsWith("OR")) {
        const orderIndex = updatedtableData[
          index
        ].diningDetails.orders.findIndex((order) => order.orderId === orderId);
        if (orderIndex !== -1) {
          console.log(`Updating dining order status`);
          updatedtableData[index].diningDetails.orders[orderIndex].status =
            status;
          if (status === "paid" || status === "completed") {
            updatedtableData[index].diningDetails.orders[orderIndex].payment = {
              method: "cash",
              amount: calculateOrderTotal(
                updatedtableData[index].diningDetails.orders[orderIndex]
              ),
            };
          }
          updated = true;
        }
      } else if (orderId.startsWith("IS")) {
        const issuesReported = updatedtableData[index].issuesReported;
        for (const issueType in issuesReported) {
          if (issuesReported[issueType].issueId === orderId) {
            console.log(`Updating issue status`);
            issuesReported[issueType].status = status;
            updated = true;
            break;
          }
        }
      }

      if (!updated) {
        console.log(
          `No matching order/service/issue found for orderId: ${orderId}`
        );
      }

      console.log("Updated room data:", updatedtableData);
      return updatedtableData;
    });
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  return (
    <>
      <Typography variant="h3" mb={2}>
        Live Rooms
      </Typography>

      {tableData && (
        <Grid container spacing={2}>
          {Object.values(tableData).map((item, main) => (
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{ borderRadius: "5px", p: 2 }}
              key={main}
            >
              <Accordion square={false}>
                <AccordionSummary id="panel1-header">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="h5">
                      {item.diningDetails.location}
                    </Typography>
                    <Typography variant="h5">
                      {item.diningDetails.customer.name}
                    </Typography>
                    <Typography variant="h5">
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <PermIdentityOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle1">
                          {item.diningDetails.noOfGuests}
                        </Typography>
                      </Stack>
                    </Typography>
                    <StatusChip value={item.diningDetails.status} />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ margin: 1 }}>
                    <div style={{ textAlign: "right", width: "100%" }}>
                      <Button
                        variant="outlined"
                        onClick={handleClickOpen}
                        size="small"
                        endIcon={<ControlPointOutlinedIcon />}
                      >
                        Add
                      </Button>
                    </div>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                    >
                      <DialogTitle>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Typography variant="h5">
                            {item.diningDetails.location}
                          </Typography>
                          <CloseIcon
                            onClick={handleClose}
                            fontSize="small"
                            sx={{
                              color: "rgb(158, 158, 158)",
                              cursor: "pointer",
                            }}
                          />
                        </Stack>

                        <Divider sx={{ m: 1 }} />
                      </DialogTitle>
                      <DialogContent sx={{ minWidth: "450px" }}>
                        <Grid container>
                          <Grid item xs={12}>
                            <InputLabel htmlFor="room-status" sx={{ mb: 2 }}>
                              Category
                            </InputLabel>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categorySelect}
                                label="Age"
                                onChange={handleCategoryChange}
                              >
                                <MenuItem value={"Food"}>Food</MenuItem>
                                <MenuItem value={"Issue"}>Issue</MenuItem>
                              </Select>
                            </FormControl>
                            <InputLabel
                              htmlFor="room-status"
                              sx={{ mb: 1, mt: 1 }}
                            >
                              Search
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-search"
                              value={categorySearchTerm}
                              onChange={handleCategorySearchChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  {categoryItems.length === 0 ? (
                                    <SearchOutlinedIcon
                                      sx={{ cursor: "pointer" }}
                                    />
                                  ) : (
                                    <CloseIcon
                                      onClick={() => {
                                        setCategoryItems([]);
                                        setCategorySearchTerm("");
                                      }}
                                      sx={{ cursor: "pointer" }}
                                    />
                                  )}
                                </InputAdornment>
                              }
                              placeholder={`Search ${categorySelect} items`}
                              fullWidth
                            />

                            {/* Display filtered minibar items below input as a dropdown */}
                            {categoryItems.length > 0 && (
                              <Table size="small">
                                <TableBody>
                                  {categoryItems.map((item, i) => (
                                    <TableRow key={i}>
                                      <TableCell component="th" scope="row">
                                        {i + 1}.
                                      </TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      {categorySelect === "Food" && (
                                        <TableCell>{item.quantity}</TableCell>
                                      )}

                                      {categorySelect === "Food" && (
                                        <TableCell>{item.price}</TableCell>
                                      )}
                                      {categorySelect === "Issue" && (
                                        <TableCell>
                                          {item.issueSubtype}
                                        </TableCell>
                                      )}
                                      <TableCell>
                                        <Checkbox
                                          checked={selectedCategoryItems.includes(
                                            item
                                          )}
                                          onChange={() =>
                                            handleCategoryItemSelect(item)
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}

                            {/* Display selected minibar items below input */}
                            {selectedCategoryItems.length > 0 && (
                              <>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                  Selected Items:
                                </Typography>
                                <Table size="small">
                                  <TableBody>
                                    {selectedCategoryItems.map((item, i) => (
                                      <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                          {i + 1}.
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        {categorySelect === "Food" && (
                                          <TableCell>{item.quantity}</TableCell>
                                        )}

                                        {categorySelect === "Food" && (
                                          <TableCell>{item.price}</TableCell>
                                        )}
                                        {categorySelect === "Issue" && (
                                          <TableCell>
                                            {item.issueSubtype}
                                          </TableCell>
                                        )}
                                        <TableCell>
                                          <Checkbox
                                            checked={selectedCategoryItems.includes(
                                              item
                                            )}
                                            onChange={() =>
                                              handleCategoryItemSelect(item)
                                            }
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </>
                            )}

                            {categorySelect === "Issue" ? (
                              <>
                                <TextField
                                  id="outlined-textarea"
                                  label="Notes"
                                  placeholder="Note"
                                  multiline
                                  fullWidth
                                  sx={{ mt: 2 }}
                                  value={issueDescription}
                                  onChange={(e) =>
                                    setIssueDescription(e.target.value)
                                  }
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={handleClose}
                          size="small"
                          sx={{
                            margin: "0 1rem 0 0",
                            letterSpacing: "1px",
                            backgroundColor: "red",
                            "&:hover": { backgroundColor: "#d93e3e" },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            letterSpacing: "1px",
                            backgroundColor: "black",
                            "&:hover": { backgroundColor: "grey" },
                          }}
                          endIcon={<SendRoundedIcon />}
                          onClick={() => setOpenConfirmation(true)}
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={checkListOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCheckListClose}
                    >
                      <DialogTitle>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Typography variant="h5">R:201</Typography>
                          <CloseIcon
                            onClick={handleCheckListClose}
                            fontSize="small"
                            sx={{ color: "rgb(158, 158, 158)" }}
                          />
                        </Stack>

                        <Divider sx={{ m: 1 }} />
                      </DialogTitle>
                      <DialogContent sx={{ minWidth: "350px" }}>
                        <Typography variant="subtitle1">
                          Complete the checkout process. Check Items that are as
                          is condition.
                        </Typography>
                        <Grid container sx={{ mt: 3 }}>
                          <Grid item xs={12}>
                            <FormGroup>
                              {checklistItems.map((check, i) => (
                                <div key={i}>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label={check.name}
                                    labelPlacement="start"
                                    sx={{
                                      justifyContent:
                                        "space-between !important",
                                      marginLeft: 0,
                                    }}
                                  />
                                  <Divider sx={{ margin: "5px 0" }} />
                                </div>
                              ))}
                            </FormGroup>
                            <Divider sx={{ m: 1 }} />
                            <Typography variant="h5">
                              Additional Charges
                            </Typography>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={isMiniBarChecked}
                                    onChange={(e) =>
                                      setIsMiniBarChecked(e.target.checked)
                                    }
                                  />
                                }
                                label="Mini-Bar: Were any mini-bar items consumed?"
                                labelPlacement="start"
                                sx={{
                                  justifyContent: "space-between",
                                  marginLeft: 0,
                                }}
                              />
                              {isMiniBarChecked && (
                                <>
                                  <OutlinedInput
                                    id="outlined-adornment-search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        {filteredItems.length === 0 ? (
                                          <SearchOutlinedIcon
                                            sx={{ cursor: "pointer" }}
                                          />
                                        ) : (
                                          <CloseIcon
                                            onClick={() => {
                                              setFilteredItems([]);
                                              setSearchTerm("");
                                            }}
                                            sx={{ cursor: "pointer" }}
                                          />
                                        )}
                                      </InputAdornment>
                                    }
                                    placeholder="Search minibar items"
                                    fullWidth
                                  />

                                  {/* Display filtered minibar items below input as a dropdown */}
                                  {filteredItems.length > 0 && (
                                    <Table size="small">
                                      <TableBody>
                                        {filteredItems.map((item, i) => (
                                          <TableRow key={i}>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {i + 1}.
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                              {item.quantity}
                                            </TableCell>
                                            <TableCell>${item.price}</TableCell>
                                            <TableCell>
                                              <Checkbox
                                                checked={selectedItems.includes(
                                                  item
                                                )}
                                                onChange={() =>
                                                  handleItemSelect(item)
                                                }
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  )}

                                  {/* Display selected minibar items below input */}
                                  {selectedItems.length > 0 && (
                                    <>
                                      <Typography variant="h6" sx={{ mt: 2 }}>
                                        Selected Items:
                                      </Typography>
                                      <Table size="small">
                                        <TableBody>
                                          {selectedItems.map((item, i) => (
                                            <TableRow key={i}>
                                              <TableCell
                                                component="th"
                                                scope="row"
                                              >
                                                {i + 1}.
                                              </TableCell>
                                              <TableCell>{item.name}</TableCell>
                                              <TableCell>
                                                {item.quantity}
                                              </TableCell>
                                              <TableCell>
                                                ${item.price}
                                              </TableCell>
                                              <TableCell>
                                                <Checkbox
                                                  checked={selectedItems.includes(
                                                    item
                                                  )}
                                                  onChange={() =>
                                                    handleItemSelect(item)
                                                  }
                                                />
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </>
                                  )}
                                </>
                              )}
                            </FormGroup>

                            <Typography variant="subtitle1" mt={2} mb={2}>
                              Note
                            </Typography>
                            <TextField
                              id="outlined-textarea"
                              label="Notes"
                              placeholder="Note"
                              multiline
                              fullWidth
                            />
                          </Grid>
                          <div style={{ width: "100%", textAlign: "right" }}>
                            <Typography
                              variant="h6"
                              sx={{ mt: 2, textAlign: "right" }}
                            >
                              Total Amount:
                              {calculateTotal()}
                            </Typography>
                          </div>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={handleCheckListClose}
                          size="small"
                          sx={{
                            margin: "0 1rem 0 0",
                            letterSpacing: "1px",
                            backgroundColor: "red",
                            "&:hover": { backgroundColor: "#d93e3e" },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            letterSpacing: "1px",
                            backgroundColor: "black",
                            "&:hover": { backgroundColor: "grey" },
                          }}
                          endIcon={<SendRoundedIcon />}
                          onClick={handleCheckListClose}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={openConfirmation}
                      onClose={() => setOpenConfirmation(false)}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure. You want to add this?"}
                      </DialogTitle>
                      <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description">
                          Are you sure. You want to add this?
                        </DialogContentText> */}
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setOpenConfirmation(false)}
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            handleAdd(
                              categorySelect,
                              selectedCategoryItems,
                              main
                            )
                          }
                          autoFocus
                          variant="contained"
                          sx={{ bgcolor: "black" }}
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={openPaymentConfirmation}
                      onClose={() => {
                        console.log("Closing payment confirmation dialog");
                        setOpenPaymentConfirmation(false);
                      }}
                    >
                      <DialogTitle>Confirm Cash Payment</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          This action can only be done if the payment is in
                          cash. Do you confirm that the payment has been
                          received in cash?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            console.log("Cancelling payment confirmation");
                            setOpenPaymentConfirmation(false);
                          }}
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            console.log("Confirming payment");
                            if (currentStatusChange) {
                              updateStatus(
                                currentStatusChange.status,
                                currentStatusChange.orderId,
                                currentStatusChange.index
                              );
                            } else {
                              console.log("Error: currentStatusChange is null");
                            }
                            setOpenPaymentConfirmation(false);
                          }}
                          color="primary"
                          autoFocus
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {item.diningDetails.orders.map((order, i) => (
                      <div key={i}>
                        <Stack
                          direction="row"
                          mt={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6" mr={4}>
                            {order.orderId}
                          </Typography>
                          <StatusChip value={order.status} />
                          <MoreVertIcon
                            onClick={(e) =>
                              handleClickMoreVert(e, order.orderId)
                            }
                            fontSize="small"
                            sx={{ cursor: "pointer" }}
                          />
                          <Popover
                            id={`menu-${order.orderId}`}
                            open={Boolean(anchorEls[order.orderId])}
                            anchorEl={anchorEls[order.orderId]}
                            onClose={() =>
                              setAnchorEls((prev) => ({
                                ...prev,
                                [order.orderId]: null,
                              }))
                            }
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            {status.dining.map((stat, id) => (
                              <React.Fragment key={id}>
                                <Typography
                                  sx={{ p: 1, cursor: "pointer" }}
                                  onClick={() => {
                                    handleStatusChange(
                                      stat,
                                      order.orderId,
                                      main
                                    );
                                    setAnchorEls((prev) => ({
                                      ...prev,
                                      [order.orderId]: null,
                                    }));
                                  }}
                                >
                                  {stat}
                                </Typography>
                                <Divider sx={{ m: 1 }} />
                              </React.Fragment>
                            ))}
                          </Popover>
                        </Stack>
                        <Divider sx={{ m: 1 }} />

                        {order.items.map((itm, id) => (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            key={id}
                            mt={2}
                          >
                            <Stack direction="row">
                              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                {id + 1}.
                              </Typography>
                              <Typography variant="subtitle1">
                                {itm.itemName}
                              </Typography>
                            </Stack>

                            <Typography
                              variant="subtitle1"
                              sx={{ margin: "0 5", color: "#2626268a" }}
                            >
                              |
                            </Typography>
                            <Typography variant="subtitle1">
                              {itm.portionSize}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ margin: "0 5", color: "#2626268a" }}
                            >
                              |
                            </Typography>
                            <Typography variant="subtitle1">
                              {itm.price}
                            </Typography>
                          </Stack>
                        ))}
                        <Divider sx={{ m: 1 }} />
                        {order.status !== "Paid" &&
                        order.status !== "Completed" ? (
                          <Typography
                            variant="subtitle1"
                            sx={{ mt: 1, fontWeight: "bold" }}
                          >
                            Pending Amount: $
                            {calculateOrderTotal(order).toFixed(2)}
                          </Typography>
                        ) : (
                          <Typography
                            variant="subtitle1"
                            sx={{ mt: 1, fontWeight: "bold" }}
                          >
                            Payment: Cash - $
                            {parseFloat(order.payment.amount).toFixed(2)}
                          </Typography>
                        )}
                      </div>
                    ))}

                    <Divider sx={{ m: 1 }} />
                    {Object.values(item.issuesReported).map((issue, i) => (
                      <div key={i}>
                        <Stack
                          direction="row"
                          mt={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h6" mr={4}>
                            {issue.issueId}
                          </Typography>
                          <StatusChip value={issue.status} />
                          <MoreVertIcon
                            onClick={(e) =>
                              handleClickMoreVert(e, issue.issueId)
                            }
                            fontSize="small"
                            sx={{ cursor: "pointer" }}
                          />
                          <Popover
                            id={`issue-${issue.issueId}`}
                            open={Boolean(anchorEls[issue.issueId])}
                            anchorEl={anchorEls[issue.issueId]}
                            onClose={() =>
                              setAnchorEls((prev) => ({
                                ...prev,
                                [issue.issueId]: null,
                              }))
                            }
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            {status.issue.map((stat, id) => (
                              <React.Fragment key={id}>
                                <Typography
                                  sx={{ p: 1, cursor: "pointer" }}
                                  onClick={() => {
                                    handleStatusChange(
                                      stat,
                                      issue.issueId,
                                      main
                                    );
                                    setAnchorEls((prev) => ({
                                      ...prev,
                                      [issue.issueId]: null,
                                    }));
                                  }}
                                >
                                  {stat}
                                </Typography>
                                <Divider sx={{ m: 1 }} />
                              </React.Fragment>
                            ))}
                          </Popover>
                        </Stack>
                        <Divider sx={{ m: 1 }} />

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          mt={2}
                        >
                          <Stack direction="row">
                            <Typography variant="subtitle1" sx={{ mr: 1 }}>
                              1.
                            </Typography>
                            <Typography variant="subtitle1">
                              {issue.category}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="subtitle1"
                            sx={{ margin: "0 5", color: "#2626268a" }}
                          >
                            |
                          </Typography>
                          <Typography variant="subtitle1">
                            {issue.name}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            sx={{ margin: "0 5", color: "#2626268a" }}
                          >
                            |
                          </Typography>
                          <Typography variant="subtitle1">
                            {new Date(issue.reportTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                          {issue.resolutionTime && (
                            <Typography variant="subtitle1">
                              {new Date(
                                issue.resolutionTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          )}
                          <Typography
                            variant="subtitle1"
                            sx={{ margin: "0 5", color: "#2626268a" }}
                          >
                            |
                          </Typography>
                          <Typography variant="subtitle1">
                            {issue.description}
                          </Typography>
                        </Stack>
                      </div>
                    ))}

                    <Divider sx={{ m: 1 }} />
                    <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                      Total Pending Amount: $
                      {item.diningDetails.orders
                        .reduce(
                          (total, order) =>
                            order.status !== "Paid" &&
                            order.status !== "Completed"
                              ? total + calculateOrderTotal(order)
                              : total,
                          0
                        )
                        .toFixed(2)}
                    </Typography>

                    <Divider sx={{ m: 1 }} />
                    <Button
                      variant="outlined"
                      onClick={handleCheckListClickOpen}
                      size="small"
                      endIcon={<ChecklistOutlinedIcon />}
                    >
                      Checkout Checklist
                    </Button>
                    <div style={{ textAlign: "right", width: "100%" }}>
                      <Button
                        variant="contained"
                        onClick={handleCheckListClickOpen}
                        size="small"
                        endIcon={<ChecklistOutlinedIcon />}
                      >
                        Submit
                      </Button>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Ongoing;
