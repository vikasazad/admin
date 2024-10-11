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
import upi from "../../../assets/images/icons/upi.svg";

const RoomCard = ({ data }) => {
  const room = data.room;
  return (
    <>
      {(data.label === "Today's Check-ins" ||
        data.label === "Ongoing Stays" ||
        data.label === "Today's Check-outs") && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ boxShadow: "2px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Typography variant="h4">
                  {`${
                    room?.bookingDetails?.roomType?.charAt(0).toUpperCase() +
                    room?.bookingDetails?.roomType?.slice(1)
                  }`}
                </Typography>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                  src={room.bookingDetails.aggregatorLogo}
                />
              </Stack>

              <StatusChip value={room.bookingDetails.status} />
            </Stack>
            <Stack direction="row" spacing={3} sx={{ margin: "1rem 0" }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <PermIdentityOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.customer.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <AlternateEmailOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.customer.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <LocalPhoneOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  {room.bookingDetails.customer.phone}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ margin: "1rem 0" }}>
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
            </Stack>
          </Box>
        </Card>
      )}

      {(data.label === "Vacant Rooms" || data.label === "Maintenance") && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ boxShadow: "2px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4">
                {`${
                  room?.roomType?.charAt(0).toUpperCase() +
                  room?.roomType?.slice(1)
                }`}
              </Typography>
              <StatusChip value={room.status} />
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
                  {new Date(room.cleaning.lastCleaned).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ bgcolor: "black", width: 24, height: 24 }}
                  variant="rounded"
                >
                  <PermIdentityOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">{room.cleaning.cleanedBy}</Typography>
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
  const [rooms, setRooms] = useState(data);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabContent = [
    {
      label: "Today's Check-ins",
      rooms: {
        label: "Today's Check-ins",
        room: rooms.todayCheckIn,
      },
    },
    {
      label: "Ongoing Stays",
      rooms: {
        label: "Ongoing Stays",
        room: rooms.ongoing,
      },
    },
    {
      label: "Today's Check-outs",
      rooms: {
        label: "Today's Check-outs",
        room: rooms.todayCheckOut,
      },
    },
    {
      label: "Vacant Rooms",
      rooms: {
        label: "Vacant Rooms",
        room: rooms.vacant,
      },
    },
    {
      label: "Maintenance",
      rooms: {
        label: "Maintenance",
        room: rooms.maintenance,
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Hotel Room Overview
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        {tabContent.map((tab, index) => (
          <Tab key={index} label={`${tab.label} (${tab.rooms.room.length})`} />
        ))}
      </Tabs>
      {tabContent.map((tab, index) => (
        <Box key={index} role="tabpanel" hidden={tabValue !== index}>
          {tab.rooms.room.map((room) => (
            <RoomCard key={room.id} data={{ label: tab.label, room: room }} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
