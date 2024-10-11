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
const reserved = ({ data, status }) => {
  // console.log(data);
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
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      let updated = false;

      if (orderId.startsWith("OR")) {
        const orderIndex = updatedTableData[
          index
        ].diningDetails.orders.findIndex((order) => order.orderId === orderId);
        if (orderIndex !== -1) {
          console.log(`Updating dining order status`);
          updatedTableData[index].diningDetails.orders[orderIndex].status =
            status;
          if (status === "paid" || status === "completed") {
            updatedTableData[index].diningDetails.orders[orderIndex].payment = {
              method: "cash",
              amount: calculateOrderTotal(
                updatedTableData[index].diningDetails.orders[orderIndex]
              ),
            };
          }
          updated = true;
        }
      } else if (orderId.startsWith("IS")) {
        const issuesReported = updatedTableData[index].issuesReported;
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

      console.log("Updated room data:", updatedTableData);
      return updatedTableData;
    });
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Typography variant="h3" mb={2}>
        Today's CheckIn
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
                      {item.diningDetails.reservationId}
                    </Typography>
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
                    {item.diningDetails.specialRequirements && (
                      <>
                        <Typography variant="h5">
                          Special Requirement
                        </Typography>
                        <Typography variant="h6">
                          {item.diningDetails.specialRequirements}
                        </Typography>
                      </>
                    )}
                    <Typography variant="h5">Reservation Time</Typography>
                    <Typography variant="h6">
                      {new Date(
                        item.diningDetails.reservationTime
                      ).toLocaleString()}
                    </Typography>
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

export default reserved;
