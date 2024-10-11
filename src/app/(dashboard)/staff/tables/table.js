"use client";
import React, { useState, useEffect } from "react";
import MainCard from "../../../components/MainCard";
import { Container, Box, Tabs, Tab, Slide, Typography } from "@mui/material";
import Available from "./available";
import Cleaning from "./cleaning";
import Occupied from "./occupied";
import Reserved from "./reserved";

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

export default function Table({ data }) {
  const table = data;
  console.log(table);
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
              <Tab label="Occupied" {...a11yProps(0)} />
              <Tab label="Reserved" {...a11yProps(1)} />
              <Tab label="Available" {...a11yProps(2)} />
              <Tab label="Cleaning" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Occupied data={table.occupied} status={table.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Reserved data={table.reserved} status={table.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Available data={table.available} status={table.status} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Cleaning data={table.cleaning} status={table.status} />
          </CustomTabPanel>
        </Container>
      </Box>
    </MainCard>
  );
}
