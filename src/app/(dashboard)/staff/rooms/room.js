"use client";
import React, { useState, useEffect } from "react";
import MainCard from "../../../components/MainCard";
import { Container, Box, Tabs, Tab, Slide, Typography } from "@mui/material";
import DayCheckIn from "./dayCheckIn";
import DayCheckOut from "./dayCheckOut";
import Maintenance from "./maintenance";
import Ongoing from "./ongoing";
import Vacant from "./vacant";

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

export default function Index({ data }) {
  const room = data;
  // console.log(room);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              <Tab label="Ongoing" {...a11yProps(0)} />
              <Tab label="Today CheckOut" {...a11yProps(1)} />
              <Tab label="Today CheckIn" {...a11yProps(2)} />
              <Tab label="Vacant" {...a11yProps(3)} />
              <Tab label="Maintenance" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Ongoing data={room.ongoing} status={room.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DayCheckOut data={room.todayCheckOut} status={room.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <DayCheckIn data={room.todayCheckIn} status={room.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Vacant data={room.vacant} status={room.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Maintenance data={room.maintenance} status={room.status} />
          </CustomTabPanel>
        </Container>
      </Box>
    </MainCard>
  );
}
