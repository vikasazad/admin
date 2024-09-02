 
"use client";
import React, { useState, useEffect } from "react";

 

import dynamic from "next/dynamic";
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
  Container,
  InputLabel,
  Select,
  MenuItem,
  Chip,
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
  Card,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton ,
} from "@mui/material";


 

// project import
import MainCard from "../../components/MainCard";
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import MonthlyBarChart from "./MonthlyBarChart";
import ReportAreaChart from "./ReportAreaChart";
import UniqueVisitorCard from "./UniqueVisitorCard";
import SaleReportCard from "./SaleReportCard";
import OrdersTable from "./OrdersTable";

// assets
import GiftOutlined from "@ant-design/icons/GiftOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FolderIcon from "@mui/icons-material/Folder";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import Popover from "@mui/material/Popover";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
 
import avatar1 from "../../assets/images/users/avatar-1.png";
import avatar2 from "../../assets/images/users/avatar-2.png";
import avatar3 from "../../assets/images/users/avatar-3.png";
import avatar4 from "../../assets/images/users/avatar-4.png";
 
import { borderRadius } from "@mui/system";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
 
// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

 
const colors = [
  "#fdcb69",
  "#52c41a",
  "#13c2c2",
  "#ff4d4f",
  "#8c13c2",
  "#13225e",
];


