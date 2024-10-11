import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Business Name is required"),
  businessType: Yup.string().required("Business Type is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  countryCode: Yup.string().required("Country Code is required"),
  gst: Yup.string().matches(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    "Invalid GST number"
  ),
  panNo: Yup.string().matches(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "Invalid PAN number"
  ),
});

const BusinessInfoForm = ({ data }) => {
  const info = data;
  const initialValues = {
    businessName: info?.businessName || "",
    businessType: info?.businessType || "",
    email: info?.email || "",
    password: info?.password || "",
    phone: info?.phone || "",
    countryCode: info?.countryCode || "",
    gst: info?.gst || "",
    panNo: info?.panNo || "",
    isVerified: info?.isVerified || false,
    canForgotPassword: info?.canForgotPassword || true,
    role: info?.role || "",
    image: info?.image || "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Typography variant="h4" gutterBottom>
            Business Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="businessName"
                label="Business Name"
                error={touched.businessName && errors.businessName}
                helperText={touched.businessName && errors.businessName}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="businessType"
                label="Business Type"
                error={touched.businessType && errors.businessType}
                helperText={touched.businessType && errors.businessType}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                as={TextField}
                fullWidth
                name="countryCode"
                label="Country Code"
                error={touched.countryCode && errors.countryCode}
                helperText={touched.countryCode && errors.countryCode}
              />
            </Grid>
            <Grid item xs={8}>
              <Field
                as={TextField}
                fullWidth
                name="phone"
                label="Phone Number"
                error={touched.phone && errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="gst"
                label="GST Number"
                error={touched.gst && errors.gst}
                helperText={touched.gst && errors.gst}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="panNo"
                label="PAN Number"
                error={touched.panNo && errors.panNo}
                helperText={touched.panNo && errors.panNo}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Field as={Switch} name="isVerified" color="primary" />
                }
                label="Verified Business"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Field as={Switch} name="canForgotPassword" color="primary" />
                }
                label="Allow Password Reset"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default BusinessInfoForm;
