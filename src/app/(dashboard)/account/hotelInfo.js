import React from "react";
import { Formik, Form, FieldArray } from "formik";
import {
  TextField,
  Checkbox,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  rating: Yup.string().required("Required"),
  openStatus: Yup.boolean(),
  siteUrl: Yup.string().url("Invalid URL").required("Required"),
  description: Yup.string().required("Required"),
  paymentOptions: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one payment option"),
  checkin: Yup.string().required("Required"),
  checkout: Yup.string().required("Required"),
  images: Yup.array()
    .of(Yup.string().url("Invalid URL"))
    .min(1, "Add at least one image URL"),
  video: Yup.string().url("Invalid URL"),
  hotelDiscount: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      amount: Yup.string().required("Required"),
      code: Yup.string().required("Required"),
    })
  ),
  reviewEnabled: Yup.boolean(),
  locationGoogleMapsLink: Yup.string().url("Invalid URL").required("Required"),
});

const HotelInfo = ({ data }) => {
  const info = data;
  const initialValues = {
    name: info.name || "",
    address: info.address || "",
    rating: info.rating || "",
    openStatus: info.openStatus || false,
    siteUrl: info.siteUrl || "",
    description: info.description || "",
    paymentOptions: info.paymentOptions || [],
    checkin: info.checkin || "",
    checkout: info.checkout || "",
    images: info.images || [""],
    video: info.video || "",
    hotelDiscount: info.hotelDiscount || [
      { name: "", type: "", amount: "", code: "" },
    ],
    reviewEnabled: info.reviewEnabled || false,
    locationGoogleMapsLink: info.locationGoogleMapsLink || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form Values:", values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Hotel Information</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Hotel Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="rating"
                label="Rating"
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating}
              />
            </Grid>

            <Grid item xs={6}>
              <Checkbox
                name="openStatus"
                checked={values.openStatus}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography component="span">Open Status</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="siteUrl"
                label="Website URL"
                value={values.siteUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.siteUrl && errors.siteUrl}
                helperText={touched.siteUrl && errors.siteUrl}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Payment Options</Typography>
              <FieldArray
                name="paymentOptions"
                render={(arrayHelpers) => (
                  <div>
                    {["Visa", "MasterCard", "American Express", "PayPal"].map(
                      (option) => (
                        <div key={option}>
                          <Checkbox
                            name="paymentOptions"
                            value={option}
                            checked={values.paymentOptions.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                arrayHelpers.push(option);
                              } else {
                                const idx =
                                  values.paymentOptions.indexOf(option);
                                arrayHelpers.remove(idx);
                              }
                            }}
                          />
                          <Typography component="span">{option}</Typography>
                        </div>
                      )
                    )}
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="checkin"
                label="Check-in Time"
                value={values.checkin}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.checkin && errors.checkin}
                helperText={touched.checkin && errors.checkin}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="checkout"
                label="Check-out Time"
                value={values.checkout}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.checkout && errors.checkout}
                helperText={touched.checkout && errors.checkout}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Images</Typography>
              <FieldArray
                name="images"
                render={(arrayHelpers) => (
                  <div>
                    {values.images.map((image, index) => (
                      <div key={index}>
                        <TextField
                          fullWidth
                          name={`images.${index}`}
                          label={`Image URL ${index + 1}`}
                          value={image}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.images && errors.images}
                          helperText={touched.images && errors.images}
                          sx={{ mt: 1 }}
                        />
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => arrayHelpers.push("")}>
                      Add Image
                    </Button>
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="video"
                label="Video URL"
                value={values.video}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.video && errors.video}
                helperText={touched.video && errors.video}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Hotel Discounts</Typography>
              <FieldArray
                name="hotelDiscount"
                render={(arrayHelpers) => (
                  <div>
                    {values.hotelDiscount.map((discount, index) => (
                      <Grid container key={index} sx={{ mt: 2 }} spacing={2}>
                        <Grid item xs={12} md={2.5} lg={2.5}>
                          <TextField
                            name={`hotelDiscount.${index}.name`}
                            label="Discount Name"
                            value={discount.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={2.5} lg={2.5}>
                          <TextField
                            select
                            name={`hotelDiscount.${index}.type`}
                            label="Discount Type"
                            value={discount.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          >
                            <MenuItem value="percentage">Percentage</MenuItem>
                            <MenuItem value="fixed amount">
                              Fixed Amount
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={2.5} lg={2.5}>
                          <TextField
                            name={`hotelDiscount.${index}.amount`}
                            label="Discount Amount"
                            value={discount.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={2.5} lg={2.5}>
                          <TextField
                            name={`hotelDiscount.${index}.code`}
                            label="Discount Code"
                            value={discount.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          type: "",
                          amount: "",
                          code: "",
                        })
                      }
                    >
                      Add Discount
                    </Button>
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                name="reviewEnabled"
                checked={values.reviewEnabled}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography component="span">Enable Reviews</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="locationGoogleMapsLink"
                label="Google Maps Link"
                value={values.locationGoogleMapsLink}
                onChange={handleChange}
                onBlur={handleBlur}
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

export default HotelInfo;
