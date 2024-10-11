"use client";
// project import
import MainCard from "../../components/MainCard";
import { React, useState, useRef, useEffect } from "react";
import { useTheme, styled } from "@mui/material/styles";
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
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../features/firebaseSlice";
import { addData } from "../../features/adminRestaurantInfoSlice";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../DB/firebase";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(data, paymentOptions, theme) {
  return {
    fontWeight:
      paymentOptions.indexOf(data) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function RestaurantInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const uploadLogoInputRef = useRef(null);
  const uploadRestaurantImageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    restaurantId: "1",
    name: "",
    address: "",
    minimumOrderPrice: "",
    deliveryFee: "",
    avgDeliveryTime: "",
    siteUrl: "",
    locationImg: "",
    restaurantUrl: "",
    gbpLink: "",
    facebookLikeLink: "",
    description: "",
    paymentOptions: [],
    restaurantDiscount: [
      {
        name: "",
        quantity: "",
        type: { id: "", value: "" },
      },
      {
        name: "",
        quantity: "",
        type: { id: "", value: "" },
      },
    ],
    logo: "",
    restaurantImages: [],
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    minimumOrderPrice: "",
    deliveryFee: "",
    avgDeliveryTime: "",
    siteUrl: "",
    restaurantUrl: "",
    facebookLikeLink: "",
    description: "",
    gbpLink: "",
    paymentOptions: "",
    couponName1: "",
    couponAmount1: "",
    couponName2: "",
    couponAmount2: "",
  });
  const theme = useTheme();
  const firebaseData = useSelector((state) => state.firebaseData);
  const [selectedRestaurantImg, setSelectedRestaurantImg] = useState([]);
  const [selectedRestaurantLogo, setSelectedRestaurantLogo] = useState(null);
  const [FDRestaurantImg, setFDRestaurantImg] = useState([]);
  const [FDRestaurantLogo, setFDRestaurantLogo] = useState(null);
  const [menuFlag, setMenuFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);
  const timer = useRef();
  const errorObj = {
    name: "",
    address: "",
    minimumOrderPrice: "",
    deliveryFee: "",
    avgDeliveryTime: "",
    siteUrl: "",
    restaurantUrl: "",
    facebookLikeLink: "",
    description: "",
    gbpLink: "",
    paymentOptions: "",
    couponName1: "",
    couponAmount1: "",
    couponName2: "",
    couponAmount2: "",
  };

  useEffect(() => {
    dispatch(fetchDataFromFirestore());
  }, [dispatch]);

  useEffect(() => {
    if (firebaseData?.status === "succeeded") {
      // console.log(firebaseData.data?.restaurantInfo);
      setFormData(firebaseData.data?.restaurantInfo);
      setFormErrors(errorObj);
      if (firebaseData.data?.restaurantInfo?.logo) {
        setUploadedLogo(true);
      }
      if (firebaseData.data?.restaurantInfo?.restaurantImages) {
        setUploadedImg(true);
      }
    }
  }, [firebaseData]);
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const restaurantLogoUpload = (e) => {
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      if (selectedRestaurantLogo) {
        alert("You can only upload one logo.");
        return;
      }
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        alert("File size cannot exceed 1MB.");
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () => {
        setFDRestaurantLogo(file);
        setSelectedRestaurantLogo({
          id: "1",
          filename: file.name,
          filetype: file.type, // Hardcoded since it's a WebP image
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteRestaurantLogo = async () => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      setSelectedRestaurantLogo(null);
      if (uploadLogoInputRef.current) {
        uploadLogoInputRef.current.value = "";
      }
    } else {
      // alert('No');
    }
  };

  const restaurantImgUpload = (e) => {
    let images = [];
    let totalUploadedFiles = 0;

    if (
      e.target.files.length +
        selectedRestaurantImg.length +
        formData.restaurantImages.length >
      5
    ) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      if (totalUploadedFiles >= 5) {
        alert("You can upload a maximum of 5 images.");
        break;
      }

      let file = e.target.files[i];

      if (file.size > 2 * 1024 * 1024) {
        alert(
          `File ${file.name} exceeds the 2MB size limit and will not be uploaded.`
        );
        continue;
      }

      images.push(file);

      let reader = new FileReader();

      reader.onloadend = () => {
        const formData = new FormData();
        formData.append("image", file);
        setFDRestaurantImg((preValue) => {
          return [...preValue, formData];
        });
        setSelectedRestaurantImg((preValue) => {
          totalUploadedFiles++;
          return [
            ...preValue,
            {
              id: v4(),
              filename: file.name,
              filetype: file.type,
              fileimage: reader.result,
              datetime: file.lastModifiedDate.toLocaleString("en-IN"),
              filesize: filesizes(file.size),
            },
          ];
        });
      };

      // Fetch code to send the image to the server

      reader.readAsDataURL(file);
    }
  };

  const deleteRestaurantImg = async (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = selectedRestaurantImg.filter((data) => data.id !== id);
      setSelectedRestaurantImg(result);
      if (uploadRestaurantImageInputRef.current) {
        uploadRestaurantImageInputRef.current.value = "";
      }
    } else {
      // alert('No');
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    console.log(field, value);
    validateField(field, value);
  };

  const isUrlValid = (url) => {
    const urlPattern =
      /^(https?|ftp):\/\/(?:w{3}\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/\S*)?$/;

    return urlPattern.test(url);
  };

  const validationFunctions = {
    name: (value) => (value.trim() === "" ? "Name is required" : ""),
    address: (value) => (value.trim() === "" ? "Address is required" : ""),
    minimumOrderPrice: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    deliveryFee: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    avgDeliveryTime: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    siteUrl: (value) => (!isUrlValid(value) ? "Please enter a valid URL" : ""),
    restaurantUrl: (value) =>
      !isUrlValid(value) ? "Please enter a valid URL" : "",
    facebookLikeLink: (value) =>
      !isUrlValid(value) ? "Please enter a valid URL" : "",
    description: (value) =>
      value.trim() === "" ? "Description is required" : "",
    gbpLink: (value) => (!isUrlValid(value) ? "Please enter a valid URL" : ""),
    paymentOptions: (value) =>
      value.length === 0 ? "Payment Options cannot be empty" : "",
    couponName1: (value) =>
      value.trim() === "" ? "Coupon name is required" : "",
    couponType1: (value) =>
      value.trim() === "" ? "Coupon name is required" : "",
    couponAmount1: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    couponName2: (value) =>
      value.trim() === "" ? "Coupon name is required" : "",
    couponType2: (value) =>
      value.trim() === "" ? "Coupon name is required" : "",
    couponAmount2: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
  };

  const validateField = (field, value) => {
    console.log(field, value);
    const error = validationFunctions[field](value);
    console.log(error);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleCouponChange = (field, value, index) => {
    console.log(field, value, index);
    let data = 1;
    if (value === "Price") {
      data = 2;
    }
    setFormData((prevData) => {
      const updatedCoupons = [...prevData.restaurantDiscount];
      console.log(updatedCoupons[index][field]);
      if (field === "type") {
        console.log("inside");
        if (index === 0) {
          updatedCoupons[index][field].id = data;
          updatedCoupons[index][field].value = value;
          if (formData.restaurantDiscount[0]) {
            if (formData.restaurantDiscount[0].name === "") {
              console.log("here");
              validateField("couponName1", formData.restaurantDiscount[0].name);
            }
            if (formData.restaurantDiscount[0].quantity === "") {
              console.log("here");
              validateField(
                "couponAmount1",
                formData.restaurantDiscount[0].quantity
              );
            }
          }
          validateField("couponType1", value);
        } else {
          updatedCoupons[index][field].id = data;
          updatedCoupons[index][field].value = value;
          if (formData.restaurantDiscount[1]) {
            if (formData.restaurantDiscount[1].name === "") {
              validateField("couponName2", formData.restaurantDiscount[1].name);
            }
            if (formData.restaurantDiscount[1].quantity === "") {
              validateField(
                "couponAmount2",
                formData.restaurantDiscount[1].quantity
              );
            }
          }
          validateField("couponType2", value);
        }

        console.log(updatedCoupons);
      } else {
        updatedCoupons[index][field] = value;
        if (index === 0) {
          if (field === "quantity") {
            validateField("couponAmount1", value);
            if (formData.restaurantDiscount[0]) {
              if (formData.restaurantDiscount[0].name === "") {
                validateField(
                  "couponName1",
                  formData.restaurantDiscount[0].name
                );
              }
              if (formData.restaurantDiscount[0].type.value === "") {
                validateField(
                  "couponType1",
                  formData.restaurantDiscount[0].type.value
                );
              }
            }
          } else {
            validateField("couponName1", value);
            if (formData.restaurantDiscount[0]) {
              if (formData.restaurantDiscount[0].quantity === "") {
                validateField(
                  "couponAmount1",
                  formData.restaurantDiscount[0].quantity
                );
              }
              if (formData.restaurantDiscount[0].type.value === "") {
                validateField(
                  "couponType1",
                  formData.restaurantDiscount[0].type.value
                );
              }
            }
          }
        } else {
          if (field === "quantity") {
            validateField("couponAmount2", value);
            if (formData.restaurantDiscount[1]) {
              if (formData.restaurantDiscount[1].name === "") {
                validateField(
                  "couponName2",
                  formData.restaurantDiscount[1].name
                );
              }
              if (formData.restaurantDiscount[1].type.value === "") {
                validateField(
                  "couponType2",
                  formData.restaurantDiscount[1].type.value
                );
              }
            }
          } else {
            if (formData.restaurantDiscount[1]) {
              if (formData.restaurantDiscount[1].quantity === "") {
                validateField(
                  "couponAmount2",
                  formData.restaurantDiscount[1].quantity
                );
              }
              if (formData.restaurantDiscount[1].type.value === "") {
                validateField(
                  "couponType2",
                  formData.restaurantDiscount[1].type.value
                );
              }
            }
            validateField("couponName2", value);
          }
        }
      }

      console.log(updatedCoupons);

      return { ...prevData, restaurantDiscount: updatedCoupons };
    });
  };

  const handleSelectPaymentOptions = (event) => {
    const { value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentOptions: Array.isArray(value)
        ? value.map((option) => ({ type: option }))
        : prevFormData.paymentOptions.some((option) => option.type === value)
        ? prevFormData.paymentOptions.filter((option) => option.type !== value)
        : [...prevFormData.paymentOptions, { type: value }],
    }));
    validateField("paymentOptions", value);
  };

  const sendLogo = async () => {
    if (isUrlValid(formData.logo) && FDRestaurantLogo === null) {
      return true;
    } else {
      try {
        console.log("here");
        const formData = new FormData();
        formData.append("image", FDRestaurantLogo);

        const response = await fetch("http://localhost:5000/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.blob();
        const imageRef = ref(
          storage,
          `restaurantCode1/Images/restaurantLogo/${FDRestaurantLogo.name}`
        );
        const snapshot = await uploadBytes(imageRef, data);
        const url = await getDownloadURL(snapshot.ref);
        setFormData((prevData) => ({
          ...prevData,
          logo: url,
        }));

        return true;
      } catch (error) {
        console.error("Error uploading logo:", error);
        return false;
      }
    }
  };

  const sendRestaurantImages = async () => {
    // console.log(FDRestaurantImg);
    let imgArr = [];
    await Promise.all(
      FDRestaurantImg.map(async (Imgdata) => {
        try {
          const formData = new FormData();
          formData.append("image", Imgdata);

          const response = await fetch("http://localhost:5000/uploadImage", {
            method: "POST",
            body: Imgdata,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.blob();
          const imageRef = ref(
            storage,
            `restaurantCode1/Images/restaurantImages/${v4()}`
          );
          const snapshot = await uploadBytes(imageRef, data);
          const url = await getDownloadURL(snapshot.ref);
          imgArr.push(url);
        } catch (error) {
          console.error("Error uploading image:", error);
          return false; // Return false on error
        }
      })
    );
    setFormData((prevData) => ({
      ...prevData,
      restaurantImages: [...prevData.restaurantImages, ...imgArr],
    }));
    setSelectedRestaurantImg([]);
    return true;
  };
  const handleNextClick = async () => {
    console.log("clicked");
    setLoading(true);
    let formErrorsExist = false;

    const excludedFields = [
      "restaurantDiscount",
      "id",
      "rating",
      "socialShare",
      "deliveryTypes",
      "sponsored",
      "value",
      "locationImg",
      "openStatus",
      "reviewEnabled",
      "userFavourite",
      "defaultAd",
      "logo",
      "restaurantImages",
      "taxPercentage",
    ];
    Object.keys(formData).forEach((field) => {
      if (!excludedFields.includes(field)) {
        const error = validationFunctions[field](formData[field]);
        if (error) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
          }));
          formErrorsExist = true;
        }
      }
    });

    const isLogoUploaded = await sendLogo();
    const isImagesUploaded = await sendRestaurantImages();
    if (
      isLogoUploaded === true &&
      isImagesUploaded === true &&
      formErrorsExist === false
    ) {
      console.log("here");
      setSuccess(true);
    } else {
      alert("There are errors cannot proceed furture ");
      setSuccess(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      console.log("here 2");
      console.log(formData);
      dispatch(addData({ resInfo: formData }));
      setLoading(false);
      router.push("/list");
    } else {
      setLoading(false);
    }
  }, [success]); // Depend on isError state changes

  // console.log(adminRestaurantInfo);
  return (
    <MainCard>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Minimum Order Price"
              value={formData.minimumOrderPrice}
              onChange={(e) =>
                handleChange("minimumOrderPrice", e.target.value)
              }
              error={!!formErrors.minimumOrderPrice}
              helperText={formErrors.minimumOrderPrice}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Delivery Fee"
              value={formData.deliveryFee}
              onChange={(e) => handleChange("deliveryFee", e.target.value)}
              error={!!formErrors.deliveryFee}
              helperText={formErrors.deliveryFee}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Average Delivery Time"
              value={formData.avgDeliveryTime}
              onChange={(e) => handleChange("avgDeliveryTime", e.target.value)}
              error={!!formErrors.avgDeliveryTime}
              helperText={formErrors.avgDeliveryTime}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Site URL"
              value={formData.siteUrl}
              onChange={(e) => handleChange("siteUrl", e.target.value)}
              error={!!formErrors.siteUrl}
              helperText={formErrors.siteUrl}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Restaurant URL"
              value={formData.restaurantUrl}
              onChange={(e) => handleChange("restaurantUrl", e.target.value)}
              error={!!formErrors.restaurantUrl}
              helperText={formErrors.restaurantUrl}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Facebook Like Link"
              value={formData.facebookLikeLink}
              onChange={(e) => handleChange("facebookLikeLink", e.target.value)}
              error={!!formErrors.facebookLikeLink}
              helperText={formErrors.facebookLikeLink}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Google Bussiness Profile Link"
              value={formData.gbpLink}
              onChange={(e) => handleChange("gbpLink", e.target.value)}
              error={!!formErrors.gbpLink}
              helperText={formErrors.gbpLink}
            />
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "2rem" }}>
          <div>
            <Grid item xs={12} md={12} lg={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Payment Options*
                </Typography>
                <Typography variant="h6" sx={{}}>
                  Select multiple Options (Recommended)
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ marginTop: "1rem" }}>
              <FormControl
                sx={{ width: "100%" }}
                error={!!formErrors.paymentOptions}
              >
                <InputLabel id="demo-multiple-chip-label">
                  Select Payment Options
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={formData.paymentOptions.map((data) => data.type)}
                  onChange={handleSelectPaymentOptions}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Payment Options"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value + 1} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  <MenuItem
                    value={"UPI"}
                    style={getStyles("UPI", formData.paymentOptions, theme)}
                  >
                    UPI
                  </MenuItem>
                  <MenuItem
                    value={"CARDS"}
                    style={getStyles("CARDS", formData.paymentOptions, theme)}
                  >
                    CARDS
                  </MenuItem>
                  <MenuItem
                    value={"CASH"}
                    style={getStyles("CASH", formData.paymentOptions, theme)}
                  >
                    CASH
                  </MenuItem>
                </Select>
                {formErrors.paymentOptions ? (
                  <FormHelperText>{formErrors.paymentOptions}</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  margin: "1rem 1rem 0 0",
                }}
              >
                Restaurant Coupons
              </Typography>
              <Typography variant="h6">(You Can Add Max 2 Coupons)</Typography>
            </div>

            {formData.restaurantDiscount.map((coupon, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{ marginTop: "0.5rem" }}
              >
                <Grid item xs={12} md={4} lg={4}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    label="Coupon Name"
                    value={coupon.name}
                    onChange={(e) =>
                      handleCouponChange("name", e.target.value, index)
                    }
                    error={!!formErrors[`couponName${index + 1}`]}
                    helperText={formErrors[`couponName${index + 1}`]}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl
                    fullWidth
                    error={!!formErrors[`couponType${index + 1}`]}
                  >
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      Type of coupon
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={coupon.type.value}
                      label="Type of coupon"
                      onChange={(e) =>
                        handleCouponChange("type", e.target.value, index)
                      }
                    >
                      <MenuItem value={""}>None</MenuItem>
                      <MenuItem value={"Percent"}>Percentage Discount</MenuItem>
                      <MenuItem value={"Price"}>Price Discount</MenuItem>
                    </Select>
                    {formErrors[`couponType${index + 1}`] ? (
                      <FormHelperText>
                        {formErrors[`couponType${index + 1}`]}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    label="Amount"
                    value={coupon.quantity}
                    onChange={(e) =>
                      handleCouponChange("quantity", e.target.value, index)
                    }
                    error={!!formErrors[`couponAmount${index + 1}`]}
                    helperText={formErrors[`couponAmount${index + 1}`]}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6} lg={3}>
            <div style={{ marginRight: "3rem" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                }}
              >
                Upload Restaurant Logo*
              </Typography>

              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  letterSpacing: "1px",
                }}
                size="small"
              >
                Upload file
                <VisuallyHiddenInput
                  ref={uploadLogoInputRef}
                  type="file"
                  id="fileupload"
                  onChange={restaurantLogoUpload}
                />
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className="fileupload-view">
              {uploadedLogo ? (
                <div style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                    key={formData.logo}
                  >
                    <div
                      style={{
                        width: "130px",
                        height: "85px",
                        backgroundSize: "cover",
                        borderRadius: "5px",
                        marginRight: "15px",
                        backgroundColor: "#eaecf1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "30px",
                        color: "#475f7b",
                        padding: "3px",
                      }}
                    >
                      {" "}
                      <img
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          borderRadius: "4px",
                        }}
                        src={formData.logo}
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        width: "calc(100% - 210px)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          msFlexWrap: "wrap",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            fontSize: "12px",
                            color: "#8194aa",
                            lineHeight: "20px",
                            fontWeight: 400,
                            marginBottom: 0,
                            padding: 0,
                            backgroundColor: "transparent",
                            border: "none",
                            textDecoration: "underline",
                            marginRight: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              logo: "",
                            }));
                            setUploadedLogo(false);
                          }}
                        >
                          Delete
                        </button>
                        <a
                          href={formData.logo}
                          style={{
                            fontSize: "12px",
                            color: "#8194aa",
                            lineHeight: "20px",
                            fontWeight: 400,
                            marginBottom: 0,
                            padding: 0,
                            backgroundColor: "transparent",
                            border: "none",
                            textDecoration: "underline",
                            marginRight: "15px",
                            cursor: "pointer",
                          }}
                          target="_blank"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textDecoration: "none" }}>
                  {selectedRestaurantLogo && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                        key={selectedRestaurantLogo.id}
                      >
                        {selectedRestaurantLogo.filename.match(
                          /.(jpg|jpeg|png|gif|svg)$/i
                        ) ? (
                          <div
                            style={{
                              width: "130px",
                              height: "85px",
                              backgroundSize: "cover",
                              borderRadius: "5px",
                              marginRight: "15px",
                              backgroundColor: "#eaecf1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "30px",
                              color: "#475f7b",
                              padding: "3px",
                            }}
                          >
                            {" "}
                            <img
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                borderRadius: "4px",
                              }}
                              src={selectedRestaurantLogo.fileimage}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "130px",
                              height: "85px",
                              backgroundSize: "cover",
                              borderRadius: "5px",
                              marginRight: "15px",
                              backgroundColor: "#eaecf1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "30px",
                              color: "#475f7b",
                              padding: "3px",
                            }}
                          >
                            <i className="far fa-file-alt"></i>
                          </div>
                        )}
                        <div
                          style={{
                            flex: 1,
                            width: "calc(100% - 210px)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{
                              wordBreak: "break-all",
                              fontWeight: 500,
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}
                          >
                            {selectedRestaurantLogo.filename}
                          </Typography>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#8194aa",
                              lineHeight: "initial",
                              fontWeight: 400,
                              marginBottom: "8px",
                            }}
                          >
                            <span>
                              Size : {selectedRestaurantLogo.filesize}
                            </span>
                          </p>
                          <div
                            style={{
                              display: "flex",
                              msFlexWrap: "wrap",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                fontSize: "12px",
                                color: "#8194aa",
                                lineHeight: "20px",
                                fontWeight: 400,
                                marginBottom: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                                border: "none",
                                textDecoration: "underline",
                                marginRight: "15px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                deleteRestaurantLogo(selectedRestaurantLogo.id)
                              }
                            >
                              Delete
                            </button>
                            <a
                              href={selectedRestaurantLogo.fileimage}
                              style={{
                                fontSize: "12px",
                                color: "#8194aa",
                                lineHeight: "20px",
                                fontWeight: 400,
                                marginBottom: 0,
                                padding: 0,
                                backgroundColor: "transparent",
                                border: "none",
                                textDecoration: "underline",
                                marginRight: "15px",
                                cursor: "pointer",
                              }}
                              download={selectedRestaurantLogo.filename}
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Restaurant Images*
                </Typography>
                <Typography variant="h6">
                  Select multiple Options (Recommended)
                </Typography>
              </div>
              <div className="fileupload-view">
                <div
                  style={{
                    width: "100%",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px dashed #b6bed1",
                        backgroundColor: "#f0f2f7",
                        borderRadius: "4px",
                        minHeight: "100px",
                        position: "relative",
                        overflow: "hidden",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#8194aa",
                        fontWeight: 400,
                        fontSize: "15px",
                      }}
                    >
                      <input
                        ref={uploadRestaurantImageInputRef}
                        type="file"
                        id="fileupload"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          opacity: 0,
                          cursor: "pointer",
                        }}
                        onChange={restaurantImgUpload}
                        multiple
                      />
                      <span>
                        Drag and drop or{" "}
                        <span
                          style={{
                            color: "#475f7b",
                            textDecoration: "underline",
                            marginLeft: "3px",
                          }}
                        >
                          Choose your files
                        </span>
                      </span>
                    </div>
                  </div>
                  {uploadedImg ? (
                    <div style={{ textDecoration: "none" }}>
                      <div>
                        <Grid container spacing={2}>
                          {formData.restaurantImages.map((data, index) => {
                            return (
                              <Grid item xs={12} md={4} lg={4}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "15px",
                                  }}
                                  key={index}
                                >
                                  <div
                                    style={{
                                      width: "130px",
                                      height: "85px",
                                      backgroundSize: "cover",
                                      borderRadius: "5px",
                                      marginRight: "15px",
                                      backgroundColor: "#eaecf1",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "30px",
                                      color: "#475f7b",
                                      padding: "3px",
                                    }}
                                  >
                                    {" "}
                                    <img
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        borderRadius: "4px",
                                      }}
                                      src={data}
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    style={{
                                      flex: 1,
                                      width: "calc(100% - 210px)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        msFlexWrap: "wrap",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                      }}
                                    >
                                      <button
                                        style={{
                                          fontSize: "12px",
                                          color: "#8194aa",
                                          lineHeight: "20px",
                                          fontWeight: 400,
                                          marginBottom: 0,
                                          padding: 0,
                                          backgroundColor: "transparent",
                                          border: "none",
                                          textDecoration: "underline",
                                          marginRight: "15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          const updatedImages = [
                                            ...formData.restaurantImages,
                                          ];
                                          updatedImages.splice(index, 1);
                                          setFormData((prev) => ({
                                            ...prev,
                                            restaurantImages: updatedImages,
                                          }));
                                          if (
                                            formData.restaurantImages.length ===
                                            1
                                          ) {
                                            setUploadedImg(false);
                                          }
                                        }}
                                      >
                                        Delete
                                      </button>
                                      <a
                                        href={data}
                                        style={{
                                          fontSize: "12px",
                                          color: "#8194aa",
                                          lineHeight: "20px",
                                          fontWeight: 400,
                                          marginBottom: 0,
                                          padding: 0,
                                          backgroundColor: "transparent",
                                          border: "none",
                                          textDecoration: "underline",
                                          marginRight: "15px",
                                          cursor: "pointer",
                                        }}
                                        target="_blank"
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div style={{ textDecoration: "none" }}>
                    <div>
                      {selectedRestaurantImg.length > 0 ? (
                        <div>
                          <Grid container spacing={2}>
                            {selectedRestaurantImg.map((data, index) => {
                              const {
                                id,
                                filename,
                                filetype,
                                fileimage,
                                datetime,
                                filesize,
                              } = data;
                              return (
                                <Grid item xs={12} md={4} lg={4}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "15px",
                                    }}
                                    key={index}
                                  >
                                    {filename.match(
                                      /.(jpg|jpeg|png|gif|svg)$/i
                                    ) ? (
                                      <div
                                        style={{
                                          width: "130px",
                                          height: "85px",
                                          backgroundSize: "cover",
                                          borderRadius: "5px",
                                          marginRight: "15px",
                                          backgroundColor: "#eaecf1",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: "30px",
                                          color: "#475f7b",
                                          padding: "3px",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            borderRadius: "4px",
                                          }}
                                          src={fileimage}
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          width: "130px",
                                          height: "85px",
                                          backgroundSize: "cover",
                                          borderRadius: "5px",
                                          marginRight: "15px",
                                          backgroundColor: "#eaecf1",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: "30px",
                                          color: "#475f7b",
                                          padding: "3px",
                                        }}
                                      >
                                        <i className="far fa-file-alt"></i>
                                      </div>
                                    )}
                                    <div
                                      style={{
                                        flex: 1,
                                        width: "calc(100% - 210px)",
                                      }}
                                    >
                                      <Typography
                                        variant="h6"
                                        style={{
                                          wordBreak: "break-all",
                                          fontWeight: 500,
                                          lineHeight: "20px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        {filename}
                                      </Typography>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          color: "#8194aa",
                                          lineHeight: "initial",
                                          fontWeight: 400,
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <span>Size : {filesize}</span>
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          msFlexWrap: "wrap",
                                          flexWrap: "wrap",
                                          alignItems: "center",
                                        }}
                                      >
                                        <button
                                          style={{
                                            fontSize: "12px",
                                            color: "#8194aa",
                                            lineHeight: "20px",
                                            fontWeight: 400,
                                            marginBottom: 0,
                                            padding: 0,
                                            backgroundColor: "transparent",
                                            border: "none",
                                            textDecoration: "underline",
                                            marginRight: "15px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            deleteRestaurantImg(id)
                                          }
                                        >
                                          Delete
                                        </button>
                                        <a
                                          href={fileimage}
                                          style={{
                                            fontSize: "12px",
                                            color: "#8194aa",
                                            lineHeight: "20px",
                                            fontWeight: 400,
                                            marginBottom: 0,
                                            padding: 0,
                                            backgroundColor: "transparent",
                                            border: "none",
                                            textDecoration: "underline",
                                            marginRight: "15px",
                                            cursor: "pointer",
                                          }}
                                          download={filename}
                                        >
                                          Download
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <hr style={{ margin: "1rem 0" }} />
        <Grid container spacing={2} sx={{ margin: "2rem 0" }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ textAlign: "right", paddingRight: "16px" }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<CheckCircleIcon />}
              sx={{
                lineHeight: 0,
                letterSpacing: "1px",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "grey" },
              }}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    </MainCard>
  );
}
