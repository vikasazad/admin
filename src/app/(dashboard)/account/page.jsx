"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  InputLabel,
  FormHelperText,
  Box,
  OutlinedInput,
  Tabs,
  Tab,
  Divider,
  Stack,
  InputAdornment,
  Card,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Member from "../member/page";
import MainCard from "../../components/MainCard";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BusinessIcon from "@mui/icons-material/Business";
import HotelInfo from "./hotelInfo";
import RestaurantInfo from "./restaurantInfo";
import BusinessInfo from "./businessInfo";
import PersonalInfo from "./personalInfo";
import ChangePassword from "./changePassword";
import Settings from "./settings";
import * as Yup from "yup";
import { Formik } from "formik";
import { countriesList } from "../../assets/countriesData";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirestoreManagementData } from "../../features/managementInfo";
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

export default function Account() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const user = session?.user;
  const info = useSelector((state) => state.firebaseManagementData);
  const [value, setValue] = React.useState(0);
  const [management, setManagement] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        fetchFirestoreManagementData({
          email: user.email,
        })
      );
    }
  }, [dispatch, user, status]);

  useEffect(() => {
    if (info?.status === "succeeded") {
      setManagement(info?.data);
    }
  }, [info]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {management && (
        <MainCard>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  icon={<PermIdentityOutlinedIcon fontSize="small" />}
                  iconPosition="start"
                  label="Profile"
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<HttpsOutlinedIcon fontSize="small" />}
                  iconPosition="start"
                  label="Change Password"
                  {...a11yProps(1)}
                />
                <Tab
                  icon={<ApartmentIcon fontSize="small" />}
                  iconPosition="start"
                  label="Hotel"
                  {...a11yProps(2)}
                />
                <Tab
                  icon={<RestaurantIcon fontSize="small" />}
                  iconPosition="start"
                  label="Restaurant"
                  {...a11yProps(3)}
                />
                <Tab
                  icon={<BusinessIcon fontSize="small" />}
                  iconPosition="start"
                  label="Business"
                  {...a11yProps(4)}
                />
                <Tab
                  icon={<SupervisorAccountOutlinedIcon fontSize="small" />}
                  iconPosition="start"
                  label="Staff"
                  {...a11yProps(5)}
                />
                <Tab
                  icon={<SettingsIcon fontSize="small" />}
                  iconPosition="start"
                  label="Settings"
                  {...a11yProps(6)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel label="start" value={value} index={0}>
              <PersonalInfo data={management.personalInfo} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ChangePassword data={management.personalInfo.password} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <HotelInfo data={management.hotel} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <RestaurantInfo data={management.restaurant} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <BusinessInfo data={management.business} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
              <Member />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
              <Settings />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={3}></CustomTabPanel> */}
          </Box>
        </MainCard>
      )}
    </>
  );
}
