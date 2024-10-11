"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Grid,
  IconButton,
  Typography,
  FormHelperText,
  Box,
  Divider,
  Stack,
  Card,
  Container,
} from "@mui/material";

// project import
import MainCard from "../../components/MainCard";
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import MonthlyBarChart from "./MonthlyBarChart";
import ReportAreaChart from "./ReportAreaChart";
import UniqueVisitorCard from "./UniqueVisitorCard";
import SaleReportCard from "./SaleReportCard";
import OrdersTable from "./OrdersTable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import Popover from "@mui/material/Popover";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { get7daysData, getData } from "../../DB/dbFunctions";
import { useSession } from "next-auth/react";
import { fetchFirestoreData } from "../../features/firestoreMultipleData";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

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

const datadata = {
  rooms: {
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
  food: {
    InRoom: [
      30000, 32000, 31000, 33000, 34000, 35000, 36000, 37000, 38000, 39000,
      40000, 41000,
    ],
    Restaurant: [
      40000, 42000, 41000, 43000, 44000, 45000, 46000, 47000, 48000, 49000,
      50000, 51000,
    ],
  },
  services: {
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
  issues: {
    Rooms: [32, 15, 23, 46, 18, 27, 38, 22, 62, 23, 31, 25],
    Services: [14, 9, 12, 11, 10, 13, 8, 15, 17, 19, 18, 16],
    Food: [6, 5, 4, 7, 3, 8, 5, 9, 10, 6, 7, 4],
  },
};

export default function DashboardDefault({ user, data, table }) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [chartFilter, setChartFilter] = useState("");
  const [error, setError] = useState("");
  const [errorChart, setErrorChart] = useState("");
  const initialTime = dayjs().subtract(6, "month");
  const [customFilter, setCustomFilter] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [customChartFilter, setCustomChartFilter] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [value, setValue] = useState("");
  const [selectedChart, setSelectedChart] = useState("rooms");
  const [stepSize, setStepSize] = useState();
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartOverview, setChartOverview] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElChart, setAnchorElChart] = useState(null);
  const firestoreMultipleData = useSelector(
    (state) => state.firestoreMultipleData
  );
  const chartFilterOpen = Boolean(anchorElChart);
  const chartFilterid = chartFilterOpen ? "simple-popover" : undefined;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    dispatch(
      fetchFirestoreData({ email: user.email, subCollection: "analytics" })
    );
  }, [dispatch, user]);

  useEffect(() => {
    if (data) {
      // console.log("=============", data);
      const selectedCategoryData = data.rooms;
      const initialSeries = Object.keys(selectedCategoryData)
        .filter((key) => !key.includes("Bookings"))
        .map((key, index) => ({
          name: key,
          type: "line",
          data: selectedCategoryData[key],
          color: colors[index % colors.length], // Cycle through the colors array
        }));
      setChartLabel(data.days);
      // console.log(selectedCategoryData);
      setChartData(initialSeries); // Set the initial series data in state
      setChartOverview(calculateTotalEarningsAndEffectivePercentageAll(data));
      setStepSize(calculateStepSize(selectedCategoryData));
    }
  }, [data]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickChartFilter = (event) => {
    setAnchorElChart(event.currentTarget);
  };

  const handleCloseChartFilter = () => {
    setAnchorElChart(null);
  };
  const handleChartFilter = (filter) => {
    // console.log(filter);
    if (filter === "Today") {
      //take starting point as yesterdays totalEarnings and show todaysEarning till this point
    }
    if (filter === "Yesterday") {
      //take starting point as day before yesterdays totalEarnings and show yesterdaysEarning till this point
    }
    if (filter === "This Week") {
      //take starting point as previous week's totalEarnings and show currentweeksEarning till this point
    }
    if (filter === "This Month") {
      //take starting point as previous month's totalEarnings and show currentmonthsEarning till this point
    }
    if (filter === "Custom") {
      // if the length of steps increase above 20 days then change to weekly steps and if the length of weekly steps change from 20 weeks then change to monthly steps
    }
    setChartFilter(filter);
    setAnchorElChart(null);
  };
  const handleFilter = (filter) => {
    // console.log(filter);
    setFilter(filter);
    setAnchorEl(null);
  };

  const handleCustomFilterChart = (date, type) => {
    const updatedFilter = { ...customChartFilter, [type]: date };
    const { startDate, endDate } = updatedFilter;

    if (startDate.isSame(endDate)) {
      setErrorChart("Start date and End date cannot be the same.");
    } else if (startDate.isAfter(endDate)) {
      setErrorChart("Start date cannot be greater than End date.");
    } else if (
      startDate.isBefore(initialTime) ||
      endDate.isBefore(initialTime)
    ) {
      setErrorChart("Selected dates cannot be earlier than 6 months ago.");
    } else if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs())) {
      setErrorChart("Selected dates cannot be later than today.");
    } else {
      setErrorChart("");
    }

    setCustomChartFilter(updatedFilter);

    // console.log("Start Date:", updatedFilter.startDate.format("MM/DD/YYYY"));
    // console.log("End Date:", updatedFilter.endDate.format("MM/DD/YYYY"));
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

  const calculateStepSize = (selectedCategoryData) => {
    const allValues = Object.entries(selectedCategoryData)
      .filter(([key]) => key !== "days")
      .flatMap(([_, values]) => values);

    if (allValues.length === 0) return 0;

    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const range = max - min;

    return Math.ceil(range / 10);
  };
  const handleTypeClicks = async (category) => {
    const data = await get7daysData(user.email, "analytics", category);
    console.log(data);
    setSelectedChart(category);
    const selectedCategoryData = data[category];
    const series = Object.keys(selectedCategoryData)
      .filter((key) => key !== "days")
      .filter((key) => !key.includes("Bookings"))
      .map((key, index) => {
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
    console.log("DATA", data);
  };

  const calculateTotalEarningsAndEffectivePercentageAll = (data) => {
    const result = {};

    for (const [categoryName, subCategories] of Object.entries(data).filter(
      ([key]) => key !== "days"
    )) {
      // console.log(`Processing category: ${categoryName}`);

      let overallTotalEarnings = 0;
      let totalBookings = 0;

      // Finding the length of daily earnings based on any subcategory that isn't bookings
      const earningsSubCategory = Object.keys(subCategories).find(
        (key) => !key.includes("Bookings")
      );
      // console.log(`Earnings subcategory found: ${earningsSubCategory}`);

      const dailyEarnings = Array(
        subCategories[earningsSubCategory].length
      ).fill(0);
      // console.log(
      //   `Initialized dailyEarnings array with length: ${dailyEarnings.length}`
      // );

      for (const [subCategoryName, values] of Object.entries(subCategories)) {
        // console.log(`Processing subcategory: ${subCategoryName}`);
        // console.log(`Values: ${values}`);

        // Separate earnings and bookings
        if (subCategoryName.includes("Bookings")) {
          const bookingsSum = values.reduce((sum, value) => sum + value, 0);
          totalBookings += bookingsSum;
          // console.log(
          //   `Added ${bookingsSum} to total bookings. Total bookings: ${totalBookings}`
          // );
        } else {
          const earningsSum = values.reduce((sum, value) => sum + value, 0);
          overallTotalEarnings += earningsSum;
          // console.log(
          //   `Added ${earningsSum} to total earnings. Overall total earnings: ${overallTotalEarnings}`
          // );

          // Sum up the daily earnings for effective percentage calculation
          values.forEach((value, index) => {
            dailyEarnings[index] += value;
          });
          // console.log(`Updated dailyEarnings array: ${dailyEarnings}`);
        }
      }

      // Adjust for any zero earnings days that cause NaN in the percentage calculation
      let effectivePercentage = 0;
      // console.log(`Calculating effective percentage...`);

      for (let i = 1; i < dailyEarnings.length; i++) {
        if (dailyEarnings[i - 1] !== 0) {
          const change =
            ((dailyEarnings[i] - dailyEarnings[i - 1]) / dailyEarnings[i - 1]) *
            100;
          effectivePercentage += change;
          // console.log(`Change from day ${i - 1} to day ${i}: ${change}%`);
        } else {
          // console.log(`Skipping day ${i} due to zero earnings on day ${i - 1}`);
        }
      }

      const isPositive = effectivePercentage > 0;
      // console.log(
      //   // `Effective percentage for ${categoryName}: ${effectivePercentage}`
      // );
      // console.log(`Is positive trend: ${isPositive}`);

      // Store the results for this category
      result[`overallTotalEarnings${categoryName}`] = overallTotalEarnings;
      result[`effectivePercentage${categoryName}`] = parseFloat(
        effectivePercentage.toFixed(2)
      );
      result[`isPositive${categoryName}`] = isPositive;
      result[`totalBooking${categoryName}`] = totalBookings;
    }

    // console.log("Final result:", result);
    return result;
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
        width: 2,
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
      labels: chartLabel,
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
                onClick={() => handleTypeClicks("rooms")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "rooms" ? "rgb(245, 245, 245)" : "",
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
                          {chartOverview.isPositiverooms ? (
                            <ArrowDropUpIcon
                              sx={{ color: "rgb(82, 196, 26)" }}
                            />
                          ) : (
                            <ArrowDropDownIcon sx={{ color: "red" }} />
                          )}
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            {chartOverview.effectivePercentagerooms}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">
                          &#8377; {chartOverview.overallTotalEarningsrooms}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                          <Typography variant="h5">
                            {chartOverview.totalBookingrooms}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            Bookings
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
                onClick={() => handleTypeClicks("food")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "food" ? "rgb(245, 245, 245)" : "",
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
                          {chartOverview.isPositivefood ? (
                            <ArrowDropUpIcon
                              sx={{ color: "rgb(82, 196, 26)" }}
                            />
                          ) : (
                            <ArrowDropDownIcon sx={{ color: "red" }} />
                          )}
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            {chartOverview.effectivePercentagefood}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">
                          &#8377; {chartOverview.overallTotalEarningsfood}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                          <Typography variant="h5">
                            {chartOverview.totalBookingfood}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            Orders
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
                onClick={() => handleTypeClicks("services")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "services" ? "rgb(245, 245, 245)" : "",
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
                          {chartOverview.isPositiveservices ? (
                            <ArrowDropUpIcon
                              sx={{ color: "rgb(82, 196, 26)" }}
                            />
                          ) : (
                            <ArrowDropDownIcon sx={{ color: "red" }} />
                          )}
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            {chartOverview.effectivePercentageservices}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">
                          &#8377; {chartOverview.overallTotalEarningsservices}
                        </Typography>{" "}
                        <Stack direction="row" alignItems="center">
                          <Typography variant="h5">
                            {chartOverview.totalBookingservices}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            Requests
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
                onClick={() => handleTypeClicks("issues")}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    backgroundColor:
                      selectedChart === "issues" ? "rgb(245, 245, 245)" : "",
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
                          {chartOverview.isPositiveissues ? (
                            <ArrowDropUpIcon
                              sx={{ color: "rgb(82, 196, 26)" }}
                            />
                          ) : (
                            <ArrowDropDownIcon sx={{ color: "red" }} />
                          )}
                          <Typography
                            variant="h5"
                            ml={1}
                            sx={{ color: "rgb(140, 140, 140)" }}
                          >
                            {chartOverview.effectivePercentageissues}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">
                          &#8377; {chartOverview.overallTotalEarningsissues}
                        </Typography>{" "}
                        <Stack direction="row">
                          <Typography variant="h5" alignItems="center">
                            {chartOverview.totalBookingissues}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ ml: 1, color: "rgb(140, 140, 140)" }}
                          >
                            Issues
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                {/* <Stack direction="row" spacing={2}>
                  <Stack direction="row">
                    <IconButton>
                      <FilterListIcon onClick={handleClickChartFilter} />
                      <Popover
                        id={chartFilterid}
                        open={chartFilterOpen}
                        anchorEl={anchorElChart}
                        onClose={handleCloseChartFilter}
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
                              onClick={() => handleChartFilter("today")}
                            >
                              Today
                            </Typography>
                            <Divider />
                            <Typography
                              variant="h6"
                              sx={{ p: 1 }}
                              onClick={() => handleChartFilter("Tomorrow")}
                            >
                              Yesterday
                            </Typography>
                            <Divider />
                            <Typography
                              variant="h6"
                              sx={{ p: 1 }}
                              onClick={() => handleChartFilter("This Month")}
                            >
                              This Month
                            </Typography>
                            <Divider />
                            <Typography
                              variant="h6"
                              sx={{ p: 1 }}
                              onClick={() => handleChartFilter("Custom")}
                            >
                              All Time
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ p: 1 }}
                              onClick={() => handleChartFilter("Custom")}
                            >
                              Custom
                            </Typography>
                          </Stack>
                        </Container>
                      </Popover>
                    </IconButton>
                  </Stack>
                  <Stack>
                    {chartFilter === "Custom" ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <DatePicker
                            label="Start Date"
                            value={customChartFilter.startDate}
                            onChange={(newValue) =>
                              handleCustomFilterChart(newValue, "startDate")
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

                        {errorChart && (
                          <FormHelperText error id="date-picker-error">
                            {errorChart}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Stack> */}

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
          <MainCard sx={{ borderRadius: 1 }}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ boxShadow: 0 }}>
                    <Stack>
                      {Object.keys(table).map((key) =>
                        ["roomsData", "tablesData"].map((dataKey) => {
                          if (
                            (key === "hotel" && dataKey === "roomsData") ||
                            (key === "restaurant" && dataKey === "tablesData")
                          ) {
                            const data = table[key][dataKey];
                            // console.log("INSIDE", JSON.stringify(data));
                            if (data.stats) {
                              const label =
                                dataKey
                                  .replace("Data", "")
                                  .charAt(0)
                                  .toUpperCase() +
                                dataKey.replace("Data", "").slice(1);

                              return (
                                <div key={dataKey}>
                                  {label === "Tables" && (
                                    <Divider sx={{ margin: "10px 0" }} />
                                  )}
                                  <Typography variant="h5" sx={{}}>
                                    {label}
                                  </Typography>
                                  <Divider sx={{ margin: "10px 0" }} />
                                  {Object.keys(data.stats).map((itemKey) => (
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      key={itemKey}
                                      sx={{ margin: "5px 0" }}
                                    >
                                      <Typography variant="h6">
                                        {itemKey.charAt(0).toUpperCase() +
                                          itemKey.slice(1)}
                                      </Typography>
                                      <Typography variant="subtitle1">
                                        {data["stats"][itemKey]}
                                      </Typography>
                                    </Stack>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }
                        })
                      )}
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ boxShadow: 0 }}>
                    <Stack>
                      <Typography variant="h5" sx={{}}>
                        Staff
                      </Typography>
                      <Divider sx={{ margin: "10px 0" }} />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ margin: "5px 0" }}
                      >
                        <Typography variant="h6">Online</Typography>
                        <Typography variant="subtitle1">0</Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} lg={3}>
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
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
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
            <OrdersTable data={table} />
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} md={5} lg={4}>
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
        </Grid> */}
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
