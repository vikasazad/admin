"use client";
// project import
import MainCard from "../../../../components/MainCard";
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
  InputAdornment,
  Popper,
  Paper,
  List,
  Fade,
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../../../features/firebaseSlice";
import { addData } from "../../../../features/adminRestaurantInfoSlice";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import dayjs from "dayjs";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../../DB/firebase";
import { v4 } from "uuid";

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

export default function ServiceInfo({ params }) {
  const theme = useTheme();
  console.log(params);
  const state = params.serviceName;
  console.log(state);
  const [optionsArr, setOptionsArr] = useState([]);
  const [firstSelect, setFirstSelect] = useState([]);
  const [firstSelectError, setFirstSelectError] = useState("");
  const [secondSelect, setSecondSelect] = useState([]);
  const [secondSelectList, setSecondSelectList] = useState([]);
  const [secondSelectError, setSecondSelectError] = useState("");
  const [detailInfoState, setDetailInfoState] = useState({});
  const [detailInfoErrorState, setDetailInfoErrorState] = useState({});
  const [secondSelectFlag, setSecondSelectFlag] = useState(false);
  const [detailFlag, setDetailFlag] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [airportList, setAirportList] = useState("");
  const [airportListError, setAirportListError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedTimeTaken, setSelectedTimeTaken] = useState({});
  const [selectedTimeTakenError, setSelectedTimeTakenError] = useState({});
  useEffect(() => {
    if (state === "LaundryandDryCleaning") {
      const laundryDryCleaning = {
        LaundryService: ["Washing & Drying"],
        DryCleaning: ["Professional dry cleaning"],
        PressingService: ["Ironing and pressing"],
        StainRemoval: ["Specialized stain treatment"],
        ShoeShineService: ["Shoe polishing"],
      };
      const list = Object.keys(laundryDryCleaning);
      setOptionsArr(list);
    }

    if (state === "PersonalShopping" || state === "Tours") {
      const index = 0;
      const infoState = {
        [index]: {
          "Name of Service": "",
          Description: "",
          "Key Benefits": "",
          Timeline: "",
          "Pricing per Person": "",
          "Cancellation Policy": "",
          Testimonials: "",
        },
      };
      setDetailInfoState(infoState);
      setDetailInfoErrorState(infoState);
    }
  }, []);
  const parseTime = (time) => {
    const [hours, minutes] = time.split(":");
    const meridian = time.split(" ")[1];
    let adjustedHours = parseInt(hours, 10);

    if (meridian === "PM" && adjustedHours !== 12) {
      adjustedHours += 12;
    } else if (meridian === "AM" && adjustedHours === 12) {
      adjustedHours = 0;
    }

    return adjustedHours * 60 + parseInt(minutes, 10);
  };
  const handleClick = (newPlacement) => (event) => {
    console.log(newPlacement);
    if (newPlacement === "close") {
      setOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    }
  };

  const laundry = {
    LaundryService: ["Washing & Drying"],
    DryCleaning: ["Professional dry cleaning"],
    PressingService: ["Ironing and pressing"],
    StainRemoval: ["Specialized stain treatment"],
    ShoeShineService: ["Shoe polishing"],
  };

  const wellness = {
    Massages: ["Swedish", "Deep tissue", "Hot stone", "Aromatherapy"],
    FacialTreatments: [
      "Customized facials",
      "Anti-aging treatments",
      "Specialized skin care",
    ],
    BodyTreatments: ["Body scrubs", "Wraps", "Exfoliating treatments"],
    Hydrotherapy: ["Hot tubs", "Whirlpools", "Hydrotherapy baths"],
    FitnessCenters: [
      "Cardio machines",
      "Free weights",
      "Strength training equipment",
    ],
    PersonalTraining: ["Personalized fitness sessions"],
    GroupClasses: ["Yoga", "Pilates", "Aerobics", "Spinning"],
    OutdoorActivities: ["Hikes", "Biking tours", "Outdoor fitness sessions"],
    DetoxPrograms: [
      "Specialized diets",
      "Detoxifying treatments",
      "Detox activities",
    ],
    WeightLossPrograms: [
      "Nutritional counseling",
      "Exercise plans",
      "Health monitoring",
    ],
    StressManagementPrograms: ["Meditation", "Mindfulness workshops"],
    HairAndNailSalons: ["Haircuts", "Styling", "Manicures", "Pedicures"],
    MakeupServices: ["Professional makeup application"],
    Acupuncture: ["Traditional Chinese medicine techniques"],
    Reiki: ["Energy healing treatments"],
    Ayurveda: ["Holistic treatments", "Traditional Indian medicine therapies"],
    HealthyDiningOptions: ["Organic ingredients", "Locally sourced meals"],
    DietaryConsultations: [
      "Meetings with nutritionists",
      "Personalized meal plans",
    ],
    JuiceBars: ["Fresh juices", "Smoothies", "Healthy beverages"],
    MeditationSessions: ["Guided meditation classes", "Mindfulness workshops"],
    RelaxationLounges: ["Comfortable seating", "Calming music", "Aromatherapy"],
    SleepPrograms: ["Pillow menus", "Sleep-inducing teas"],
    WellnessRetreats: [
      "Multi-day programs",
      "Workshops",
      "Activities",
      "Treatments",
    ],
    HealthAndWellnessSeminars: ["Educational sessions", "Wellness experts"],
    ChiropracticServices: ["Spinal adjustments", "Treatments"],
    PhysicalTherapy: ["Rehabilitation services", "Recovery treatments"],
    CraniosacralTherapy: ["Gentle bodywork"],
    SwimmingPools: [
      "Indoor pools",
      "Outdoor pools",
      "Lap pools",
      "Infinity pools",
    ],
    WaterAerobics: ["Fitness classes in the pool"],
    SaunasAndSteamRooms: ["Saunas", "Steam rooms"],
  };

  const wellnessHeadings = [
    "Massages",
    "FacialTreatments",
    "BodyTreatments",
    "Hydrotherapy",
    "FitnessCenters",
    "PersonalTraining",
    "GroupClasses",
    "OutdoorActivities",
    "DetoxPrograms",
    "WeightLossPrograms",
    "StressManagementPrograms",
    "HairAndNailSalons",
    "MakeupServices",
    "Acupuncture",
    "Reiki",
    "Ayurveda",
    "HealthyDiningOptions",
    "DietaryConsultations",
    "JuiceBars",
    "MeditationSessions",
    "RelaxationLounges",
    "SleepPrograms",
    "WellnessRetreats",
    "HealthAndWellnessSeminars",
    "ChiropracticServices",
    "PhysicalTherapy",
    "CraniosacralTherapy",
    "SwimmingPools",
    "WaterAerobics",
    "SaunasAndSteamRooms",
  ];

  const validationFunctions = {
    name: (value) => (value.trim() === "" ? "Name is required" : ""),
    description: (value) =>
      value.trim() === "" ? "Description  is required" : "",
    price: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },

    minPrice: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    "Name of Service": (value) =>
      value.trim() === "" ? "Name of Service is required" : "",
    Description: (value) =>
      value.trim() === "" ? "Description  is required" : "",
    "Key Benefits": (value) =>
      value.trim() === "" ? "Key Benefits  is required" : "",
    Timeline: (value) => (value.trim() === "" ? "Timeline  is required" : ""),
    "Pricing per Person": (value) =>
      value.trim() === "" ? "Pricing per Person  is required" : "",
    "Cancellation Policy": (value) =>
      value.trim() === "" ? "Cancellation Policy  is required" : "",
    startTime: (value) => (value.trim() === "" ? "Time is required" : ""),
    endTime: (value) => (value.trim() === "" ? "Time is required" : ""),
    digit: (value) => (value.trim() === "" ? "Time is required" : ""),
    time: (value) => (value.trim() === "" ? "Time is required" : ""),
  };

  const validateField = (key, property, value) => {
    // console.log(key, property, value);
    let error;
    if (property === "digit" || property === "time") {
      error = validationFunctions[property](value);
      property = "minTimeTaken";
    } else if (property === "Testimonials") {
      error = null;
    } else {
      error = validationFunctions[property](value);
    }
    setDetailInfoErrorState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [property]: error,
      },
    }));
    return error;
  };

  const handleFirstSelect = (event) => {
    const { value } = event.target;
    if (value) {
      const treatmentsArr = value.flatMap((key) => {
        if (wellness.hasOwnProperty(key)) {
          //had to change it to wellness or make it dynamic
          return wellness[key];
        }
        return [];
      });
      setSecondSelectList(treatmentsArr);
      setFirstSelect(value);
      setSecondSelectFlag(false);
      setDetailFlag(false);
      setSubmitFlag(false);
      setFirstSelectError("");
    }
  };
  const handleSecondSelect = (event) => {
    const { value } = event.target;
    if (value) {
      // const treatmentsArr = value.flatMap((key) => {
      //   if (wellness.hasOwnProperty(key)) {
      //     return wellness[key];
      //   }
      //   return [];
      // });
      // setSecondSelectList(treatmentsArr);
      setSecondSelect(value);
      if (state === "Wellness" || state === "Recreational") {
        const initialInfoState = value.reduce((acc, data) => {
          acc[data] = {
            name: "",
            description: "",
            price: "",
            startTime: dayjs().format("hh:mm A"),
            endTime: dayjs().format("hh:mm A"),
          };
          return acc;
        }, {});
        const timeState = value.reduce((acc, data) => {
          acc[data] = {
            startTime: dayjs(),
            endTime: dayjs(),
          };
          return acc;
        }, {});
        const initialInfoErrorState = value.reduce((acc, data) => {
          acc[data] = {
            name: "",
            description: "",
            price: "",
            startTime: "",
            endTime: "",
          };
          return acc;
        }, {});
        setDetailInfoState(initialInfoState);
        setSelectedTime(timeState);
        setDetailInfoErrorState(initialInfoErrorState);
      }
      if (state === "LaundryandDryCleaning") {
        const infoState = value.reduce((acc, data) => {
          acc[data] = {
            minPrice: "",
            minTimeTaken: "",
          };
          return acc;
        }, {});
        const timeTaken = value.reduce((acc, data) => {
          acc[data] = {
            digit: "",
            time: "",
          };
          return acc;
        }, {});
        setDetailInfoState(infoState);
        setDetailInfoErrorState(infoState);
        setSelectedTimeTaken(timeTaken);
        setSelectedTimeTakenError(timeTaken);
      }
      // console.log(infoState);
      setSecondSelectError("");
      setDetailFlag(false);
      setSubmitFlag(false);
    }
  };
  const handleTreatmentInfo = (key, property, value) => {
    if (property === "startTime" || property === "endTime") {
      setSelectedTime((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [property]: value,
        },
      }));
      value = value.format("hh:mm A");
      setDetailInfoState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [property]: value,
        },
      }));

      validateField(key, property, value);
    } else {
      setDetailInfoState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [property]: value,
        },
      }));

      validateField(key, property, value);
    }
  };
  const handlelaundry = (key, property, value) => {
    setDetailInfoState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [property]: value,
      },
    }));

    validateField(key, property, value);
  };

  const handleTourPackage = (key, field, value) => {
    setDetailInfoState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [field]: value,
      },
    }));

    validateField(key, field, value);
  };

  const handleAdd = () => {
    // Validate existing fields
    let isValid = true;
    Object.keys(detailInfoState).forEach((key) => {
      Object.keys(detailInfoState[key]).forEach((property) => {
        const value = detailInfoState[key][property];
        const error = validateField(key, property, value);
        if (error) {
          isValid = false;
        }
      });
    });

    if (!isValid) {
      // Handle invalid state, maybe show an error message
      return;
    }

    // Proceed to add new entry
    const newIndex = Object.keys(detailInfoState).length;
    const newDetail = {
      "Name of Service": "",
      Description: "",
      "Key Benefits": "",
      Timeline: "",
      "Pricing per Person": "",
      "Cancellation Policy": "",
      Testimonials: "",
    };

    setDetailInfoState((prevState) => ({
      ...prevState,
      [newIndex]: newDetail,
    }));

    setDetailInfoErrorState((prevState) => ({
      ...prevState,
      [newIndex]: newDetail,
    }));
  };

  const removeService = () => {
    const keys = Object.keys(detailInfoState);
    if (keys.length <= 1) {
      // If there is only one or zero items, do nothing
      return;
    }
    const lastIndex = keys[keys.length - 1];
    const shouldRemove = window.confirm(
      "Are you sure you want to remove the last detail?"
    );
    if (!shouldRemove) {
      return;
    }
    setDetailInfoState((prevState) => {
      const { [lastIndex]: _, ...newState } = prevState;
      return newState;
    });
    setDetailInfoErrorState((prevState) => {
      const { [lastIndex]: _, ...newState } = prevState;
      return newState;
    });
  };

  const wellnessNext = () => {
    if (secondSelectFlag) {
      if (firstSelect.length === 0) {
        setFirstSelectError("Wellness services cannot be empty");
        setSecondSelect([]);
        setSubmitFlag(false);
      } else {
        setFirstSelectError("");
      }
      if (secondSelect.length === 0) {
        setSecondSelectError("Wellness services cannot be empty");
        setSubmitFlag(false);
      } else {
        setSecondSelectError("");
      }
      if (firstSelect.length !== 0 && secondSelect.length !== 0) {
        setDetailFlag(true);
        setSubmitFlag(true);
      }
    } else {
      if (firstSelect.length === 0) {
        setFirstSelectError("Wellness services cannot be empty");
        setSubmitFlag(false);
      } else {
        setFirstSelectError("");
        setSecondSelectFlag(true);
      }
    }
  };
  const wellnessNRecreationSubmit = () => {
    const errors = {};
    let hasErrors = false;
    Object.keys(detailInfoState).forEach((key) => {
      errors[key] = {};
      Object.keys(detailInfoState[key]).forEach((property) => {
        const value = detailInfoState[key][property];
        let error = "";
        if (property === "startTime" || property === "endTime") {
          errors[key]["startTime"] = "";
          errors[key]["endTime"] = "";
          const startTime = detailInfoState[key]["startTime"];
          const endTime = detailInfoState[key]["endTime"];
          if (startTime && endTime) {
            const startTimeInMinutes = parseTime(startTime);
            const endTimeInMinutes = parseTime(endTime);
            if (startTimeInMinutes === endTimeInMinutes) {
              errors[key]["startTime"] =
                "Start time and end time cannot be the same";
              errors[key]["endTime"] =
                "Start time and end time cannot be the same";
              hasErrors = true;
            } else if (endTimeInMinutes < startTimeInMinutes) {
              errors[key]["endTime"] =
                "End time cannot be smaller than start time";
              hasErrors = true;
            }
          }
        } else {
          error = validationFunctions[property](value);
          errors[key][property] = error;
        }
        if (errors[key][property]) {
          hasErrors = true;
        }
      });
    });
    setDetailInfoErrorState(errors);
    if (!hasErrors) {
      console.log("Form submitted successfully:", detailInfoState);
    } else {
      console.log("Form contains errors:", errors);
    }
  };
  const validateAirportList = () => {
    // Trim any leading or trailing whitespace
    const data = airportList.trim();

    // Check if the input is empty
    if (!data) {
      setAirportListError("Airport List cannot be empty");
      return false;
    }

    // Split the data by commas
    const airportsArray = data.split(",").map((airport) => airport.trim());

    // Check if any item in the array is empty (which means there was an extra comma)
    if (airportsArray.some((airport) => !airport)) {
      setAirportListError("Make sure that airports are seperated by , ");
      return false; // Invalid input
    }
    setAirportListError("");
    return true;
  };
  const handleTimeTaken = (key, property, event) => {
    const { value } = event.target;
    setSelectedTimeTaken((prevState) => {
      const updatedState = {
        ...prevState,
        [key]: {
          ...prevState[key],
          [property]: value,
        },
      };
      // Validation logic
      const digit = updatedState[key].digit;
      const time = updatedState[key].time;
      const errors = {
        digit: digit === "" && time !== "",
        time: time === "" && digit !== "",
      };

      setSelectedTimeTakenError((prevErrorState) => ({
        ...prevErrorState,
        [key]: errors,
      }));
      setDetailInfoErrorState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          minTimeTaken: errors.digit || errors.time ? "Time is required" : "",
        },
      }));

      return updatedState;
    });
  };

  const transportationNext = () => {
    if (firstSelect.length === 0) {
      setFirstSelectError("Transportation services cannot be empty");
    } else {
      setDetailFlag(true);
      setSubmitFlag(true);
      setFirstSelectError("");
    }
  };
  const transportationSubmit = () => {
    const validateList = validateAirportList();
    if (validateList) {
      console.log("asldkjflaksdh");
    }
  };

  const laundryDryCleaningSubmit = () => {
    const errors = {};
    let hasErrors = false;

    Object.keys(detailInfoState).forEach((key) => {
      errors[key] = {};

      Object.keys(detailInfoState[key]).forEach((property) => {
        const value = detailInfoState[key][property];
        let error = "";

        if (property === "minTimeTaken") {
          const digit = selectedTimeTaken[key].digit;
          const time = selectedTimeTaken[key].time;
          const timeErrors = {
            digit: digit === "" && time !== "",
            time: time === "" && digit !== "",
          };

          if (digit === "" && time === "") {
            timeErrors.digit = true;
            timeErrors.time = true;
          }

          if (timeErrors.digit || timeErrors.time) {
            setSelectedTimeTakenError((prevErrorState) => ({
              ...prevErrorState,
              [key]: timeErrors,
            }));

            errors[key][property] = "Time is required";
            hasErrors = true;
          } else {
            setDetailInfoState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                minTimeTaken: `${digit} ${time}`,
              },
            }));
          }
        } else {
          error = validationFunctions[property](value);
          errors[key][property] = error;

          if (error) {
            hasErrors = true;
          }
        }
      });
    });

    setDetailInfoErrorState(errors);

    if (!hasErrors) {
      console.log("Form submitted successfully:", detailInfoState);
    } else {
      console.log("Form contains errors:", errors);
    }
  };

  const handleTourPackageSubmit = () => {
    let isValid = true;
    Object.keys(detailInfoState).forEach((key) => {
      Object.keys(detailInfoState[key]).forEach((property) => {
        const value = detailInfoState[key][property];
        const error = validateField(key, property, value);
        if (error) {
          isValid = false;
        }
      });
    });

    if (!isValid) {
      // Handle invalid state, maybe show an error message
      return;
    }

    console.log("alksdjfalskdfj");
  };
  const handleNext = () => {
    if (
      state === "Wellness" ||
      state === "Recreational" ||
      state === "LaundryandDryCleaning"
    )
      wellnessNext();
    if (state === "Transportation") transportationNext();
  };
  const handleSubmit = () => {
    if (state === "Wellness" || state === "Recreational")
      wellnessNRecreationSubmit();
    if (state === "Transportation") transportationSubmit();
    if (state === "LaundryandDryCleaning") laundryDryCleaningSubmit();
    if (state === "PersonalShopping" || state === "Tours")
      handleTourPackageSubmit();
  };

  return (
    <MainCard title={state}>
      <div>
        {state === "Wellness" || state === "Recreational" ? (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <FormControl sx={{ width: "100%" }} error={!!firstSelectError}>
                  <InputLabel id="demo-multiple-chip-label">
                    Select {state} Services
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={firstSelect.map((data) => data)}
                    onChange={(e) => handleFirstSelect(e)}
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
                    {wellnessHeadings.map((data) => (
                      <MenuItem
                        key={data}
                        value={data}
                        style={getStyles(data, firstSelect, theme)}
                      >
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                  {firstSelectError ? (
                    <FormHelperText>{firstSelectError}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
              {secondSelectFlag ? (
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    variant="h6"
                    sx={{ margin: "1rem 0", fontWeight: "500" }}
                  >
                    Please select the facilities
                  </Typography>
                  <FormControl
                    sx={{ width: "100%" }}
                    error={!!secondSelectError}
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      Select facilities under above services
                    </InputLabel>
                    <Select
                      sx={{ padding: "0rem !important" }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={secondSelect.map((data) => data)}
                      onChange={(e) => handleSecondSelect(e)}
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
                      {secondSelectList.map((data) => (
                        <MenuItem
                          key={data}
                          value={data}
                          style={getStyles(data, secondSelect, theme)}
                        >
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                    {secondSelectError ? (
                      <FormHelperText>{secondSelectError}</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}
              {detailFlag ? (
                <Grid item xs={12} md={12} lg={12} sx={{ marginTop: "2rem 0" }}>
                  {secondSelect.map((data, index) => (
                    <div key={index}>
                      <Typography
                        variant="h6"
                        sx={{ margin: "1rem 0", fontWeight: 500 }}
                      >
                        {data}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            sx={{ width: "100%" }}
                            required
                            label={`Name of ${data}`}
                            value={detailInfoState[data].name}
                            onChange={(e) =>
                              handleTreatmentInfo(data, "name", e.target.value)
                            }
                            error={!!detailInfoErrorState[data].name}
                            helperText={detailInfoErrorState[data].name}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            sx={{ width: "100%" }}
                            required
                            label={`Description of ${data}`}
                            value={detailInfoState[data].Description}
                            onChange={(e) =>
                              handleTreatmentInfo(
                                data,
                                "description",
                                e.target.value
                              )
                            }
                            error={!!detailInfoErrorState[data].description}
                            helperText={detailInfoErrorState[data].description}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            sx={{ width: "100%" }}
                            required
                            label={`Price of ${data}`}
                            value={detailInfoState[data].Price}
                            onChange={(e) =>
                              handleTreatmentInfo(data, "price", e.target.value)
                            }
                            error={!!detailInfoErrorState[data].price}
                            helperText={detailInfoErrorState[data].price}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <Typography variant="h6" sx={{ fontWeight: "500" }}>
                            Please choose availability timings
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              margin: "1rem 0",
                            }}
                          >
                            <TimePicker
                              sx={{ width: "100%" }}
                              value={dayjs(selectedTime[data].startTime)}
                              onChange={(time) =>
                                handleTreatmentInfo(data, "startTime", time)
                              }
                              slotProps={{
                                textField: {
                                  error: !!detailInfoErrorState[data].startTime,
                                  helperText:
                                    detailInfoErrorState[data].startTime,
                                },
                              }}
                            />

                            <Typography
                              variant="subtitle"
                              sx={{ margin: "0 1rem" }}
                            >
                              to
                            </Typography>
                            <TimePicker
                              sx={{ width: "100%" }}
                              value={dayjs(selectedTime[data].endTime)}
                              onChange={(time) =>
                                handleTreatmentInfo(data, "endTime", time)
                              }
                              slotProps={{
                                textField: {
                                  error: !!detailInfoErrorState[data].endTime,
                                  helperText:
                                    detailInfoErrorState[data].endTime,
                                },
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <hr style={{ margin: "2rem 0" }} />
                    </div>
                  ))}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </div>
        ) : (
          ""
        )}
        {state === "Transportation" ? (
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl
                sx={{ width: "100%", mb: 1 }}
                error={!!firstSelectError}
              >
                <InputLabel id="demo-multiple-chip-label">
                  Select {state} Services
                </InputLabel>
                <Select
                  sx={{ padding: "0rem !important" }}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={firstSelect.map((data) => data)}
                  onChange={(e) => {
                    setFirstSelect(e.target.value);
                    setDetailFlag(false);
                    setSubmitFlag(false);
                  }}
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
                  <MenuItem
                    value={"AirportShuttle"}
                    style={getStyles("AirportShuttle", firstSelect, theme)}
                  >
                    AirportShuttle - To and from airport
                  </MenuItem>
                  <MenuItem
                    value={"ShuttleService"}
                    style={getStyles("ShuttleService", firstSelect, theme)}
                  >
                    ShuttleService - Within local area or attractions
                  </MenuItem>
                </Select>
                {firstSelectError ? (
                  <FormHelperText>{firstSelectError}</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>

            {detailFlag ? (
              <div style={{ width: "100%" }}>
                {firstSelect.includes("AirportShuttle") ? (
                  <Grid item xs={12} md={12} lg={12} sx={{ margin: "2rem 0" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, margin: "1rem 0 0 0" }}
                    >
                      Enter list of airports for airport shuttle
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="Please enter list of airports seperated by ','. For Example LXY,NDL,MBY"
                      multiline
                      rows={4}
                      fullWidth
                      onChange={(e) => setAirportList(e.target.value)}
                      error={!!airportListError}
                      helperText={airportListError}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          ""
        )}
        {state === "LaundryandDryCleaning" ? (
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl sx={{ width: "100%" }} error={!!firstSelectError}>
                <InputLabel id="demo-multiple-chip-label">
                  Select {state} Services
                </InputLabel>
                <Select
                  sx={{ padding: "0rem !important" }}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={firstSelect.map((data) => data)}
                  onChange={(e) => handleFirstSelect(e)}
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
                  {optionsArr.map((data) => (
                    <MenuItem
                      key={data}
                      value={data}
                      style={getStyles(data, firstSelect, theme)}
                    >
                      {data}
                    </MenuItem>
                  ))}
                </Select>
                {firstSelectError ? (
                  <FormHelperText>{firstSelectError}</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {secondSelectFlag ? (
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    variant="h6"
                    sx={{ margin: "1rem 0", fontWeight: 500 }}
                  >
                    Please select the facilities
                  </Typography>
                  <FormControl
                    sx={{ width: "100%" }}
                    error={!!secondSelectError}
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      Select facilities under above services
                    </InputLabel>
                    <Select
                      sx={{ padding: "0rem !important" }}
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={secondSelect.map((data) => data)}
                      onChange={(e) => handleSecondSelect(e)}
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
                      {secondSelectList.map((data) => (
                        <MenuItem
                          key={data}
                          value={data}
                          style={getStyles(data, secondSelect, theme)}
                        >
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                    {secondSelectError ? (
                      <FormHelperText>{secondSelectError}</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {detailFlag ? (
              <div style={{ width: "100%" }}>
                {secondSelect.map((data, index) => (
                  <div key={index} style={{ margin: "1rem 0" }}>
                    <Typography variant="h6" sx={{ fontWeight: "500" }}>
                      {data}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ margin: "1rem 0" }}
                      >
                        <TextField
                          id="outlined"
                          label={`Enter minimum price for ${data}`}
                          value={detailInfoState[data].minPrice}
                          fullWidth
                          onChange={(e) =>
                            handlelaundry(data, "minPrice", e.target.value)
                          }
                          error={!!detailInfoErrorState[data].minPrice}
                          helperText={detailInfoErrorState[data].minPrice}
                        />
                      </Grid>
                      {/*<Grid item xs={12} md={6} lg={6} sx={{ margin: '1rem 0' }}>
                        <TextField
                          id="outlined-multiline-static"
                          label={`Enter minimum time taken in ${data}`}
                          value={detailInfoState[data].minTimeTaken}
                          fullWidth
                          onChange={(e) => handlelaundry(data, 'minTimeTaken', e.target.value)}
                          error={!!detailInfoErrorState[data].minTimeTaken}
                          helperText={detailInfoErrorState[data].minTimeTaken}
                        />
                      </Grid>*/}
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ margin: "1rem 0" }}
                      >
                        <FormControl
                          sx={{ width: "48%" }}
                          error={!!selectedTimeTakenError[data].digit}
                        >
                          <InputLabel id="demo-multiple-chip-label">
                            Min. time in {data}
                          </InputLabel>
                          <Select
                            sx={{}}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            value={selectedTimeTaken[data].digit}
                            onChange={(e) => handleTimeTaken(data, "digit", e)}
                          >
                            {Array.from({ length: 60 }, (_, i) => i + 1).map(
                              (data) => (
                                <MenuItem key={data} value={data}>
                                  {data}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                        <FormControl
                          sx={{ width: "48%", marginLeft: "0.5rem" }}
                          error={!!selectedTimeTakenError[data].time}
                        >
                          <InputLabel id="demo-multiple-chip-label">
                            Min. time in {data}
                          </InputLabel>
                          <Select
                            sx={{}}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            value={selectedTimeTaken[data].time}
                            onChange={(e) => handleTimeTaken(data, "time", e)}
                          >
                            <MenuItem value="Minutes">Minutes</MenuItem>
                            <MenuItem value="Hours">Hours</MenuItem>
                            <MenuItem value="Days">Days</MenuItem>
                          </Select>
                        </FormControl>
                        {detailInfoErrorState[data].minTimeTaken ? (
                          <FormHelperText
                            sx={{
                              color: "#ff4d4f",
                              fontWeight: 400,
                              fontSize: "0.75rem",
                              lineHeight: 1.66,
                              margin: "3px 14px 0 14px",
                            }}
                          >
                            {detailInfoErrorState[data].minTimeTaken}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                    <hr style={{ margin: "1rem 0" }} />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          ""
        )}
        {state === "PersonalShopping" || state === "Tours" ? (
          <div>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement={placement}
              transition
              sx={{ inset: "0px 25% 0px auto !important", zIndex: "9999" }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ width: "80vw" }}>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        marginTop: "2rem",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <div>
                        <ul>
                          <strong style={{ fontSize: "1rem" }}>
                            Name of Service
                          </strong>
                          <li
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                            }}
                          >
                            <p>Exclusive Personal Shopping Experience</p>
                          </li>
                          <strong style={{ fontSize: "1rem" }}>
                            Description
                          </strong>
                          <li
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                            }}
                          >
                            <p>
                              Our exclusive personal shopping service offers a
                              luxurious and personalized shopping experience
                              tailored to your unique style and preferences.
                              Accompanied by a professional shopper, you'll
                              explore the best local boutiques, specialty
                              stores, and artisan markets, ensuring a seamless
                              and enjoyable day of shopping.
                            </p>
                          </li>
                        </ul>

                        <ol>
                          <strong style={{ fontSize: "1rem" }}>
                            Key Benefits
                          </strong>
                          <div
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <li>
                              Convenience: Leave the planning and logistics to
                              us while you enjoy a stress-free shopping day.
                            </li>
                            <li>
                              Expertise: Benefit from the insider knowledge of
                              local trends and must-visit shops.
                            </li>
                            <li>
                              Exclusive Access: Enjoy special discounts,
                              exclusive offers, and access to limited-edition
                              items.
                            </li>
                            <li>
                              Personalized Experience: Receive personalized
                              attention and recommendations based on your
                              tastes.
                            </li>
                            <li>
                              Cultural Immersion: Gain a deeper understanding of
                              the local culture through its unique shopping
                              destinations.
                            </li>
                          </div>
                        </ol>
                        <ol>
                          <strong style={{ fontSize: "1rem" }}>Timeline</strong>
                          <div
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <li>
                              8:00 AM - 9:00 AM: Start your day with a gourmet
                              breakfast at the hotel, meeting your personal
                              shopper to discuss your preferences.
                            </li>
                            <li>
                              9:30 AM - 11:30 AM: Visit high-end boutiques and
                              local designers for a bespoke shopping experience.
                            </li>
                            <li>
                              11:30 AM - 1:00 PM: Discover unique items at
                              specialty stores and artisan markets, learning
                              about local craftsmanship.
                            </li>
                            <li>
                              1:00 PM - 2:00 PM: Enjoy a delicious lunch at a
                              local gourmet restaurant.
                            </li>
                            <li>
                              2:00 PM - 4:00 PM: Explore hidden gems and trendy
                              shops, finding unique fashion pieces and
                              accessories.
                            </li>
                            <li>
                              4:00 PM - 5:30 PM: Shop for luxury items,
                              including jewelry and perfumes, with expert
                              guidance.
                            </li>
                            <li>
                              5:30 PM - 6:00 PM: Return to the hotel with your
                              purchases conveniently delivered to your room.
                            </li>
                            <li>
                              7:00 PM Onwards: Relax and unwind with a
                              delightful dinner and optional spa treatment.
                            </li>
                          </div>
                        </ol>
                        <ol>
                          <strong style={{ fontSize: "1rem" }}>
                            Pricing per Person
                          </strong>
                          <div
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <li>Standard Package: XXX per person</li>
                            <li>
                              Premium Package: XXX per person (includes
                              additional exclusive access and perks)
                            </li>
                          </div>
                        </ol>
                        <ol>
                          <strong style={{ fontSize: "1rem" }}>
                            Booking and Cancellation Policy
                          </strong>
                          <div
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <li>
                              Cancellation: Cancellations made within 24 hours
                              of the scheduled service will incur a 50%
                              cancellation fee. No-shows will be charged the
                              full price.
                            </li>
                          </div>
                        </ol>

                        <ol>
                          <strong style={{ fontSize: "1rem" }}>
                            Testimonials
                          </strong>
                          <div
                            style={{
                              fontSize: "1rem",
                              marginLeft: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <li>
                              "An unforgettable shopping experience! The
                              personal shopper knew exactly what I was looking
                              for and took me to the best places in town." -
                              Jane D.
                            </li>
                            <li>
                              "I found unique items I wouldn't have discovered
                              on my own. Highly recommend this service!" - John
                              S.
                            </li>
                          </div>
                        </ol>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 2,
                          }}
                          onClick={handleClick("close")}
                        >
                          <Button variant="contained" color="primary">
                            Close
                          </Button>
                        </div>
                      </div>
                    </List>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              Please fill below details carefully and for reference (click here){" "}
              <DescriptionRoundedIcon
                sx={{}}
                fontSize="medium"
                onClick={handleClick("bottom-start")}
              />
            </Typography>

            {Object.keys(detailInfoState).map((key, index) => (
              <div key={index} style={{ margin: "1rem 0" }}>
                {Object.keys(detailInfoState[key]).map((field, idx) => (
                  <div key={idx} style={{ margin: "1rem 0" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography
                          variant="h6"
                          style={{ paddingBottom: "0.5rem" }}
                        >
                          {field}
                        </Typography>
                        <TextField
                          id="outlined"
                          label={`Details of ${field}`}
                          value={detailInfoState[key][field]}
                          required={field === "Testimonials" ? false : true}
                          multiline={
                            field === "Name of Service" ||
                            field === "Description"
                              ? false
                              : true
                          }
                          rows={
                            field === "Name of Service" ||
                            field === "Description"
                              ? 0
                              : 4
                          }
                          fullWidth
                          onChange={(e) =>
                            handleTourPackage(key, field, e.target.value)
                          }
                          error={!!detailInfoErrorState[key][field]}
                          helperText={detailInfoErrorState[key][field]}
                        />
                      </Grid>
                    </Grid>
                  </div>
                ))}
                <hr style={{ margin: "1rem 0" }} />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {!submitFlag ? (
          <div style={{ margin: "2rem 0" }}>
            {state === "PersonalShopping" || state === "Tours" ? (
              <Button
                variant="contained"
                sx={{ letterSpacing: "1px", marginRight: "1rem" }}
                onClick={removeService}
              >
                Cancel
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              sx={{ letterSpacing: "1px" }}
              onClick={
                state === "PersonalShopping" || state === "Tours"
                  ? handleAdd
                  : handleNext
              }
            >
              {state === "PersonalShopping" || state === "Tours"
                ? "Add More"
                : "Next"}
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      {state === "PersonalShopping" || state === "Tours" ? (
        <div
          style={{
            width: "100%",
            textAlign: "right",
          }}
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
            onClick={handleSubmit}
          >
            Finish
          </Button>
        </div>
      ) : (
        ""
      )}
      {submitFlag ? (
        <div
          style={{
            width: "100%",
            textAlign: "right",
          }}
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
            onClick={handleSubmit}
          >
            Finish
          </Button>
        </div>
      ) : (
        ""
      )}
    </MainCard>
  );
}