const dataYear = {
  Rooms: {
    Executive: {
      noOfBooking: [120, 130, 110, 140, 150, 135, 125, 140, 145, 155, 160, 165],
      earning: [
        1200000, 1300000, 1100000, 1400000, 1500000, 1350000, 1250000, 1400000,
        1450000, 1550000, 1600000, 1650000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Deluxe: {
      noOfBooking: [140, 150, 130, 160, 170, 155, 145, 160, 165, 175, 180, 185],
      earning: [
        1400000, 1500000, 1300000, 1600000, 1700000, 1550000, 1450000, 1600000,
        1650000, 1750000, 1800000, 1850000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    SuperDeluxe: {
      noOfBooking: [100, 110, 90, 120, 130, 115, 105, 120, 125, 135, 140, 145],
      earning: [
        1000000, 1100000, 900000, 1200000, 1300000, 1150000, 1050000, 1200000,
        1250000, 1350000, 1400000, 1450000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Suite: {
      noOfBooking: [80, 90, 70, 100, 110, 95, 85, 100, 105, 115, 120, 125],
      earning: [
        800000, 900000, 700000, 1000000, 1100000, 950000, 850000, 1000000,
        1050000, 1150000, 1200000, 1250000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },
  },

  Food: {
    inRoom: {
      noOfOrder: [200, 220, 180, 240, 260, 235, 215, 240, 250, 270, 280, 290],
      earning: [
        2000000, 2200000, 1800000, 2400000, 2600000, 2350000, 2150000, 2400000,
        2500000, 2700000, 2800000, 2900000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Restaurant: {
      noOfOrder: [180, 200, 160, 220, 240, 215, 195, 220, 230, 250, 260, 270],
      earning: [
        1800000, 2000000, 1600000, 2200000, 2400000, 2150000, 1950000, 2200000,
        2300000, 2500000, 2600000, 2700000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },
  },

  Services: {
    Spa: {
      noOfBooking: [150, 160, 140, 170, 180, 165, 155, 170, 175, 185, 190, 195],
      earning: [
        1500000, 1600000, 1400000, 1700000, 1800000, 1650000, 1550000, 1700000,
        1750000, 1850000, 1900000, 1950000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Gym: {
      noOfBooking: [100, 110, 90, 120, 130, 115, 105, 120, 125, 135, 140, 145],
      earning: [
        1000000, 1100000, 900000, 1200000, 1300000, 1150000, 1050000, 1200000,
        1250000, 1350000, 1400000, 1450000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Laundry: {
      noOfBooking: [80, 90, 70, 100, 110, 95, 85, 100, 105, 115, 120, 125],
      earning: [
        800000, 900000, 700000, 1000000, 1100000, 950000, 850000, 1000000,
        1050000, 1150000, 1200000, 1250000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },

    Pool: {
      noOfBooking: [70, 80, 60, 90, 100, 85, 75, 90, 95, 105, 110, 115],
      earning: [
        700000, 800000, 600000, 900000, 1000000, 850000, 750000, 900000, 950000,
        1050000, 1100000, 1150000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000,
      ],
    },
  },

  Issues: {
    Rooms: {
      noOfIssues: [10, 12, 8, 15, 18, 14, 11, 15, 17, 20, 22, 25],
      timeOfResolution: [30, 25, 35, 40, 45, 30, 28, 35, 40, 50, 55, 60],
      avgtimeInResolution: [
        3, 3.5, 3.2, 3.8, 4, 3.4, 3.1, 3.6, 4.2, 4.8, 4.5, 5,
      ],
    },

    Services: {
      noOfIssues: [8, 10, 7, 12, 15, 10, 9, 12, 14, 16, 18, 20],
      timeOfResolution: [25, 20, 30, 35, 40, 28, 24, 30, 35, 45, 50, 55],
      avgtimeInResolution: [
        2.5, 3, 2.8, 3.5, 3.7, 3.1, 2.9, 3.4, 3.9, 4.4, 4.2, 4.7,
      ],
    },

    Food: {
      noOfIssues: [5, 7, 4, 8, 10, 7, 6, 8, 9, 11, 12, 14],
      timeOfResolution: [20, 18, 25, 30, 35, 22, 20, 25, 30, 40, 45, 50],
      avgtimeInResolution: [
        2, 2.5, 2.2, 2.8, 3, 2.4, 2.1, 2.6, 3.2, 3.8, 3.5, 4,
      ],
    },
  },
};

const dataMonth = {
  Rooms: {
    Executive: {
      noOfBooking: [
        4, 5, 3, 6, 7, 5, 4, 6, 5, 7, 8, 6, 4, 5, 7, 6, 5, 8, 7, 6, 5, 4, 7, 6,
        5, 4, 6, 7, 8, 5,
      ],
      earning: [
        40000, 50000, 30000, 60000, 70000, 50000, 40000, 60000, 50000, 70000,
        80000, 60000, 40000, 50000, 70000, 60000, 50000, 80000, 70000, 60000,
        50000, 40000, 70000, 60000, 50000, 40000, 60000, 70000, 80000, 50000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Deluxe: {
      noOfBooking: [
        6, 7, 5, 8, 9, 7, 6, 8, 7, 9, 10, 8, 6, 7, 9, 8, 7, 10, 9, 8, 7, 6, 9,
        8, 7, 6, 8, 9, 10, 7,
      ],
      earning: [
        60000, 70000, 50000, 80000, 90000, 70000, 60000, 80000, 70000, 90000,
        100000, 80000, 60000, 70000, 90000, 80000, 70000, 100000, 90000, 80000,
        70000, 60000, 90000, 80000, 70000, 60000, 80000, 90000, 100000, 70000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    SuperDeluxe: {
      noOfBooking: [
        3, 4, 2, 5, 6, 4, 3, 5, 4, 6, 7, 5, 3, 4, 6, 5, 4, 7, 6, 5, 4, 3, 6, 5,
        4, 3, 5, 6, 7, 4,
      ],
      earning: [
        30000, 40000, 20000, 50000, 60000, 40000, 30000, 50000, 40000, 60000,
        70000, 50000, 30000, 40000, 60000, 50000, 40000, 70000, 60000, 50000,
        40000, 30000, 60000, 50000, 40000, 30000, 50000, 60000, 70000, 40000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Suite: {
      noOfBooking: [
        2, 3, 1, 4, 5, 3, 2, 4, 3, 5, 6, 4, 2, 3, 5, 4, 3, 6, 5, 4, 3, 2, 5, 4,
        3, 2, 4, 5, 6, 3,
      ],
      earning: [
        20000, 30000, 10000, 40000, 50000, 30000, 20000, 40000, 30000, 50000,
        60000, 40000, 20000, 30000, 50000, 40000, 30000, 60000, 50000, 40000,
        30000, 20000, 50000, 40000, 30000, 20000, 40000, 50000, 60000, 30000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },
  },

  Food: {
    inRoom: {
      noOfOrder: [
        7, 8, 6, 9, 10, 8, 7, 9, 8, 10, 11, 9, 7, 8, 10, 9, 8, 11, 10, 9, 8, 7,
        10, 9, 8, 7, 9, 10, 11, 8,
      ],
      earning: [
        70000, 80000, 60000, 90000, 100000, 80000, 70000, 90000, 80000, 100000,
        110000, 90000, 70000, 80000, 100000, 90000, 80000, 110000, 100000,
        90000, 80000, 70000, 100000, 90000, 80000, 70000, 90000, 100000, 110000,
        80000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Restaurant: {
      noOfOrder: [
        6, 7, 5, 8, 9, 7, 6, 8, 7, 9, 10, 8, 6, 7, 9, 8, 7, 10, 9, 8, 7, 6, 9,
        8, 7, 6, 8, 9, 10, 7,
      ],
      earning: [
        60000, 70000, 50000, 80000, 90000, 70000, 60000, 80000, 70000, 90000,
        100000, 80000, 60000, 70000, 90000, 80000, 70000, 100000, 90000, 80000,
        70000, 60000, 90000, 80000, 70000, 60000, 80000, 90000, 100000, 70000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },
  },

  Services: {
    Spa: {
      noOfBooking: [
        4, 5, 3, 6, 7, 5, 4, 6, 5, 7, 8, 6, 4, 5, 7, 6, 5, 8, 7, 6, 5, 4, 7, 6,
        5, 4, 6, 7, 8, 5,
      ],
      earning: [
        40000, 50000, 30000, 60000, 70000, 50000, 40000, 60000, 50000, 70000,
        80000, 60000, 40000, 50000, 70000, 60000, 50000, 80000, 70000, 60000,
        50000, 40000, 70000, 60000, 50000, 40000, 60000, 70000, 80000, 50000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Gym: {
      noOfBooking: [
        3, 4, 2, 5, 6, 4, 3, 5, 4, 6, 7, 5, 3, 4, 6, 5, 4, 7, 6, 5, 4, 3, 6, 5,
        4, 3, 5, 6, 7, 4,
      ],
      earning: [
        30000, 40000, 20000, 50000, 60000, 40000, 30000, 50000, 40000, 60000,
        70000, 50000, 30000, 40000, 60000, 50000, 40000, 70000, 60000, 50000,
        40000, 30000, 60000, 50000, 40000, 30000, 50000, 60000, 70000, 40000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Laundry: {
      noOfBooking: [
        2, 3, 1, 4, 5, 3, 2, 4, 3, 5, 6, 4, 2, 3, 5, 4, 3, 6, 5, 4, 3, 2, 5, 4,
        3, 2, 4, 5, 6, 3,
      ],
      earning: [
        20000, 30000, 10000, 40000, 50000, 30000, 20000, 40000, 30000, 50000,
        60000, 40000, 20000, 30000, 50000, 40000, 30000, 60000, 50000, 40000,
        30000, 20000, 50000, 40000, 30000, 20000, 40000, 50000, 60000, 30000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },

    Pool: {
      noOfBooking: [
        5, 6, 4, 7, 8, 6, 5, 7, 6, 8, 9, 7, 5, 6, 8, 7, 6, 9, 8, 7, 6, 5, 8, 7,
        6, 5, 7, 8, 9, 6,
      ],
      earning: [
        50000, 60000, 40000, 70000, 80000, 60000, 50000, 70000, 60000, 80000,
        90000, 70000, 50000, 60000, 80000, 70000, 60000, 90000, 80000, 70000,
        60000, 50000, 80000, 70000, 60000, 50000, 70000, 80000, 90000, 60000,
      ],
      avgprice: [
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      ],
    },
  },

  Issues: {
    Rooms: {
      noOfIssues: [
        2, 3, 1, 4, 5, 3, 2, 4, 3, 5, 6, 4, 2, 3, 5, 4, 3, 6, 5, 4, 3, 2, 5, 4,
        3, 2, 4, 5, 6, 3,
      ],
      timeOfResolution: [
        1, 2, 1.5, 2.5, 3, 2, 1.5, 2.5, 2, 3.5, 4, 2.5, 1.5, 2.5, 3.5, 3, 2.5,
        4, 3.5, 3, 2.5, 1.5, 3.5, 3, 2.5, 1.5, 3, 3.5, 4, 2.5,
      ],
      avgtimeInResolution: [
        2, 2.5, 2, 2.5, 3, 2.5, 2, 2.5, 2.5, 3.5, 4, 2.5, 2, 2.5, 3.5, 3, 2.5,
        4, 3.5, 3, 2.5, 2, 3.5, 3, 2.5, 2, 3, 3.5, 4, 2.5,
      ],
    },

    Services: {
      noOfIssues: [
        3, 4, 2, 5, 6, 4, 3, 5, 4, 6, 7, 5, 3, 4, 6, 5, 4, 7, 6, 5, 4, 3, 6, 5,
        4, 3, 5, 6, 7, 4,
      ],
      timeOfResolution: [
        1.5, 2, 1, 2.5, 3, 2, 1.5, 2.5, 2, 3.5, 4, 2.5, 1.5, 2.5, 3.5, 3, 2.5,
        4, 3.5, 3, 2.5, 1.5, 3.5, 3, 2.5, 1.5, 3, 3.5, 4, 2.5,
      ],
      avgtimeInResolution: [
        2, 2.5, 2, 2.5, 3, 2.5, 2, 2.5, 2.5, 3.5, 4, 2.5, 2, 2.5, 3.5, 3, 2.5,
        4, 3.5, 3, 2.5, 2, 3.5, 3, 2.5, 2, 3, 3.5, 4, 2.5,
      ],
    },
  },
};
const dataWeek = {
  Rooms: {
    Executive: {
      noOfBooking: [10, 8, 12, 9, 11, 7, 10],
      earning: [100000, 80000, 120000, 90000, 110000, 70000, 100000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Deluxe: {
      noOfBooking: [5, 7, 8, 6, 9, 5, 7],
      earning: [50000, 70000, 80000, 60000, 90000, 50000, 70000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    SuperDeluxe: {
      noOfBooking: [3, 4, 6, 5, 7, 4, 6],
      earning: [30000, 40000, 60000, 50000, 70000, 40000, 60000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Suite: {
      noOfBooking: [2, 3, 4, 3, 5, 2, 4],
      earning: [20000, 30000, 40000, 30000, 50000, 20000, 40000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
  },
  Food: {
    inRoom: {
      noOfOrder: [15, 20, 25, 18, 22, 16, 21],
      earning: [150000, 200000, 250000, 180000, 220000, 160000, 210000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Restaurant: {
      noOfOrder: [20, 25, 30, 23, 28, 22, 26],
      earning: [200000, 250000, 300000, 230000, 280000, 220000, 260000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
  },
  Services: {
    Spa: {
      noOfBooking: [4, 5, 6, 4, 7, 5, 6],
      earning: [40000, 50000, 60000, 40000, 70000, 50000, 60000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Gym: {
      noOfBooking: [3, 4, 5, 4, 6, 4, 5],
      earning: [30000, 40000, 50000, 40000, 60000, 40000, 50000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Laundry: {
      noOfBooking: [2, 3, 4, 3, 5, 3, 4],
      earning: [20000, 30000, 40000, 30000, 50000, 30000, 40000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
    Pool: {
      noOfBooking: [5, 6, 7, 6, 8, 6, 7],
      earning: [50000, 60000, 70000, 60000, 80000, 60000, 70000],
      avgprice: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
    },
  },
  Issues: {
    Rooms: {
      noOfIssues: [2, 3, 1, 2, 3, 1, 2],
      timeOfResolution: [1.5, 2, 1, 1.5, 2, 1, 1.5],
      avgtimeInResolution: [2, 2.5, 2, 2.5, 3, 2.5, 2],
    },
    Services: {
      noOfIssues: [1, 2, 1, 2, 3, 2, 1],
      timeOfResolution: [1, 1.5, 1, 1.5, 2, 1.5, 1],
      avgtimeInResolution: [1.5, 2, 1.5, 2, 2.5, 2, 1.5],
    },
    Food: {
      noOfIssues: [3, 4, 2, 3, 4, 2, 3],
      timeOfResolution: [2, 2.5, 2, 2.5, 3, 2, 2.5],
      avgtimeInResolution: [2.5, 3, 2.5, 3, 3.5, 3, 2.5],
    },
  },
};

const dataDay = {
  Rooms: {
    Executive: {
      noOfBooking: [10],
      earning: [100000],
      avgprice: [10000],
    },
    Deluxe: {
      noOfBooking: [5],
      earning: [50000],
      avgprice: [10000],
    },
    SuperDeluxe: {
      noOfBooking: [3],
      earning: [30000],
      avgprice: [10000],
    },
    Suite: {
      noOfBooking: [2],
      earning: [20000],
      avgprice: [10000],
    },
  },
  Food: {
    inRoom: {
      noOfOrder: [15],
      earning: [150000],
      avgprice: [10000],
    },
    Restaurant: {
      noOfOrder: [20],
      earning: [200000],
      avgprice: [10000],
    },
  },
  Services: {
    Spa: {
      noOfBooking: [4],
      earning: [40000],
      avgprice: [10000],
    },
    Gym: {
      noOfBooking: [3],
      earning: [30000],
      avgprice: [10000],
    },
    Laundry: {
      noOfBooking: [2],
      earning: [20000],
      avgprice: [10000],
    },
    Pool: {
      noOfBooking: [5],
      earning: [50000],
      avgprice: [10000],
    },
  },
  Issues: {
    Rooms: {
      noOfIssues: [2],
      timeOfResolution: [1.5],
      avgtimeInResolution: [2],
    },
    Services: {
      noOfIssues: [1],
      timeOfResolution: [1],
      avgtimeInResolution: [1.5],
    },
    Food: {
      noOfIssues: [3],
      timeOfResolution: [2],
      avgtimeInResolution: [2.5],
    },
  },
};

const data = {
  Rooms: {
    Executive: [
      0, 62000, 58000, 61000, 63000, 64000, 65000, 66000, 67000, 68000, 69000,
      70000,
    ],
    Deluxe: [
      0, 71000, 72000, 73000, 74000, 75000, 76000, 77000, 78000, 79000, 80000,
      81000,
    ],
    SuperDeluxe: [
      0, 127000, 126000, 129000, 131000, 130000, 132000, 133000, 134000, 135000,
      136000, 137000,
    ],
    Suite: [
      0, 56000, 57000, 58000, 59000, 60000, 61000, 62000, 63000, 64000, 65000,
      66000,
    ],
  },
  Food: {
    InRoom: [
      30000, 32000, 31000, 33000, 34000, 35000, 36000, 37000, 38000, 39000,
      40000, 41000,
    ],
    Restaurant: [
      40000, 42000, 41000, 43000, 44000, 45000, 46000, 47000, 48000, 49000,
      50000, 51000,
    ],
  },
  Services: {
    Spa: [
      20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000,
      30000, 31000,
    ],
    Gym: [
      15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000,
      25000, 26000,
    ],
    Laundry: [
      10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000,
      20000, 21000,
    ],
    Pool: [
      25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
      35000, 36000,
    ],
  },
  Issues: {
    Rooms: [32, 15, 23, 46, 18, 27, 38, 22, 62, 23, 31, 25],
    Services: [14, 9, 12, 11, 10, 13, 8, 15, 17, 19, 18, 16],
    Food: [6, 5, 4, 7, 3, 8, 5, 9, 10, 6, 7, 4],
  },
};

export default function DashboardDefault() {
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const initialTime = dayjs().subtract(6, "month");
  const [customFilter, setCustomFilter] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [value, setValue] = useState("");
  const [selectedChart, setSelectedChart] = useState("Rooms");
  const [stepSize, setStepSize] = useState();
  const [chartData, setChartData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    const selectedCategoryData = data.Rooms;
    const initialSeries = Object.keys(selectedCategoryData).map(
      (key, index) => ({
        name: key,
        type: "line",
        data: selectedCategoryData[key],
        color: colors[index % colors.length], // Cycle through the colors array
      })
    );

    setChartData(initialSeries); // Set the initial series data in state
    setStepSize(calculateStepSize(selectedCategoryData));
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = (filter) => {
    console.log(filter);
    setFilter(filter);
    setAnchorEl(null);
  };

  const handleCustomFilter = (date, type) => {
    const updatedFilter = { ...customFilter, [type]: date };
    const { startDate, endDate } = updatedFilter;

    if (startDate.isSame(endDate)) {
      setError("Start date and End date cannot be the same.");
    } else if (startDate.isAfter(endDate)) {
      setError("Start date cannot be greater than End date.");
    } else if (
      startDate.isBefore(initialTime) ||
      endDate.isBefore(initialTime)
    ) {
      setError("Selected dates cannot be earlier than 6 months ago.");
    } else if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs())) {
      setError("Selected dates cannot be later than today.");
    } else {
      setError("");
    }

    setCustomFilter(updatedFilter);

    // console.log("Start Date:", updatedFilter.startDate.format("MM/DD/YYYY"));
    // console.log("End Date:", updatedFilter.endDate.format("MM/DD/YYYY"));
  };

  const calculateStepSize = (categoryData) => {
    const allValues = Object.values(categoryData).flat(); // Flatten the category data arrays
    const max = Math.max(...allValues); // Get the maximum value
    const min = Math.min(...allValues); // Get the minimum value
    const range = max - min; // Calculate the range

    return Math.ceil(range / 10); // Determine step size (10 steps for simplicity)
  };
  const handleTypeClicks = (category) => {
    setSelectedChart(category);
    const selectedCategoryData = data[category];
    const series = Object.keys(selectedCategoryData).map((key, index) => {
      return {
        name: key,
        type: "line",
        data: selectedCategoryData[key],
        color: colors[index % colors.length],
      };
    });
    console.log("Generated Series:", series);
    setChartData(series);
    setStepSize(calculateStepSize(selectedCategoryData));
  };

  const line = {
    series: chartData,
    options: {
      chart: {
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 5,
        },
      },
      legend: {
        show: true,
        markers: {
          size: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },

      fill: {
        type: ["solid"],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      markers: {
        size: [4],
        colors: "#fff",
        strokeColors: [colors[0], colors[1], colors[2], colors[3]],
        hover: {
          size: 6,
        },
      },
      xaxis: {
        type: "category",
      },
      yaxis: {
        stepSize: stepSize,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sx={{ mb: 2.25 }}>
          <Typography variant="h2">My Dashboard</Typography>
        </Grid>
        <Grid item xs={12} lg={9}>
          <MainCard sx={{ borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={3}
                onClick={() => handleTypeClicks("Rooms")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "Rooms" ? "rgb(245, 245, 245)" : "",
                  }}
                >
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography variant="subtitle1">Rooms</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon
                            sx={{ color: "rgb(82, 196, 26)" }}
                          />
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            20%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            invoices
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                onClick={() => handleTypeClicks("Food")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "Food" ? "rgb(245, 245, 245)" : "",
                  }}
                >
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography variant="subtitle1">Food</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon
                            sx={{ color: "rgb(82, 196, 26)" }}
                          />
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            20%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            invoices
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                onClick={() => handleTypeClicks("Services")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "Services" ? "rgb(245, 245, 245)" : "",
                  }}
                >
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography variant="subtitle1">Services</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon
                            sx={{ color: "rgb(82, 196, 26)" }}
                          />
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            20%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            invoices
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                onClick={() => handleTypeClicks("Issues")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "Issues" ? "rgb(245, 245, 245)" : "",
                  }}
                >
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography variant="subtitle1">Issues</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon
                            sx={{ color: "rgb(82, 196, 26)" }}
                          />
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            20%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            invoices
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <ReactApexChart
                    options={line.options}
                    series={line.series}
                    type="area"
                    height={270}
                    width={"100%"}
                  />
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item xs={12} lg={3}>
          <MainCard sx={{ paddingBottom: 2, borderRadius: 1 }}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(22, 119, 255)",
                        }}
                      >
                        <HomeWorkOutlinedIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Transctions
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(19, 34, 94)",
                        }}
                      >
                        <LocalCafeOutlinedIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Transctions
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(19, 94, 19)",
                        }}
                      >
                        <BedOutlinedIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Rooms
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(140, 19, 194)",
                        }}
                      >
                        <TableRestaurantIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Tables
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(19, 194, 194)",
                        }}
                      >
                        <GroupsIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Members
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          color: "rgb(255, 255, 255)",
                          background: "rgb(194, 194, 19)",
                        }}
                      >
                        <PaymentOutlinedIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        Payments
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item>
              {filter === "Custom" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <DatePicker
                      label="Start Date"
                      value={customFilter.startDate}
                      onChange={(newValue) =>
                        handleCustomFilter(newValue, "startDate")
                      }
                      minDate={initialTime}
                      maxDate={dayjs()}
                    />

                    <Typography variant="subtitle1" sx={{ m: "0 5px" }}>
                      to
                    </Typography>

                    <DatePicker
                      label="End Date"
                      value={customFilter.endDate}
                      onChange={(newValue) =>
                        handleCustomFilter(newValue, "endDate")
                      }
                      minDate={initialTime}
                      maxDate={dayjs()}
                    />
                  </div>

                  {error && (
                    <FormHelperText error id="date-picker-error">
                      {error}
                    </FormHelperText>
                  )}
                </>
              ) : (
                ""
              )}
            </Grid>
            <Grid item>
              <IconButton sx={{ ml: 5 }}>
                <FilterListIcon onClick={handleClick} />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Container sx={{ p: 2 }}>
                    <Stack sx={{ cursor: "pointer" }}>
                      <Typography
                        variant="h6"
                        sx={{ p: 1 }}
                        onClick={() => handleFilter("today")}
                      >
                        Today
                      </Typography>
                      <Divider />
                      <Typography
                        variant="h6"
                        sx={{ p: 1 }}
                        onClick={() => handleFilter("Tomorrow")}
                      >
                        Tomorrow
                      </Typography>
                      <Divider />
                      <Typography
                        variant="h6"
                        sx={{ p: 1 }}
                        onClick={() => handleFilter("This Month")}
                      >
                        This Month
                      </Typography>
                      <Divider />
                      <Typography
                        variant="h6"
                        sx={{ p: 1 }}
                        onClick={() => handleFilter("Custom")}
                      >
                        Custom
                      </Typography>
                    </Stack>
                  </Container>
                </Popover>
              </IconButton>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Analytics Report</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
// {/* <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{}}>
//       {/* row 1 */}
//       <Grid item xs={12} sx={{ mb: -2.25 }}>
//         <Typography variant="h2">My Dashboard</Typography>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce
//           title="Total Page Views"
//           count="4,42,236"
//           percentage={59.3}
//           extra="35,000"
//         />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce
//           title="Total Users"
//           count="78,250"
//           percentage={70.5}
//           extra="8,900"
//         />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce
//           title="Total Order"
//           count="18,800"
//           percentage={27.4}
//           isLoss
//           color="warning"
//           extra="1,943"
//         />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce
//           title="Total Sales"
//           count="$35,078"
//           percentage={27.4}
//           isLoss
//           color="warning"
//           extra="$20,395"
//         />
//       </Grid>

//       <Grid
//         item
//         md={8}
//         sx={{ display: { sm: "none", md: "block", lg: "none" } }}
//       />

//       {/* row 2 */}
//       <Grid item xs={12} md={7} lg={8}>
//         <UniqueVisitorCard />
//       </Grid>
//       <Grid item xs={12} md={5} lg={4}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid item>
//             <Typography variant="h5">Income Overview</Typography>
//           </Grid>
//           <Grid item />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <Box sx={{ p: 3, pb: 0 }}>
//             <Stack spacing={2}>
//               <Typography variant="h6" color="text.secondary">
//                 This Week Statistics
//               </Typography>
//               <Typography variant="h3">$7,650</Typography>
//             </Stack>
//           </Box>
//           <MonthlyBarChart />
//         </MainCard>
//       </Grid>

//       {/* row 3 */}
//       <Grid item xs={12} md={7} lg={8}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid item>
//             <Typography variant="h5">Recent Orders</Typography>
//           </Grid>
//           <Grid item />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <OrdersTable />
//         </MainCard>
//       </Grid>
//       <Grid item xs={12} md={5} lg={4}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid item>
//             <Typography variant="h5">Analytics Report</Typography>
//           </Grid>
//           <Grid item />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
//             <ListItemButton divider>
//               <ListItemText primary="Company Finance Growth" />
//               <Typography variant="h5">+45.14%</Typography>
//             </ListItemButton>
//             <ListItemButton divider>
//               <ListItemText primary="Company Expenses Ratio" />
//               <Typography variant="h5">0.58%</Typography>
//             </ListItemButton>
//             <ListItemButton>
//               <ListItemText primary="Business Risk Cases" />
//               <Typography variant="h5">Low</Typography>
//             </ListItemButton>
//           </List>
//           <ReportAreaChart />
//         </MainCard>
//       </Grid>

//       {/* row 4 */}
//       <Grid item xs={12} md={7} lg={8}>
//         <SaleReportCard />
//       </Grid>
//       <Grid item xs={12} md={5} lg={4}>
//         <Grid container alignItems="center" justifyContent="space-between">
//           <Grid item>
//             <Typography variant="h5">Transaction History</Typography>
//           </Grid>
//           <Grid item />
//         </Grid>
//         <MainCard sx={{ mt: 2 }} content={false}>
//           <List
//             component="nav"
//             sx={{
//               px: 0,
//               py: 0,
//               "& .MuiListItemButton-root": {
//                 py: 1.5,
//                 "& .MuiAvatar-root": avatarSX,
//                 "& .MuiListItemSecondaryAction-root": {
//                   ...actionSX,
//                   position: "relative",
//                 },
//               },
//             }}
//           >
//             <ListItemButton divider>
//               <ListItemAvatar>
//                 <Avatar
//                   sx={{ color: "success.main", bgcolor: "success.lighter" }}
//                 >
//                   <GiftOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={
//                   <Typography variant="subtitle1">Order #002434</Typography>
//                 }
//                 secondary="Today, 2:00 AM"
//               />
//               <ListItemSecondaryAction>
//                 <Stack alignItems="flex-end">
//                   <Typography variant="subtitle1" noWrap>
//                     + $1,430
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     78%
//                   </Typography>
//                 </Stack>
//               </ListItemSecondaryAction>
//             </ListItemButton>
//             <ListItemButton divider>
//               <ListItemAvatar>
//                 <Avatar
//                   sx={{ color: "primary.main", bgcolor: "primary.lighter" }}
//                 >
//                   <MessageOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={
//                   <Typography variant="subtitle1">Order #984947</Typography>
//                 }
//                 secondary="5 August, 1:45 PM"
//               />
//               <ListItemSecondaryAction>
//                 <Stack alignItems="flex-end">
//                   <Typography variant="subtitle1" noWrap>
//                     + $302
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     8%
//                   </Typography>
//                 </Stack>
//               </ListItemSecondaryAction>
//             </ListItemButton>
//             <ListItemButton>
//               <ListItemAvatar>
//                 <Avatar sx={{ color: "error.main", bgcolor: "error.lighter" }}>
//                   <SettingOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={
//                   <Typography variant="subtitle1">Order #988784</Typography>
//                 }
//                 secondary="7 hours ago"
//               />
//               <ListItemSecondaryAction>
//                 <Stack alignItems="flex-end">
//                   <Typography variant="subtitle1" noWrap>
//                     + $682
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     16%
//                   </Typography>
//                 </Stack>
//               </ListItemSecondaryAction>
//             </ListItemButton>
//           </List>
//         </MainCard>
//         <MainCard sx={{ mt: 2 }}>
//           <Stack spacing={3}>
//             <Grid container justifyContent="space-between" alignItems="center">
//               <Grid item>
//                 <Stack>
//                   <Typography variant="h5" noWrap>
//                     Help & Support Chat
//                   </Typography>
//                   <Typography variant="caption" color="secondary" noWrap>
//                     Typical replay within 5 min
//                   </Typography>
//                 </Stack>
//               </Grid>
//               <Grid item>
//                 <AvatarGroup
//                   sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
//                 >
//                   <Avatar alt="Remy Sharp" src={avatar1} />
//                   <Avatar alt="Travis Howard" src={avatar2} />
//                   <Avatar alt="Cindy Baker" src={avatar3} />
//                   <Avatar alt="Agnes Walker" src={avatar4} />
//                 </AvatarGroup>
//               </Grid>
//             </Grid>
//             <Button
//               size="small"
//               variant="contained"
//               sx={{ textTransform: "capitalize" }}
//             >
//               Need Help?
//             </Button>
//           </Stack>
//         </MainCard>
//       </Grid>
//     </Grid> */}

// ==============================|| DASHBOARD - DEFAULT ||============================== //


 
