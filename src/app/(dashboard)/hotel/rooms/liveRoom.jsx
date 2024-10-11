"use client";
import { React, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Box,
  Divider,
} from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MainCard from "../../../components/MainCard";
import CollapsibleDiningTable from "../../../pages/table/CollapsibleDiningTable";
import CollapsibleServicesTable from "../../../pages/table/CollapsibleServicesTable";
import CollapsibleIssuesTable from "../../../pages/table/CollapsibleIssuesTable";
import StatysChip from "../../../utils/StatusChip";

export default function LiveRoom({ data }) {
  const room = data.rooms;
  console.log("live", room);
  const info = {
    orders: [
      {
        orderId: "OR:123",
        items: [
          {
            itemId: "gac1",
            itemName: "Pizza",
            portionSize: "Large",
            price: 20,
          },
          {
            itemId: "mac1",
            itemName: "Salad",
            portionSize: "Small",
            price: 10,
          },
        ],
        attendant: "Alice Smith",
        status: "in progress",
        timeOfRequest: "",
        timeOfFullfilment: "",
        payment: {
          paymentStatus: "pending",
          mode: "online",
          paymentId: "TXN123456",
          timeOfTransaction: JSON.stringify(new Date().toLocaleTimeString()),
          price: 30,
          priceAfterDiscount: 27,
          discount: {
            type: "coupon",
            amount: 3,
            code: "SAVE10",
          },
        },
      },
      // Add more orders as needed
    ],
  };
  const servicesUsed = {
    massage: {
      serviceId: "SE:123",
      serviceName: "Massage",
      type: "massage",
      requestTime: JSON.stringify(new Date().toLocaleTimeString()),
      startTime: JSON.stringify(new Date().toLocaleTimeString()),
      endTime: JSON.stringify(new Date().toLocaleTimeString()),
      price: 50,
      attendant: "Bob Johnson",
      payment: {
        paymentStatus: "pending",
        mode: "offline",
        paymentId: "CASH123",
        timeOfTransaction: JSON.stringify(new Date().toLocaleTimeString()),
        price: 60,
        priceAfterDiscount: 50,
        discount: {
          type: "coupon",
          amount: 3,
          code: "SAVE10",
        },
      },
    },
    // Add more services as needed
  };

  const issuesReported = {
    lateService: {
      issueId: "IS:123",
      category: "service",
      name: "Late order delivery",
      description: "Spaghetti Carbonara took too long to arrive.",
      reportTime: JSON.stringify(new Date("2024-09-23T19:00:00Z")),
      status: "Assigned",
      attendant: "Charlie Brown",
      resolutionTime: null,
    },
    // Add more issues as needed
  };
  return (
    <MainCard
      sx={{
        backgroundColor: "#f2f2f2",
        padding: "0",
        ".css-1v9be3b-MuiCardContent-root": { padding: "10px" },
        overflowX: { xs: "auto", md: "auto" },
        whiteSpace: { xs: "nowrap", md: "nowrap" },
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "10px",
            minWidth: "800px",
          }}
        >
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Room No.
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Aggregator
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Name
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Check In
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Check Out
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Attendant
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              People
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Amount
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Status
            </Typography>
          </Grid>
        </Grid>

        {room.map((item) => {
          return (
            <Stack spacing={2} sx={{ minWidth: "800px", margin: "1rem 0" }}>
              <Accordion square={false} sx={{ borderRadius: "20px" }}>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Grid container>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.bookingDetails.location}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.bookingDetails.aggregator}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.bookingDetails.roomType}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {new Date(
                          item.bookingDetails.checkIn
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {new Date(
                          item.bookingDetails.checkIn
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.bookingDetails?.attendant}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <PermIdentityOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle1">
                          {item.bookingDetails.noOfGuests}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.bookingDetails.payment.priceAfterDiscount}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <StatysChip value={item.bookingDetails.status} />
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ margin: 1 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "#7d7d7d" }}
                    >
                      History
                    </Typography>
                    <Divider sx={{ m: 1 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Food
                    </Typography>
                    <CollapsibleDiningTable data={item.diningDetails.orders} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Services
                    </Typography>
                    <CollapsibleServicesTable data={item.servicesUsed} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Issues
                    </Typography>
                    <CollapsibleIssuesTable data={item.issuesReported} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Special Requirements & Arrangements
                    </Typography>
                    <div
                      style={{
                        display: "block",
                        overflow: "hidden", // Ensure content does not overflow the div
                        textOverflow: "ellipsis", // Add ellipsis if the text is too long
                        whiteSpace: "normal", // Allow text to wrap within the div
                        wordWrap: "break-word", // Break long words to prevent overflow
                      }}
                    >
                      <Typography variant="h6">
                        {item.bookingDetails.specialRequirements}
                      </Typography>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Stack>
          );
        })}
      </Box>
    </MainCard>
  );
}
