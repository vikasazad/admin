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

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import StatusChip from "../../../utils/StatusChip";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const vacant = ({ data, status }) => {
  // console.log("Vacant", data);
  //   Object.values(data).map((item) => console.log(typeof item));
  const [age, setAge] = useState("");
  const [addItems, setAddItems] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    setRoomData(data);
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
    setRoomData((prevRoomData) => {
      const updatedRoomData = [...prevRoomData];
      let updated = false;

      if (orderId.startsWith("OR")) {
        const orderIndex = updatedRoomData[
          index
        ].diningDetails.orders.findIndex((order) => order.orderId === orderId);
        if (orderIndex !== -1) {
          console.log(`Updating dining order status`);
          updatedRoomData[index].diningDetails.orders[orderIndex].status =
            status;
          if (status === "paid" || status === "completed") {
            updatedRoomData[index].diningDetails.orders[orderIndex].payment = {
              method: "cash",
              amount: calculateOrderTotal(
                updatedRoomData[index].diningDetails.orders[orderIndex]
              ),
            };
          }
          updated = true;
        }
      } else if (orderId.startsWith("SE")) {
        const servicesUsed = updatedRoomData[index].servicesUsed;
        for (const serviceType in servicesUsed) {
          if (servicesUsed[serviceType].serviceId === orderId) {
            console.log(`Updating service status`);
            servicesUsed[serviceType].status = status;
            if (status === "paid" || status === "completed") {
              servicesUsed[serviceType].payment = {
                method: "cash",
                amount: servicesUsed[serviceType].price,
              };
            }
            updated = true;
            break;
          }
        }
      } else if (orderId.startsWith("IS")) {
        const issuesReported = updatedRoomData[index].issuesReported;
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

      console.log("Updated room data:", updatedRoomData);
      return updatedRoomData;
    });
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Typography variant="h3" mb={2}>
        Vacant Rooms
      </Typography>

      {roomData && (
        <Grid container spacing={2}>
          {Object.values(roomData).map((item, main) => (
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
                    <Typography variant="h5">{item.roomNo}</Typography>
                    <Typography variant="h5">{item.roomType}</Typography>
                    <StatusChip value={item.status} />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h5">Last Cleaned</Typography>
                    <Typography variant="h6">
                      {new Date(item.cleaning.lastCleaned).toLocaleString()}
                    </Typography>
                    <Typography variant="h5">Cleaned By</Typography>
                    <Typography variant="h6">
                      {item.cleaning.cleanedBy}
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

export default vacant;
