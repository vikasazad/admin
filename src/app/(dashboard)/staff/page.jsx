"use client";
 
import React, { useState } from "react";

import MainCard from "../../components/MainCard";

import { useTheme, styled } from "@mui/material/styles";
 
import {
  Grid,
  TextField,
  Button,
 
  Snackbar,
  IconButton,
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
 
  Tooltip,
  Zoom,
  Fab,
  Tabs,
  Tab,
  TabPanel,

  ListSubheader,
  Paper,
  Card,
  CardHeader,
 
 
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
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SamplePage() {
  const [value, setValue] = useState(0);
  const [age, setAge] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [open, setOpen] = useState(false);
  const [checkListOpen, setCheckListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [isMiniBarChecked, setIsMiniBarChecked] = useState(false);

  const handleMiniBarCheckboxChange = (e) => {
    setIsMiniBarChecked(e.target.checked);
  };
  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search) {
      const filtered = minibarItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };
  const handleCategorySearchChange = (e) => {
    const search = e.target.value;
    setCategorySearchTerm(search);

    if (search) {
      const arr =
        categorySelect === "Food"
          ? foodMenuItems
          : categorySelect === "Service"
          ? hotelServices
          : categorySelect === "Issue"
          ? hotelRoomIssues
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

  const handleCheckListClose = () => {
    setCheckListOpen(false);
  };

  const handleSelect = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategorySelect(value);
  };

  return (
    <MainCard
      sx={{
        backgroundColor: "#f2f2f2",
        padding: "0",
        ".css-1v9be3b-MuiCardContent-root": { padding: "10px" },
      }}
    >
      <Box
        sx={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}
      >
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Rooms" {...a11yProps(0)} />
              <Tab label="Tables" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{ borderRadius: "5px", p: 2 }}
              >
                <Accordion square={false}>
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div style={{ display: "flex" }}>
                      <Typography variant="h5" sx={{ mr: 4 }}>
                        R:201
                      </Typography>
                      <Chip
                        label="Available"
                        sx={{
                          color: "rgb(255, 255, 255)",
                          backgroundColor: "rgb(22, 119, 255)",
                          borderColor: "",
                          fontSize: "0.8rem",
                          height: "24px",
                          whiteSpace: "nowrap",
                          transition:
                            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                          borderRadius: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          "&hover": {
                            backgroundColor: "black",
                          },
                        }}
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ margin: 1 }}>
                      <div style={{ textAlign: "right", width: "100%" }}>
                        <Button
                          variant="outlined"
                          onClick={handleClickOpen}
                          size="small"
                          endIcon={<ControlPointOutlinedIcon />}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          Add
                        </Button>
                      </div>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          <Stack
                            direction="row"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography variant="h5">R:201</Typography>
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
                        <DialogContent sx={{ minWidth: "350px" }}>
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
                                  <MenuItem value={"Service"}>Service</MenuItem>
                                  <MenuItem value={"Issue"}>Issue</MenuItem>
                                </Select>
                              </FormControl>
                              <InputLabel
                                htmlFor="room-status"
                                sx={{ mb: 1, mt: 1 }}
                              >
                                Status
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
                                aria-describedby="outlined-search-helper-text"
                                inputProps={{
                                  "aria-label": "search",
                                }}
                                placeholder={`Search ${categorySelect} items`}
                                fullWidth
                              />

                              {/* Display filtered minibar items below input as a dropdown */}
                              {categoryItems.length > 0 && (
                                <Table size="small" aria-label="purchases">
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
                                        {categorySelect === "Service" && (
                                          <TableCell>
                                            {item.startTime}
                                          </TableCell>
                                        )}
                                        {categorySelect === "Service" && (
                                          <TableCell>{item.endTime}</TableCell>
                                        )}
                                        {categorySelect === "Service" ||
                                          (categorySelect === "Food" && (
                                            <TableCell>
                                              ${item.price.toFixed(2)}
                                            </TableCell>
                                          ))}
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
                                  <Table
                                    size="small"
                                    aria-label="selected-items"
                                  >
                                    <TableBody>
                                      {selectedCategoryItems.map((item, i) => (
                                        <TableRow key={i}>
                                          <TableCell component="th" scope="row">
                                            {i + 1}.
                                          </TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          {categorySelect === "Food" && (
                                            <TableCell>
                                              {item.quantity}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" && (
                                            <TableCell>
                                              {item.startTime}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" && (
                                            <TableCell>
                                              {item.endTime}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" ||
                                            (categorySelect === "Food" && (
                                              <TableCell>
                                                ${item.price.toFixed(2)}
                                              </TableCell>
                                            ))}
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
                            onClick={handleClose}
                          >
                            Submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Stack direction="row">
                        <Typography variant="h6" sx={{ mr: 4 }}>
                          ORDER:5589
                        </Typography>
                        <Chip
                          label="Occupied"
                          sx={{
                            color: "rgb(255, 255, 255)",
                            backgroundColor: "rgb(82, 196, 26)",
                            borderColor: "",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&hover": {
                              backgroundColor: "black",
                            },
                          }}
                        />
                      </Stack>

                      <Divider sx={{ m: 1 }} />
                      <Stack direction="row">
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>
                          1.
                        </Typography>
                        <Typography variant="subtitle1">
                          Chicken Seek kabab Chicken Seek kabab
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ margin: "0 5", color: "#2626268a" }}
                        >
                          |
                        </Typography>
                        <Typography variant="subtitle1">Full</Typography>
                      </Stack>
                      <Stack direction="row" sx={{ margin: "1rem 0" }}>
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>
                          2.
                        </Typography>
                        <Typography variant="subtitle1">
                          Chicken Seek kabab Chicken Seek kabab
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ margin: "0 5", color: "#2626268a" }}
                        >
                          |
                        </Typography>
                        <Typography variant="subtitle1">Full</Typography>
                      </Stack>
                      <Divider sx={{ m: 1 }} />
                      <InputLabel htmlFor="room-status" sx={{ m: 1 }}>
                        Status
                      </InputLabel>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>

                      <Divider sx={{ m: 1 }} />
                      <div style={{ textAlign: "right", width: "100%" }}>
                        <Button
                          variant="outlined"
                          onClick={handleCheckListClickOpen}
                          size="small"
                          endIcon={<ChecklistOutlinedIcon />}
                        >
                          Checkout Checklist
                        </Button>
                      </div>
                    </Box>

                    <Dialog
                      open={checkListOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleCheckListClose}
                      aria-describedby="alert-dialog-slide-description"
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
                                <>
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
                                </>
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
                                    onChange={handleMiniBarCheckboxChange}
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
                                    aria-describedby="outlined-search-helper-text"
                                    inputProps={{
                                      "aria-label": "search",
                                    }}
                                    placeholder="Search minibar items"
                                    fullWidth
                                  />

                                  {/* Display filtered minibar items below input as a dropdown */}
                                  {filteredItems.length > 0 && (
                                    <Table size="small" aria-label="purchases">
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
                                            <TableCell>{item.weight}</TableCell>
                                            <TableCell>
                                              ${item.price.toFixed(2)}
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
                                  )}

                                  {/* Display selected minibar items below input */}
                                  {selectedItems.length > 0 && (
                                    <>
                                      <Typography variant="h6" sx={{ mt: 2 }}>
                                        Selected Items:
                                      </Typography>
                                      <Table
                                        size="small"
                                        aria-label="selected-items"
                                      >
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
                                                {item.weight}
                                              </TableCell>
                                              <TableCell>
                                                ${item.price.toFixed(2)}
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
                              {calculateTotal().toFixed(2)}
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
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{ borderRadius: "5px", p: 2 }}
              >
                <Accordion square={false}>
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div style={{ display: "flex" }}>
                      <Typography variant="h5" sx={{ mr: 4 }}>
                        T:201
                      </Typography>
                      <Chip
                        label="Available"
                        sx={{
                          color: "rgb(255, 255, 255)",
                          backgroundColor: "rgb(22, 119, 255)",
                          borderColor: "",
                          fontSize: "0.8rem",
                          height: "24px",
                          whiteSpace: "nowrap",
                          transition:
                            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                          borderRadius: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          "&hover": {
                            backgroundColor: "black",
                          },
                        }}
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ margin: 1 }}>
                      <div style={{ textAlign: "right", width: "100%" }}>
                        <Button
                          variant="outlined"
                          onClick={handleClickOpen}
                          size="small"
                          endIcon={<ControlPointOutlinedIcon />}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          Add
                        </Button>
                      </div>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          <Stack
                            direction="row"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography variant="h5">T:201</Typography>
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
                        <DialogContent sx={{ minWidth: "350px" }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <InputLabel
                                htmlFor="room-status"
                                sx={{ mb: 1, mt: 1 }}
                              >
                                Status
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
                                aria-describedby="outlined-search-helper-text"
                                inputProps={{
                                  "aria-label": "search",
                                }}
                                placeholder={`Search ${categorySelect} items`}
                                fullWidth
                              />

                              {/* Display filtered minibar items below input as a dropdown */}
                              {categoryItems.length > 0 && (
                                <Table size="small" aria-label="purchases">
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
                                        {categorySelect === "Service" && (
                                          <TableCell>
                                            {item.startTime}
                                          </TableCell>
                                        )}
                                        {categorySelect === "Service" && (
                                          <TableCell>{item.endTime}</TableCell>
                                        )}
                                        {categorySelect === "Service" ||
                                          (categorySelect === "Food" && (
                                            <TableCell>
                                              ${item.price.toFixed(2)}
                                            </TableCell>
                                          ))}
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
                                  <Table
                                    size="small"
                                    aria-label="selected-items"
                                  >
                                    <TableBody>
                                      {selectedCategoryItems.map((item, i) => (
                                        <TableRow key={i}>
                                          <TableCell component="th" scope="row">
                                            {i + 1}.
                                          </TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          {categorySelect === "Food" && (
                                            <TableCell>
                                              {item.quantity}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" && (
                                            <TableCell>
                                              {item.startTime}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" && (
                                            <TableCell>
                                              {item.endTime}
                                            </TableCell>
                                          )}
                                          {categorySelect === "Service" ||
                                            (categorySelect === "Food" && (
                                              <TableCell>
                                                ${item.price.toFixed(2)}
                                              </TableCell>
                                            ))}
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
                            onClick={handleClose}
                          >
                            Submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Stack direction="row">
                        <Typography variant="h6" sx={{ mr: 4 }}>
                          ORDER:5589
                        </Typography>
                        <Chip
                          label="Occupied"
                          sx={{
                            color: "rgb(255, 255, 255)",
                            backgroundColor: "rgb(82, 196, 26)",
                            borderColor: "",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&hover": {
                              backgroundColor: "black",
                            },
                          }}
                        />
                      </Stack>

                      <Divider sx={{ m: 1 }} />
                      <Table size="small" aria-label="selected-items">
                        <TableBody>
                          {minibarItems.slice(0, 3).map((item, i) => (
                            <TableRow key={i}>
                              <TableCell component="th" scope="row">
                                {i + 1}.
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.weight}</TableCell>
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Typography
                        variant="h6"
                        sx={{ mt: 2, textAlign: "right" }}
                      >
                        Total Amount: 999
                      </Typography>
                      <Divider sx={{ m: 1 }} />
                      <InputLabel htmlFor="room-status" sx={{ m: 1 }}>
                        Status
                      </InputLabel>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>

                      <Divider sx={{ m: 1 }} />
                      <div style={{ textAlign: "right", width: "100%" }}>
                        <Button
                          variant="contained"
                          size="small"
                          
                        >
                          Payment Paid
                        </Button>
                      </div>
                    </Box>

                   
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Container>
      </Box>


           
         
       
 
    </MainCard>
  );
}
