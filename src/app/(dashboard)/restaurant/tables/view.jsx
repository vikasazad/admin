import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Card, Avatar, Stack } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import StatusChip from "../../../utils/StatusChip";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import upi from "../../../assets/images/icons/upi.svg";

const TableCard = ({ data }) => {
  const table = data.table;
  console.log("====", table);
  return (
    <>
      {data.label === "Occupied" && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ boxShadow: "2px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Typography variant="h4">
                  {table?.diningDetails?.location}
                </Typography>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                  src={table?.diningDetails?.aggregatorLogo}
                />
              </Stack>
              <StatusChip value={table?.diningDetails?.status} />
            </Stack>
            <Stack spacing={1} sx={{ margin: "2rem 0 0 0 " }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <PermIdentityOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {table.diningDetails.customer.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <Groups2OutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {table.diningDetails.noOfGuests}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <AccessTimeOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {new Date(
                    table.diningDetails.timeSeated
                  ).toLocaleTimeString()}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <RestaurantOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {table.diningDetails.orders.map((item) =>
                    item.items.map((data) => data.itemName).join(", ")
                  )}
                </Typography>
              </Stack>
            </Stack>
            {/* <Stack direction="row" spacing={3} sx={{ margin: "1rem 0" }}>
              <Stack direction="row" spacing={1}>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                  src={room.bookingDetails.aggregatorLogo}
                />
                <Typography variant="h6">
                  {room.bookingDetails.aggregator}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <Groups2OutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.noOfGuests}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <EventOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {new Date(room.bookingDetails.checkIn).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <EventOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {new Date(room.bookingDetails.checkOut).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ margin: "1rem 0" }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  {room.bookingDetails.payment.mode === "online" ? (
                    <AccountBalanceOutlinedIcon />
                  ) : room.bookingDetails.payment.mode === "card" ? (
                    <PaymentOutlinedIcon />
                  ) : room.bookingDetails.payment.mode === "upi" ? (
                    { upi }
                  ) : (
                    <AccountBalanceWalletOutlinedIcon />
                  )}
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.mode}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  P
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.price}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  DP
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.priceAfterDiscount}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  {room.bookingDetails.payment.discount.type === "price"
                    ? "₹"
                    : "%"}
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.discount.type}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  P
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.discount.amount}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  CD
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.payment.discount.code}
                </Typography>
              </Stack>
            </Stack> */}
          </Box>
        </Card>
      )}
      {data.label === "Reserved" && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ boxShadow: "2px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Typography variant="h4">
                  {table?.diningDetails?.location}
                </Typography>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                  src={table?.diningDetails?.aggregatorLogo}
                />
              </Stack>
              <StatusChip value={table?.diningDetails?.status} />
            </Stack>
            <Stack spacing={1} sx={{ margin: "2rem 0 0 0 " }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <PermIdentityOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {table.diningDetails.customer.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <Groups2OutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {table.diningDetails.noOfGuests}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <AccessTimeOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {new Date(
                    table.diningDetails.reservationTime
                  ).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>
      )}

      {(data.label === "Available" || data.label === "Cleaning") && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ boxShadow: "2px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4">{table?.location}</Typography>
              <StatusChip value={table?.status} />
            </Stack>
            <Stack direction="row" spacing={3} sx={{ margin: "1rem 0" }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <CleaningServicesOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {new Date(table.cleaning.lastCleaned).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <PermIdentityOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">{table.cleaning.cleanedBy}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>
      )}
    </>
  );
};

export default function ({ data }) {
  console.log("Live", data);
  const [tables, setTables] = useState(data);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabContent = [
    {
      label: "Occupied",
      tables: {
        label: "Occupied",
        table: tables.occupied,
      },
    },
    {
      label: "Reserved",
      tables: {
        label: "Reserved",
        table: tables.reserved,
      },
    },
    {
      label: "Available",
      tables: {
        label: "Available",
        table: tables.available,
      },
    },
    {
      label: "Cleaning",
      tables: {
        label: "Cleaning",
        table: tables.cleaning,
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tables Overview
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        {tabContent.map((tab, index) => (
          <Tab
            key={index}
            label={`${tab.label} (${tab.tables.table.length})`}
          />
        ))}
      </Tabs>
      {tabContent.map((tab, index) => (
        <Box key={index} role="tabpanel" hidden={tabValue !== index}>
          {tab.tables.table.map((table) => (
            <TableCard
              key={table.id}
              data={{ label: tab.label, table: table }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
