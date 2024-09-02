"use client";
import React, { useState } from "react";
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
  TabContext,
  TabList,
  Card,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import Member from "../member/page";
import MainCard from "../../components/MainCard";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import * as Yup from "yup";
import { Formik } from "formik";
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
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  console.log(showPassword)
  console.log(showPassword.oldPassword)
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPasswordCriteria({
      minLength: value.length >= 8,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };
  return (
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
              icon={<SupervisorAccountOutlinedIcon fontSize="small" />}
              iconPosition="start"
              label="Staff"
              {...a11yProps(2)}
            />
            <Tab
              icon={<SettingsIcon fontSize="small" />}
              iconPosition="start"
              label="Settings"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel label="start" value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  country: "",
                  zipcode: "",
                  phone: "",
                  email: "",
                  address: "",
                  url: "",
                  submit: null,
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string()
                    .max(255, "First Name must be at most 255 characters")
                    .required("First Name is required"),
                  lastName: Yup.string()
                    .max(255, "Last Name must be at most 255 characters")
                    .required("Last Name is required"),
                  country: Yup.string()
                    .max(255, "Country must be at most 255 characters")
                    .required("Country is required"),
                  zipcode: Yup.string()
                    .max(255, "Zipcode must be at most 255 characters")
                    .required("Zipcode is required"),
                  phone: Yup.string()
                    .matches(
                      /^[0-9]+$/,
                      "Phone number must contain only digits"
                    )
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
                    .url("Must be a valid URL")
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
                              <InputLabel
                                htmlFor="first-name"
                                sx={{ marginBottom: 1 }}
                              >
                                First Name
                              </InputLabel>
                              <OutlinedInput
                                variant="outlined"
                                id="first-name"
                                type="text"
                                value={values.firstName}
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                fullWidth
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                              />
                              {touched.firstName && errors.firstName && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-text-first-name"
                                >
                                  {errors.firstName}
                                </FormHelperText>
                              )}
                            </Grid>

                            {/* Last Name Field */}
                            <Grid item xs={12} md={6} lg={6}>
                              <InputLabel
                                htmlFor="last-name"
                                sx={{ marginBottom: 1 }}
                              >
                                Last Name
                              </InputLabel>
                              <OutlinedInput
                                variant="outlined"
                                id="last-name"
                                type="text"
                                value={values.lastName}
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                fullWidth
                                error={Boolean(
                                  touched.lastName && errors.lastName
                                )}
                              />
                              {touched.lastName && errors.lastName && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-text-last-name"
                                >
                                  {errors.lastName}
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
                                error={Boolean(
                                  touched.country && errors.country
                                )}
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
                                error={Boolean(
                                  touched.zipcode && errors.zipcode
                                )}
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
                          <Grid container spacing={3} p={2}>
                            {/* Phone Number Field */}
                            <Grid item xs={12} md={6} lg={6}>
                              <InputLabel
                                htmlFor="phone-number"
                                sx={{ marginBottom: 1 }}
                              >
                                Phone Number
                              </InputLabel>
                              <OutlinedInput
                                variant="outlined"
                                id="phone-number"
                                type="text"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                fullWidth
                                error={Boolean(touched.phone && errors.phone)}
                              />
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
                            <Grid item xs={12} md={6} lg={6}>
                              <InputLabel
                                htmlFor="email"
                                sx={{ marginBottom: 1 }}
                              >
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
                                error={Boolean(
                                  touched.address && errors.address
                                )}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <Stack sx={{ padding: "20px" }}>
                  <Typography variant="subtitle1">Change Password</Typography>
                </Stack>
                <Divider />

                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    oldPassword: Yup.string().required("Old Password is required"),
                    newPassword: Yup.string()
                    .min(8, "Password must be at least 8 characters")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/\d/, "Password must contain at least one number")
                    .matches(
                      /[!@#$%^&*(),.?":{}|<>]/,
                      "Password must contain at least one special character"
                    )
                    .required("Password is required"),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref("newPassword")], "Passwords must match")
                      .required("Confirm Password is required"),
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
                        <Grid item xs={12} md={6} lg={6}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Stack spacing={1} sx={{ padding: "24px" }}>
                                <InputLabel htmlFor="old-password">
                                  Old Password
                                </InputLabel>
                                <OutlinedInput
                                  id="old-password"
                                  type={showPassword.oldPassword ? "text" : "password"}
                                  value={values.oldPassword}
                                  name="oldPassword"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Enter old password"
                                  fullWidth
                                  error={Boolean(
                                    touched.oldPassword && errors.oldPassword
                                  )}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                          setShowPassword((prev) => ({
                                            ...prev,
                                            ['oldPassword']:!prev['oldPassword']
                                          }))
                                        }
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                        color="secondary"
                                      >
                                        {showPassword.oldPassword ? (
                                          <EyeOutlined />
                                        ) : (
                                          <EyeInvisibleOutlined />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                {touched.oldPassword && errors.oldPassword && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-text-old-password"
                                >
                                  {errors.oldPassword}
                                </FormHelperText>
                              )}
                              </Stack>
                              
                            </Grid>

                            <Grid item xs={12}>
                              <Stack spacing={1} sx={{ padding: "24px" }}>
                                <InputLabel htmlFor="new-password">
                                  New Password
                                </InputLabel>
                                <OutlinedInput
                                  fullWidth
                                  error={Boolean(
                                    touched.newPassword && errors.newPassword
                                  )}
                                  id="new-password"
                                  type={showPassword.newPassword ? "text" : "password"}
                                  value={values.newPassword}
                                  name="newPassword"
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleChange(e);
                                    handlePasswordChange(e);
                                  }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                          setShowPassword((prev) => ({
                                             ...prev,
                                              ['newPassword']:!prev['newPassword']
                                          }))
                                        }
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                        color="secondary"
                                      >
                                        {showPassword.newPassword ? (
                                          <EyeOutlined />
                                        ) : (
                                          <EyeInvisibleOutlined />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  placeholder="Enter new password"
                                />
                                {touched.newPassword && errors.newPassword && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-text-new-password"
                                >
                                  {errors.newPassword}
                                </FormHelperText>
                              )}
                              </Stack>
                              
                            </Grid>

                            <Grid item xs={12}>
                              <Stack spacing={1} sx={{ padding: "24px" }}>
                                <InputLabel htmlFor="confirm-password">
                                  Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                  fullWidth
                                  error={Boolean(
                                    touched.confirmPassword &&
                                      errors.confirmPassword
                                  )}
                                  id="confirm-password"
                                  type={showPassword.confirmPassword ? "text" : "password"}
                                  value={values.confirmPassword}
                                  name="confirmPassword"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                          setShowPassword((prev) => ({
                                             ...prev,
                                              ['confirmPassword']:!prev['confirmPassword']
                                          }))
                                        }
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                        color="secondary"
                                      >
                                        {showPassword.confirmPassword ? (
                                          <EyeOutlined />
                                        ) : (
                                          <EyeInvisibleOutlined />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  placeholder="Confirm new password"
                                />
                                {touched.confirmPassword &&
                                errors.confirmPassword && (
                                  <FormHelperText
                                    error
                                    id="standard-weight-helper-text-confirm-password"
                                  >
                                    {errors.confirmPassword}
                                  </FormHelperText>
                                )}
                              </Stack>
                              
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <Box sx={{ padding: "40px" }}>
                            <Typography variant="h5">
                              New Password must contain:
                            </Typography>
                            <List>
                              <ListItemButton divider>
                                <ListItemAvatar>
                                  {passwordCriteria.minLength ? (
                                    <DoneIcon color="success" />
                                  ) : (
                                    <RemoveIcon color="error"  />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="body1">
                                      At least 8 characters
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                              <ListItemButton divider>
                                <ListItemAvatar>
                                  {passwordCriteria.lowercase ? (
                                    <DoneIcon color="success" />
                                  ) : (
                                    <RemoveIcon color="error" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="body1">
                                      At least 1 lowercase letter (a-z)
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                              <ListItemButton divider>
                                <ListItemAvatar>
                                  {passwordCriteria.uppercase ? (
                                    <DoneIcon color="success" />
                                  ) : (
                                    <RemoveIcon color="error" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="body1">
                                      At least 1 uppercase letter (A-Z)
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                              <ListItemButton>
                                <ListItemAvatar>
                                  {passwordCriteria.number ? (
                                    <DoneIcon color="success" />
                                  ) : (
                                    <RemoveIcon color="error" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="body1">
                                      At least 1 number (0-9)
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                              <ListItemButton>
                                <ListItemAvatar>
                                  {passwordCriteria.specialChar ? (
                                    <DoneIcon color="success" />
                                  ) : (
                                    <RemoveIcon color="error" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="body1">
                                      At least 1 special character
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            </List>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <Button
                              disableElevation
                              disabled={isSubmitting}
                              size="large"
                              type="button"
                              onClick={handleSubmit}
                              variant="contained"
                              color="primary"
                            >
                              Change Password
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Card>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Member />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}></CustomTabPanel>
      </Box>
    </MainCard>
  );
}
