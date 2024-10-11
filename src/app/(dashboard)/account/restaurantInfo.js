import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  rating: Yup.number().min(0).max(5).required("Required"),
  openStatus: Yup.boolean(),
  siteUrl: Yup.string().url("Invalid URL"),
  description: Yup.string(),
  paymentOptions: Yup.array().of(Yup.string()),
  openingTime: Yup.string().required("Required"),
  closingTime: Yup.string().required("Required"),
  images: Yup.array().of(Yup.string().url("Invalid URL")),
  minimumOrderPrice: Yup.number().positive("Must be positive"),
  deliveryFee: Yup.number().min(0, "Must be non-negative"),
  avgDeliveryTime: Yup.number().positive("Must be positive"),
  reviewEnabled: Yup.boolean(),
  locationGoogleMapsLink: Yup.string().url("Invalid URL"),
});

const paymentOptionsList = [
  "Visa",
  "MasterCard",
  "American Express",
  "Apple Pay",
];

const RestaurantForm = ({ data }) => {
  const info = data;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={{
          name: info.name || "",
          address: info.address || "",
          rating: info.rating ? info.rating.split("/")[0] : "",
          openStatus: info.openStatus || false,
          siteUrl: info.siteUrl || "",
          description: info.description || "",
          paymentOptions: info.paymentOptions || [],
          openingTime: info.openingTime
            ? dayjs(info.openingTime, "h:mm A")
            : null,
          closingTime: info.closingTime
            ? dayjs(info.closingTime, "h:mm A")
            : null,
          images: info.images || ["", "", ""],
          minimumOrderPrice: info.minimumOrderPrice
            ? info.minimumOrderPrice.split(" ")[0]
            : "",
          deliveryFee: info.deliveryFee ? info.deliveryFee.split(" ")[0] : "",
          avgDeliveryTime: info.avgDeliveryTime
            ? info.avgDeliveryTime.split(" ")[0]
            : "",
          reviewEnabled: info.reviewEnabled || false,
          locationGoogleMapsLink: info.locationGoogleMapsLink || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Values:", values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Restaurant Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Restaurant Name"
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="address"
                  label="Address"
                  error={touched.address && errors.address}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="rating"
                  label="Rating"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                  error={touched.rating && errors.rating}
                  helperText={touched.rating && errors.rating}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Field as={Checkbox} name="openStatus" color="primary" />
                  }
                  label="Open Status"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="siteUrl"
                  label="Website URL"
                  error={touched.siteUrl && errors.siteUrl}
                  helperText={touched.siteUrl && errors.siteUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Description"
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Payment Options
                </Typography>
                {paymentOptionsList.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Field
                        as={Checkbox}
                        name="paymentOptions"
                        value={option}
                        color="primary"
                        checked={values.paymentOptions.includes(option)}
                      />
                    }
                    label={option}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Opening Time"
                  value={values.openingTime}
                  onChange={(newValue) => {
                    setFieldValue("openingTime", newValue);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Closing Time"
                  value={values.closingTime}
                  onChange={(newValue) => {
                    setFieldValue("closingTime", newValue);
                  }}
                />
              </Grid>
              {[0, 1, 2].map((index) => (
                <Grid item xs={12} key={index}>
                  <Field
                    as={TextField}
                    fullWidth
                    name={`images[${index}]`}
                    label={`Image URL ${index + 1}`}
                    error={touched.images?.[index] && errors.images?.[index]}
                    helperText={
                      touched.images?.[index] && errors.images?.[index]
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="minimumOrderPrice"
                  label="Minimum Order Price (USD)"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  error={touched.minimumOrderPrice && errors.minimumOrderPrice}
                  helperText={
                    touched.minimumOrderPrice && errors.minimumOrderPrice
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="deliveryFee"
                  label="Delivery Fee (USD)"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  error={touched.deliveryFee && errors.deliveryFee}
                  helperText={touched.deliveryFee && errors.deliveryFee}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="avgDeliveryTime"
                  label="Average Delivery Time (minutes)"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  error={touched.avgDeliveryTime && errors.avgDeliveryTime}
                  helperText={touched.avgDeliveryTime && errors.avgDeliveryTime}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Field as={Checkbox} name="reviewEnabled" color="primary" />
                  }
                  label="Enable Reviews"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="locationGoogleMapsLink"
                  label="Google Maps Link"
                  error={
                    touched.locationGoogleMapsLink &&
                    errors.locationGoogleMapsLink
                  }
                  helperText={
                    touched.locationGoogleMapsLink &&
                    errors.locationGoogleMapsLink
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default RestaurantForm;
