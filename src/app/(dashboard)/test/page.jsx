"use client";
import React from "react";
import dynamic from "next/dynamic"; // Use this if you're working in a Next.js environment
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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FolderIcon from "@mui/icons-material/Folder";

import MainCard from "../../components/MainCard";
import { color } from "framer-motion";

// Dynamically import ApexCharts to prevent SSR issues (optional for non-Next.js projects)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const series = {
  monthDataSeries1: {
    dates: ["2024-01-01", "2024-02-01", "2024-03-01"],
    prices: [300, 200, 100],
  },
};

const LineChart = () => {
  const line = {
    series: [
      {
        name: "TEAM A",
        type: "column",
        data: [33, 11, 22, 47, 13, 22, 37, 21, 64, 22, 30],
        color: "#fdcb69",
      },
      {
        name: "TEAM B",
        type: "line",
        data: [33, 11, 22, 47, 13, 22, 37, 21, 64, 22, 30],
        color: "#fdcb69",
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
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
        show: false,
        markers: {
          size: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },

      fill: {
        type: ["gradient", "solid"],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.0,
          opacityTo: 0.4,
        },
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
        size: [0, 5],
        colors: "#fff",
        strokeColors: "#fdcb69",
        hover: {
          size: 8,
        },
      },
      xaxis: {
        type: "category",
      },
      yaxis: {
        stepSize: 10,
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
  const line2 = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },

      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      grid: {
        show: false,
      },
    },
  };
  const bar = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
        curve: "smooth",
      },
      xaxis: {
        // labels: {
        //     show: false,
        // },
        // axisTicks: {
        //     show: false,
        // },
        // axisBorder: {
        //     show: false,
        // },
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        // labels: {
        //     show: false,
        // },
        //   title: {
        //     text: '$ (thousands)'
        //   }
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      grid: {
        show: false,
      },
    },
  };
  const bar2 = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "last", // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      grid: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <>
      {/* <div id="chart">
      <ReactApexChart options={line.options} series={line.series} type="area" height={200} width={400} />
      <ReactApexChart options={line2.options} series={line2.series} type="area" height={200} width={400} />
      <ReactApexChart options={bar.options} series={bar.series} type="bar" height={200} width={400} />
      <ReactApexChart options={bar2.options} series={bar2.series} type="bar" height={200} width={400} />
      
    </div>
    <div id="html-dist"></div> */}
      
      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={9}>
          <MainCard>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={3}>
                <Card variant="outlined" sx={{ padding: "20px" }}>
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack direction="row">
                        <Typography variant="h6">Total</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon />
                          <Typography variant="h5">20%</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography variant="caption1">invoices</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Card variant="outlined" sx={{ padding: "20px" }}>
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack direction="row">
                        <Typography variant="h6">Total</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon />
                          <Typography variant="h5">20%</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography variant="caption1">invoices</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Card variant="outlined" sx={{ padding: "20px" }}>
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack direction="row">
                        <Typography variant="h6">Total</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon />
                          <Typography variant="h5">20%</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography variant="caption1">invoices</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Card variant="outlined" sx={{ padding: "20px" }}>
                  <Grid container spacing={1.25}>
                    <Grid item xs={12}>
                      <Stack direction="row">
                        <Typography variant="h6">Total</Typography>
                        <Stack direction="row">
                          <ArrowDropDownIcon />
                          <Typography variant="h5">20%</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="h5">$8898</Typography>
                        <Stack direction="row">
                          <Typography variant="h5">5</Typography>
                          <Typography variant="caption1">invoices</Typography>
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
          <MainCard sx={{ paddingBottom: 2 }}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={4} lg={6}>
                  <Card variant="outlined" sx={{ padding: "20px 0" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                      <Typography variant="subtitle1" mt={2}>
                        All invoices
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default LineChart;
