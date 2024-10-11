"use client";
import React, { useState } from "react";
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

const personalInfo = ({ data }) => {
  const info = data;
  const { data: session } = useSession();
  const countryName = () => {
    const name = countriesList.find(
      (item) => item.phone === info.contactInfo.countryCode || ""
    );
    return name?.label;
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              name: info.ownerName || "",
              country: countryName() || "",
              zipcode: info.zipCode || "",
              countryCode: info.contactInfo.countryCode || "",
              phone: info.contactInfo.phoneNumber || "",
              email: info.contactInfo.email || "",
              address: info.address || "",
              url: "",
              submit: null,
            }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255, "First Name must be at most 255 characters")
                .required("First Name is required"),
              country: Yup.string()
                .max(255, "Country must be at most 255 characters")
                .required("Country is required"),
              zipcode: Yup.string()
                .max(255, "Zipcode must be at most 255 characters")
                .required("Zipcode is required"),
              countryCode: Yup.string()
                .max(255)
                .required("Country Code is required"),
              phone: Yup.string()
                .matches(/^[0-9]+$/, "Phone number must contain only digits")
                .min(10, "Phone number must be at least 10 digits")
                .max(15, "Phone number must be at most 15 digits")
                .required("Phone number is required"),
              email: Yup.string()
                .email("Must be a valid email")
                .max(255, "Email must be at most 255 characters")
                .required("Email is required"),
              address: Yup.string()
                .max(255, "Address must be at most 255 characters")
                .required("Address is required"),
              url: Yup.string()
                .url(`Must be a valid URL 'https://www.example.com'`)
                .max(255, "URL must be at most 255 characters")
                .required("URL is required"),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log("Form Values:", values);
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Card variant="outlined">
                      <Stack sx={{ padding: "20px" }}>
                        <Typography variant="subtitle1">
                          Personal Information
                        </Typography>
                      </Stack>
                      <Divider />
                      <Grid container spacing={3} p={2}>
                        {/* First Name Field */}
                        <Grid item xs={12} md={6} lg={6}>
                          <InputLabel htmlFor="name" sx={{ marginBottom: 1 }}>
                            Name
                          </InputLabel>
                          <OutlinedInput
                            variant="outlined"
                            id="name"
                            type="text"
                            value={values.name}
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter name"
                            fullWidth
                            error={Boolean(touched.name && errors.name)}
                          />
                          {touched.name && errors.name && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-name"
                            >
                              {errors.name}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* Country Field */}
                        <Grid item xs={12} md={6} lg={6}>
                          <InputLabel
                            htmlFor="country"
                            sx={{ marginBottom: 1 }}
                          >
                            Country
                          </InputLabel>
                          <OutlinedInput
                            variant="outlined"
                            id="country"
                            type="text"
                            value={values.country}
                            name="country"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter country name"
                            fullWidth
                            error={Boolean(touched.country && errors.country)}
                          />
                          {touched.country && errors.country && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-country"
                            >
                              {errors.country}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* Zip Code Field */}
                        <Grid item xs={12} md={6} lg={6}>
                          <InputLabel
                            htmlFor="zip-code"
                            sx={{ marginBottom: 1 }}
                          >
                            Zip Code
                          </InputLabel>
                          <OutlinedInput
                            variant="outlined"
                            id="zip-code"
                            type="text"
                            value={values.zipcode}
                            name="zipcode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter zip code"
                            fullWidth
                            error={Boolean(touched.zipcode && errors.zipcode)}
                          />
                          {touched.zipcode && errors.zipcode && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-zip-code"
                            >
                              {errors.zipcode}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  {/* Contact Information Card */}
                  <Grid item xs={12} md={6} lg={6}>
                    <Card variant="outlined">
                      <Stack sx={{ padding: "20px" }}>
                        <Typography variant="subtitle1">
                          Contact Information
                        </Typography>
                      </Stack>
                      <Divider />
                      <Grid container spacing={1} p={2}>
                        {/* Phone Number Field */}
                        <Grid item xs={12} md={7} lg={7}>
                          <InputLabel
                            htmlFor="phone-number"
                            sx={{ marginBottom: 1 }}
                          >
                            Phone Number
                          </InputLabel>
                          <Stack direction="row" spacing={1}>
                            <FormControl
                              sx={{
                                width: { xs: "40%", lg: "32%", md: "32%" },
                              }}
                            >
                              <Select
                                labelId="demo-multiple-name-label"
                                id="countryCode-signup"
                                value={values.countryCode}
                                type="countryCode"
                                name="countryCode"
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                error={Boolean(
                                  touched.countryCode && errors.countryCode
                                )}
                              >
                                {countriesList.map((name) => (
                                  <MenuItem key={name.code} value={name.phone}>
                                    +{name.phone}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.countryCode && errors.countryCode && (
                                <FormHelperText
                                  error
                                  id="helper-text-countryCode-signup"
                                >
                                  {errors.countryCode}
                                </FormHelperText>
                              )}
                            </FormControl>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(touched.phone && errors.phone)}
                              id="phone-signup"
                              type="phone"
                              value={values.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="10 Digits"
                            />
                          </Stack>
                          {touched.phone && errors.phone && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-phone-number"
                            >
                              {errors.phone}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* Email Field */}
                        <Grid item xs={12} md={5} lg={5}>
                          <InputLabel htmlFor="email" sx={{ marginBottom: 1 }}>
                            Email
                          </InputLabel>
                          <OutlinedInput
                            variant="outlined"
                            id="email"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                          />
                          {touched.email && errors.email && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email"
                            >
                              {errors.email}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* Address Field */}
                        <Grid item xs={12} md={12} lg={12}>
                          <InputLabel
                            htmlFor="address"
                            sx={{ marginBottom: 1 }}
                          >
                            Address
                          </InputLabel>
                          <OutlinedInput
                            variant="outlined"
                            id="address"
                            type="text"
                            value={values.address}
                            name="address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter address"
                            fullWidth
                            error={Boolean(touched.address && errors.address)}
                          />
                          {touched.address && errors.address && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-address"
                            >
                              {errors.address}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* URL Field */}
                        <Grid item xs={12} md={12} lg={12}>
                          <InputLabel
                            htmlFor="website-url"
                            sx={{ marginBottom: 1 }}
                          >
                            Website Url
                          </InputLabel>
                          <TextField
                            id="url"
                            type="text"
                            value={values.url}
                            name="url"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="https://www.example.com"
                            fullWidth
                            error={Boolean(touched.url && errors.url)}
                            helperText={
                              touched.url && errors.url ? errors.url : ""
                            }
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    {errors.submit && (
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default personalInfo;
