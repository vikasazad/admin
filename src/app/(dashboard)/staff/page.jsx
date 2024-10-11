"use client";
import React, { useState, useEffect } from "react";
import MainCard from "../../components/MainCard";
import { Container, Box, Tabs, Tab, Slide, Typography } from "@mui/material";
import Room from "./rooms/room";
import Table from "./tables/table";
import { handleRoomStaffInformation } from "../../DB/dbFunctions";

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
  const [staffData, setStaffData] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    handleRoomStaffInformation().then((data) => {
      setStaffData(data);
    });
  }, []);

  return (
    <MainCard
      sx={{
        backgroundColor: "#f2f2f2",
        padding: "0",
        ".css-1v9be3b-MuiCardContent-root": { padding: "10px" },
      }}
    >
      {!staffData ? (
        <Typography variant="h5">Loading........</Typography>
      ) : (
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
              <Room data={staffData.hotelOverview} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Table data={staffData.restaurantOverview} />
            </CustomTabPanel>
          </Container>
        </Box>
      )}
    </MainCard>
  );
}
