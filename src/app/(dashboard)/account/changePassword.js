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
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import * as Yup from "yup";
import { Formik } from "formik";
const changePassword = ({ data }) => {
  // console.log("pass", data);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
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
    <>
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
                  .matches(
                    /[a-z]/,
                    "Password must contain at least one lowercase letter"
                  )
                  .matches(
                    /[A-Z]/,
                    "Password must contain at least one uppercase letter"
                  )
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
                              type={
                                showPassword.oldPassword ? "text" : "password"
                              }
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
                                        ["oldPassword"]: !prev["oldPassword"],
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
                              type={
                                showPassword.newPassword ? "text" : "password"
                              }
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
                                        ["newPassword"]: !prev["newPassword"],
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
                              type={
                                showPassword.confirmPassword
                                  ? "text"
                                  : "password"
                              }
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
                                        ["confirmPassword"]:
                                          !prev["confirmPassword"],
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
                                <RemoveIcon color="error" />
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
    </>
  );
};

export default changePassword;
