"use client";
import MainCard from "../../components/MainCard";
import { React, useState, useRef, useEffect } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Button,
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
  ListSubheader,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../features/firebaseSlice";
import { addData } from "../../features/adminRestaurantInfoSlice";
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../DB/firebase";
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

function getStyles(data, amenities, theme) {
  return {
    fontWeight:
      amenities.indexOf(data) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// ==============================|| SAMPLE PAGE ||============================== //

export default function HotelInfo() {
  const theme = useTheme();
  const router = useRouter();
  const uploadRestaurantImageInputRef = useRef(null);
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [panCardNo, setPanCardNo] = useState("");
  const [gst, setGst] = useState("");
  const [totalRoomsInHotel, setTotalRoomsInHotel] = useState("");
  const [totalRoomsInHotelError, setTotalRoomsInHotelError] = useState("");
  const [hotelNameError, setHotelNameError] = useState("");
  const [hotelAddressError, setHotelAddressError] = useState("");
  const [panCardNoError, setPanCardNoError] = useState("");
  const [gstError, setGstError] = useState("");
  const [selectedRestaurantImg, setSelectedRestaurantImg] = useState([]);
  const [FDRestaurantImg, setFDRestaurantImg] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);

  const [formData, setFormData] = useState({
    rooms: [
      {
        roomName: "",
        roomDescription: "",
        totalRooms: "",
        price: "",
        amenities: [],
        roomImages: [],
      },
    ],
  });
  const [formErrors, setFormErrors] = useState({
    rooms: [
      {
        roomName: "",
        roomDescription: "",
        totalRooms: "",
        price: "",
        amenities: "",
        roomImages: "",
      },
    ],
  });

  const addMoreRooms = () => {
    if (validateAllFields()) {
      setFormData((prev) => ({
        ...prev,
        rooms: [
          ...prev.rooms,
          {
            roomName: "",
            roomDescription: "",
            totalRooms: "",
            price: "",
            amenities: [],
            roomImages: [],
          },
        ],
      }));

      setFormErrors((prev) => ({
        ...prev,
        rooms: [
          ...prev.rooms,
          {
            roomName: "",
            roomDescription: "",
            totalRooms: "",
            price: "",
            amenities: "",
            roomImages: "",
          },
        ],
      }));

      setCancelButton(true);
    } else {
      console.log("Please correct the errors before adding a new room.");
    }
  };

  const cancelLastRoom = () => {
    setFormData((prev) => {
      // Remove the last room from formData
      const updatedRooms = prev.rooms.slice(0, -1);
      return { ...prev, rooms: updatedRooms };
    });

    setFormErrors((prev) => {
      // Remove the last room's errors from formErrors
      const updatedErrors = prev.rooms.slice(0, -1);
      return { ...prev, rooms: updatedErrors };
    });
    console.log(formData.rooms.length);

    if (formData.rooms.length <= 1) {
      setCancelButton(false);
    }
  };

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleChange = (field, value) => {
    const setFunctions = {
      hotelName: setHotelName,
      hotelAddress: setHotelAddress,
      totalRooms: setTotalRoomsInHotel,
      panCardNo: setPanCardNo,
      gst: setGst,
    };
    const setErrorFunctions = {
      hotelName: setHotelNameError,
      hotelAddress: setHotelAddressError,
      totalRooms: setTotalRoomsInHotelError,
      panCardNo: setPanCardNoError,
      gst: setGstError,
    };

    if (setFunctions[field]) {
      setFunctions[field](value);
      const error = validationFunctions[field](value);
      setErrorFunctions[field](error);
    }
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      rooms: updatedRooms,
    }));

    validateField(index, field, value);
  };

  const validationFunctions = {
    hotelName: (value) => (value.trim() === "" ? "Hotel name is required" : ""),
    hotelAddress: (value) =>
      value.trim() === "" ? "Hotel address  is required" : "",
    panCardNo: (value) =>
      value.trim() === "" ? "PAN Card Number is required" : "",
    gst: (value) => (value.trim() === "" ? "GST Number is required" : ""),
    totalRooms: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    price: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    roomName: (value) => (value.trim() === "" ? "Name is required" : ""),
    roomDescription: (value) =>
      value.trim() === "" ? "Room Description  is required" : "",
    totalRooms: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    amenities: (value) =>
      value.length === 0 ? "Payment Options cannot be empty" : "",
    roomImages: (value) => (value.length === 0 ? "Images cannot be empty" : ""),
  };

  const validateField = (index, field, value) => {
    // console.log(index, field, value);
    const error = validationFunctions[field](value);
    const updatedError = [...formErrors.rooms];
    updatedError[index][field] = error;
    // console.log(error);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      rooms: updatedError,
    }));
    return error;
  };

  const validateAllFields = () => {
    let allErrors = [];
    let hasErrors = false;

    // Validate hotel fields
    const hotelNameError = validationFunctions.hotelName(hotelName);
    const hotelAddressError = validationFunctions.hotelAddress(hotelAddress);
    const totalRoomsInHotelError =
      validationFunctions.totalRooms(totalRoomsInHotel);

    setHotelNameError(hotelNameError);
    setHotelAddressError(hotelAddressError);
    setTotalRoomsInHotelError(totalRoomsInHotelError);

    if (hotelNameError || hotelAddressError || totalRoomsInHotelError) {
      hasErrors = true;
    }

    formData.rooms.forEach((room, index) => {
      let roomErrors = {};
      Object.keys(room).forEach((field) => {
        const error = validateField(index, field, room[field]);

        if (error) {
          roomErrors[field] = error;
        }
      });
      allErrors[index] = roomErrors;
    });

    if (
      allErrors.some((roomErrors) =>
        Object.values(roomErrors).some((error) => error)
      )
    ) {
      hasErrors = true;
    }

    return !hasErrors;
  };
  const handleSelectPaymentOptions = (event, roomIndex) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedRooms = [...prevFormData.rooms];
      const currentOptions = updatedRooms[roomIndex].amenities;

      updatedRooms[roomIndex].amenities = Array.isArray(value)
        ? value.map((option) => ({ type: option }))
        : currentOptions.some((option) => option.type === value)
        ? currentOptions.filter((option) => option.type !== value)
        : [...currentOptions, { type: value }];

      return {
        ...prevFormData,
        rooms: updatedRooms,
      };
    });
    validateField(roomIndex, "amenities", value);
  };
  const restaurantImgUpload = (e, roomIndex) => {
    let images = [];
    let totalUploadedFiles = 0;

    const files = e;
    const roomImages = formData.rooms[roomIndex].roomImages;

    if (files.length + roomImages.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (totalUploadedFiles >= 5) {
        alert("You can upload a maximum of 5 images.");
        break;
      }

      let file = files[i];

      if (file.size > 2 * 1024 * 1024) {
        alert(
          `File ${file.name} exceeds the 2MB size limit and will not be uploaded.`
        );
        continue;
      }

      images.push(file);

      let reader = new FileReader();

      reader.onloadend = () => {
        const newImage = {
          id: v4(),
          filename: file.name,
          filetype: file.type,
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        };

        setFormData((prev) => {
          const updatedRooms = [...prev.rooms];
          updatedRooms[roomIndex].roomImages.push(newImage);
          return {
            ...prev,
            rooms: updatedRooms,
          };
        });
      };

      reader.readAsDataURL(file);
    }
    validateField(roomIndex, "roomImages", images);
  };

  const deleteRestaurantImg = async (id, roomIndex) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      setFormData((prev) => {
        const updatedRooms = [...prev.rooms];
        const updatedImages = updatedRooms[roomIndex].roomImages.filter(
          (img) => img.id !== id
        );
        validateField(roomIndex, "roomImages", updatedImages);
        updatedRooms[roomIndex].roomImages = updatedImages;
        return {
          ...prev,
          rooms: updatedRooms,
        };
      });
      if (uploadRestaurantImageInputRef.current) {
        uploadRestaurantImageInputRef.current.value = "";
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

  const names = ["cars", "asdf", "ewrewf", "lkjhewr"];
  return (
    <MainCard>
      <div>
        <div
          style={{
            padding: "1rem 1rem 1rem 1.5rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                required
                label="Hotel Name"
                value={hotelName}
                onChange={(e) => handleChange("hotelName", e.target.value)}
                error={!!hotelNameError}
                helperText={hotelNameError}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                required
                label="Hotel Address"
                value={hotelAddress}
                onChange={(e) => handleChange("hotelAddress", e.target.value)}
                error={!!hotelAddressError}
                helperText={hotelAddressError}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                required
                label="PAN Card Number"
                value={panCardNo}
                onChange={(e) => handleChange("panCardNo", e.target.value)}
                error={!!panCardNoError}
                helperText={panCardNoError}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                required
                label="GST Number"
                value={gst}
                onChange={(e) => handleChange("gst", e.target.value)}
                error={!!gstError}
                helperText={gstError}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                required
                label="Total Room In Hotel"
                value={totalRoomsInHotel}
                onChange={(e) => handleChange("totalRooms", e.target.value)}
                error={!!totalRoomsInHotelError}
                helperText={totalRoomsInHotelError}
              />
            </Grid>
          </Grid>

          <div>
            {formData.rooms.map((room, index) => (
              <div key={index}>
                <Typography
                  variant="h6"
                  sx={{ margin: "2rem 0 1rem 0", fontWeight: "500" }}
                >
                  Room Details {index + 1} *
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      required
                      label={`Room Name ${index + 1}`}
                      value={room.roomName}
                      onChange={(e) =>
                        handleRoomChange(index, "roomName", e.target.value)
                      }
                      error={!!formErrors.rooms[index].roomName}
                      helperText={formErrors.rooms[index].roomName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      required
                      label={`Room Description ${index + 1}`}
                      value={room.roomDescription}
                      onChange={(e) =>
                        handleRoomChange(
                          index,
                          "roomDescription",
                          e.target.value
                        )
                      }
                      error={!!formErrors.rooms[index].roomDescription}
                      helperText={formErrors.rooms[index].roomDescription}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      required
                      label={`Total Rooms in  ${index + 1}`}
                      value={room.totalRooms}
                      onChange={(e) =>
                        handleRoomChange(index, "totalRooms", e.target.value)
                      }
                      error={!!formErrors.rooms[index].totalRooms}
                      helperText={formErrors.rooms[index].totalRooms}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      required
                      label={`Price of one room`}
                      value={room.price}
                      onChange={(e) =>
                        handleRoomChange(index, "price", e.target.value)
                      }
                      error={!!formErrors.rooms[index].price}
                      helperText={formErrors.rooms[index].price}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3} lg={3}>
                        <div>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              fontWeight: "500",
                              marginTop: "8px",
                            }}
                          >
                            Select Amenities *
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                            }}
                          >
                            Select multiple Options (Recommended)
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={9} lg={9}>
                        <FormControl
                          sx={{ width: "100%" }}
                          error={!!formErrors.rooms[index].amenities}
                        >
                          <InputLabel id="demo-multiple-chip-label">
                            Select Payment Options
                          </InputLabel>
                          <Select
                            sx={{ padding: "0rem !important" }}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={formData.rooms[index].amenities.map(
                              (data) => data.type
                            )}
                            onChange={(e) =>
                              handleSelectPaymentOptions(e, index)
                            }
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Payment Options"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value + 1} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {names.map((data) => (
                              <MenuItem
                                key={data}
                                value={data}
                                style={getStyles(
                                  data,
                                  formData.rooms[index].amenities,
                                  theme
                                )}
                              >
                                {data}
                              </MenuItem>
                            ))}
                          </Select>
                          {formErrors.rooms[index].amenities ? (
                            <FormHelperText>
                              {formErrors.rooms[index].amenities}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "1.5rem" }}>
                  <Grid item xs={12} md={3} lg={3}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                          marginTop: "8px",
                        }}
                      >
                        Room Images *
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          fontFamily: '"DM Sans", sans-serif',
                        }}
                      >
                        Select multiple (Recommended)
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9} lg={9}>
                    <div className="fileupload-view" style={{ width: "100%" }}>
                      <div>
                        <Box
                          sx={{
                            padding: {
                              xs: "0px",
                              lg: "0",
                              md: "0",
                            },
                          }}
                        >
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
                                  border: formErrors.rooms[index].roomImages
                                    ? "1px solid #ff4d4f"
                                    : "1px dashed #b6bed1",
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
                                  onChange={(e) =>
                                    restaurantImgUpload(e.target.files, index)
                                  }
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
                              {formErrors.rooms[index].roomImages ? (
                                <FormHelperText
                                  sx={{
                                    color: "#ff4d4f",
                                    fontWeight: "400",
                                    fontSize: " 0.75rem",
                                    lineHeight: "1.66",
                                    fontFamily: "Public Sans, sans-serif",
                                    textAlign: "left",
                                    margin: "3px 14px 0 14px",
                                  }}
                                >
                                  {formErrors.rooms[index].roomImages}
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </div>
                            {uploadedImg ? (
                              <div style={{ textDecoration: "none" }}>
                                <div>
                                  {formData.rooms[index].roomImages.map(
                                    (data, Imgindex) => {
                                      return (
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "15px",
                                          }}
                                          key={Imgindex}
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
                                                display: "-ms-flexbox",
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
                                                  backgroundColor:
                                                    "transparent",
                                                  border: "none",
                                                  textDecoration: "underline",
                                                  marginRight: "15px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  const updatedImages = [
                                                    ...formData.restaurantImages,
                                                  ];
                                                  updatedImages.splice(
                                                    Imgindex,
                                                    1
                                                  );
                                                  setFormData((prev) => ({
                                                    ...prev,
                                                    restaurantImages:
                                                      updatedImages,
                                                  }));
                                                  if (
                                                    formData.restaurantImages
                                                      .length === 1
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
                                                  backgroundColor:
                                                    "transparent",
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
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            <div style={{ textDecoration: "none" }}>
                              <div>
                                {room.roomImages.length > 0 ? (
                                  <Grid container spacing={2}>
                                    {room.roomImages.map((data, ind) => {
                                      const {
                                        id,
                                        filename,
                                        filetype,
                                        fileimage,
                                        datetime,
                                        filesize,
                                      } = data;
                                      return (
                                        <Grid
                                          item
                                          lg={6}
                                          md={6}
                                          xs={12}
                                          key={ind}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              marginBottom: "15px",
                                            }}
                                            key={ind}
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
                                              <span
                                                style={{
                                                  wordBreak: "break-all",
                                                  fontSize: "13px",
                                                  fontWeight: 500,
                                                  lineHeight: "20px",
                                                  marginBottom: "8px",
                                                }}
                                              >
                                                {filename}
                                              </span>
                                              <p
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#8194aa",
                                                  lineHeight: "initial",
                                                  fontWeight: 400,
                                                  marginBottom: "8px",
                                                }}
                                              >
                                                <span>Size : {filesize}, </span>
                                              </p>
                                              <div
                                                style={{
                                                  display: "-ms-flexbox",
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
                                                    backgroundColor:
                                                      "transparent",
                                                    border: "none",
                                                    textDecoration: "underline",
                                                    marginRight: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteRestaurantImg(
                                                      id,
                                                      index
                                                    )
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
                                                    backgroundColor:
                                                      "transparent",
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
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <hr style={{ margin: "2rem 0" }} />
              </div>
            ))}
          </div>

          <Button
            variant="contained"
            onClick={addMoreRooms}
            size="small"
            sx={{ marginTop: "1rem", letterSpacing: "1px" }}
          >
            Add More
          </Button>
          <Button
            disabled={!cancelButton}
            variant="contained"
            onClick={cancelLastRoom}
            size="small"
            sx={{
              margin: "1rem 0 0 1rem",
              letterSpacing: "1px",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "#d93e3e" },
            }}
          >
            Cancel
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            padding: "0 1rem",
            marginBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "1px",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "grey" },
            }}
            endIcon={<SendRoundedIcon />}
            onClick={() => router.push("/service")}
          >
            Next
          </Button>
        </div>
      </div>
    </MainCard>
  );
}
