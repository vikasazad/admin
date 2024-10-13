"use client";
// project import
import MainCard from "../../components/MainCard";
import { React, useState, useRef, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import {
  fetchFirestoreData,
  getTableData,
} from "../../features/firestoreMultipleData";
import { useSession } from "next-auth/react";

export default function RestaurantInfo() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const user = session?.user;
  const tableData = useSelector((state) => state.firestoreMultipleData);
  const [tables, setTables] = useState();
  const [errors, setErrors] = useState({
    "2_seater": [],
    "4_seater": [],
    "6_seater": [],
  });
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    capacity: "",
    tableIndex: null,
  });
  const [newAmenity, setNewAmenity] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        getTableData({
          email: user.email,
          subCollection: "restaurant",
        })
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (tableData?.status === "succeeded") {
      setTables(tableData.data);
      console.log(tableData.data);
    }
  }, [tableData]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const validateTable = (table) => {
    console.log(table);
    const newErrors = {};
    if (!table.table_number.trim()) {
      newErrors.table_number = "Table number is required";
    }
    if (!table.reservation_price.trim() || table.reservation_price <= 0) {
      newErrors.reservation_price = "Invalid price";
    }
    if (
      !table.minimum_reservation_time.trim() ||
      table.minimum_reservation_time <= 0
    ) {
      newErrors.minimum_reservation_time = "Invalid minimum time";
    }
    if (
      !table.maximum_reservation_time.trim() ||
      table.maximum_reservation_time <= 0
    ) {
      newErrors.maximum_reservation_time = "Invalid maximum time";
    }
    if (
      Number(table.maximum_reservation_time) <=
      Number(table.minimum_reservation_time)
    ) {
      console.log(
        Number(table.maximum_reservation_time) <=
          Number(table.minimum_reservation_time)
      );
      newErrors.maximum_reservation_time =
        "Max time should be greater than min time";
    }

    if (
      table.reservation_timings.weekday.length === 0 ||
      table.reservation_timings.weekday.every((time) => !time.trim())
    ) {
      newErrors.weekdayTiming = "At least one valid weekday timing is required";
    }
    if (
      table.reservation_timings.weekend.length === 0 ||
      table.reservation_timings.weekend.every((time) => !time.trim())
    ) {
      newErrors.weekendTiming = "At least one valid weekend timing is required";
    }

    return newErrors;
  };

  const addTable = (capacity) => {
    const lastTable = tables[0][capacity][tables[0][capacity].length - 1];
    if (lastTable) {
      const lastTableErrors = validateTable(lastTable);
      if (Object.keys(lastTableErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [capacity]: [...prevErrors[capacity].slice(0, -1), lastTableErrors],
        }));
        setSnackbar({
          open: true,
          message:
            "Please fill in all required fields for the previous table before adding a new one.",
          severity: "error",
        });
        return;
      }
    }

    setTables((prevTables) => [
      {
        ...prevTables[0],
        [capacity]: [
          ...prevTables[0][capacity],
          {
            table_number: "",
            reservation_price: "",
            reservation_timings: {
              weekday: [""],
              weekend: [""],
            },
            minimum_reservation_time: "",
            maximum_reservation_time: "",
            location: "indoor",
            amenities: [],
            accessibility: false,
          },
        ],
      },
    ]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [capacity]: [...prevErrors[capacity], {}],
    }));
  };

  const handleInputChange = (capacity, index, field, value) => {
    setTables((prevTables) => [
      {
        ...prevTables[0],
        [capacity]: prevTables[0][capacity].map((table, i) =>
          i === index ? { ...table, [field]: value } : table
        ),
      },
    ]);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [capacity]: prevErrors[capacity].map((tableErrors, i) =>
        i === index ? { ...tableErrors, [field]: undefined } : tableErrors
      ),
    }));
  };

  const handleTimingChange = (capacity, index, day, timingIndex, value) => {
    setTables((prevTables) => {
      const updatedTables = [
        {
          ...prevTables[0],
          [capacity]: prevTables[0][capacity].map((table, i) =>
            i === index
              ? {
                  ...table,
                  reservation_timings: {
                    ...table.reservation_timings,
                    [day]: table.reservation_timings[day].map((time, j) =>
                      j === timingIndex ? value : time
                    ),
                  },
                }
              : table
          ),
        },
      ];

      const updatedTable = updatedTables[0][capacity][index];
      const validationErrors = validateTable(updatedTable);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [capacity]: {
          ...prevErrors[capacity],
          [index]: validationErrors,
        },
      }));

      return updatedTables;
    });
  };

  const addTiming = (capacity, index, day) => {
    setTables((prevTables) => [
      {
        ...prevTables[0],
        [capacity]: prevTables[0][capacity].map((table, i) =>
          i === index
            ? {
                ...table,
                reservation_timings: {
                  ...table.reservation_timings,
                  [day]:
                    table.reservation_timings[day].length === 0 ? [""] : [],
                },
              }
            : table
        ),
      },
    ]);
  };

  const removeTiming = (capacity, index, day, timingIndex) => {
    setTables((prevTables) => [
      {
        ...prevTables[0],
        [capacity]: prevTables[0][capacity].map((table, i) =>
          i === index
            ? {
                ...table,
                reservation_timings: {
                  ...table.reservation_timings,
                  [day]: table.reservation_timings[day].filter(
                    (_, j) => j !== timingIndex
                  ),
                },
              }
            : table
        ),
      },
    ]);
  };

  const handleAddAmenity = (capacity, index) => {
    if (newAmenity.trim() !== "") {
      setTables((prevTables) => [
        {
          ...prevTables[0],
          [capacity]: prevTables[0][capacity].map((table, i) =>
            i === index
              ? { ...table, amenities: [...table.amenities, newAmenity.trim()] }
              : table
          ),
        },
      ]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (capacity, tableIndex, amenityIndex) => {
    setTables((prevTables) => [
      {
        ...prevTables[0],
        [capacity]: prevTables[0][capacity].map((table, i) =>
          i === tableIndex
            ? {
                ...table,
                amenities: table.amenities.filter((_, j) => j !== amenityIndex),
              }
            : table
        ),
      },
    ]);
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = { ...errors };

    Object.keys(tables[0]).forEach((capacity) => {
      tables[0][capacity].forEach((table, index) => {
        const tableErrors = validateTable(table);
        if (Object.keys(tableErrors).length > 0) {
          hasErrors = true;
          newErrors[capacity][index] = tableErrors;
        }
      });
    });

    if (hasErrors) {
      setErrors(newErrors);
      setSnackbar({
        open: true,
        message: "Please correct the errors before submitting.",
        severity: "error",
      });
      return;
    }

    console.log("Submitting table information:", tables[0]);

    setSnackbar({
      open: true,
      message: "Table information saved successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteClick = (capacity, index) => {
    setDeleteDialog({ open: true, capacity, tableIndex: index });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.tableIndex !== null) {
      setTables((prevTables) => [
        {
          ...prevTables[0],
          [deleteDialog.capacity]: prevTables[0][deleteDialog.capacity].filter(
            (_, index) => index !== deleteDialog.tableIndex
          ),
        },
      ]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [deleteDialog.capacity]: prevErrors[deleteDialog.capacity].filter(
          (_, index) => index !== deleteDialog.tableIndex
        ),
      }));
      setDeleteDialog({ open: false, capacity: "", tableIndex: null });
      setSnackbar({
        open: true,
        message: "Table removed successfully!",
        severity: "success",
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, capacity: "", tableIndex: null });
  };

  const capacities = ["2_seater", "4_seater", "6_seater"];
  console.log(tables);
  return (
    <>
      <MainCard>
        {tables && (
          <Box sx={{ width: "100%", p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Table Information
            </Typography>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="table capacity tabs"
            >
              {capacities.map((capacity, index) => (
                <Tab key={capacity} label={capacity.replace("_", " ")} />
              ))}
            </Tabs>
            {capacities.map((capacity, tabIndex) => (
              <div
                key={capacity}
                role="tabpanel"
                hidden={tabValue !== tabIndex}
              >
                {tabValue === tabIndex && (
                  <Box sx={{ p: 3 }}>
                    <Button
                      variant="contained"
                      onClick={() => addTable(capacity)}
                      sx={{ mb: 2 }}
                    >
                      Add {capacity.replace("_", " ")} Table
                    </Button>
                    {tables[0][capacity]?.map((table, index) => (
                      <Paper
                        key={index}
                        elevation={3}
                        sx={{ p: 2, mb: 2, position: "relative" }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} lg={12}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography variant="h5">
                                Add Information
                              </Typography>
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  handleDeleteClick(capacity, index)
                                }
                                sx={{ position: "absolute", top: 8, right: 8 }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Table Number"
                              value={table.table_number}
                              onChange={(e) =>
                                handleInputChange(
                                  capacity,
                                  index,
                                  "table_number",
                                  e.target.value
                                )
                              }
                              error={!!errors[capacity]?.[index]?.table_number}
                              helperText={
                                errors[capacity]?.[index]?.table_number
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Reservation Price"
                              value={table.reservation_price}
                              onChange={(e) =>
                                handleInputChange(
                                  capacity,
                                  index,
                                  "reservation_price",
                                  parseFloat(e.target.value)
                                )
                              }
                              error={
                                !!errors[capacity]?.[index]?.reservation_price
                              }
                              helperText={
                                errors[capacity]?.[index]?.reservation_price
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Minimum Reservation Time (minutes)"
                              value={table.minimum_reservation_time}
                              onChange={(e) =>
                                handleInputChange(
                                  capacity,
                                  index,
                                  "minimum_reservation_time",
                                  parseInt(e.target.value)
                                )
                              }
                              error={
                                !!errors[capacity]?.[index]
                                  ?.minimum_reservation_time
                              }
                              helperText={
                                errors[capacity]?.[index]
                                  ?.minimum_reservation_time
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Maximum Reservation Time (minutes)"
                              value={table.maximum_reservation_time}
                              onChange={(e) =>
                                handleInputChange(
                                  capacity,
                                  index,
                                  "maximum_reservation_time",
                                  parseInt(e.target.value)
                                )
                              }
                              error={
                                !!errors[capacity]?.[index]
                                  ?.maximum_reservation_time
                              }
                              helperText={
                                errors[capacity]?.[index]
                                  ?.maximum_reservation_time
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <ToggleButtonGroup
                              color="primary"
                              value={table.location}
                              exclusive
                              onChange={(e, newLocation) =>
                                handleInputChange(
                                  capacity,
                                  index,
                                  "location",
                                  newLocation
                                )
                              }
                            >
                              <ToggleButton value="indoor">Indoor</ToggleButton>
                              <ToggleButton value="outdoor">
                                Outdoor
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={table.accessibility}
                                  onChange={(e) =>
                                    handleInputChange(
                                      capacity,
                                      index,
                                      "accessibility",
                                      e.target.checked
                                    )
                                  }
                                />
                              }
                              label="Accessibility"
                            />
                          </Grid>
                          <Grid item xs={12} lg={6} md={6}>
                            <Typography variant="h6">
                              Reservation Timings
                            </Typography>
                            {["weekday", "weekend"].map((day) => (
                              <Box key={day} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">
                                  {day.charAt(0).toUpperCase() + day.slice(1)}
                                </Typography>
                                {table.reservation_timings[day].map(
                                  (time, timeIndex) => (
                                    <Box
                                      key={timeIndex}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                      }}
                                    >
                                      <TextField
                                        type="time"
                                        value={time}
                                        onChange={(e) =>
                                          handleTimingChange(
                                            capacity,
                                            index,
                                            day,
                                            timeIndex,
                                            e.target.value
                                          )
                                        }
                                        sx={{ mr: 1, width: "100%" }}
                                        error={
                                          !!errors[capacity]?.[index]?.[
                                            `${day}Timing`
                                          ]
                                        }
                                        helperText={
                                          errors[capacity]?.[index]?.[
                                            `${day}Timing`
                                          ]
                                        }
                                      />
                                      <IconButton
                                        onClick={() =>
                                          removeTiming(
                                            capacity,
                                            index,
                                            day,
                                            timeIndex
                                          )
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Box>
                                  )
                                )}
                                <Button
                                  startIcon={<AddIcon />}
                                  onClick={() =>
                                    addTiming(capacity, index, day)
                                  }
                                  disabled={
                                    table.reservation_timings[day].length > 0
                                  }
                                  sx={{
                                    color:
                                      !!errors[capacity]?.[index]?.[
                                        `${day}Timing`
                                      ] && "red",
                                  }}
                                >
                                  {table.reservation_timings[day].length === 0
                                    ? `Add ${day} Time`
                                    : `Remove ${day} Time`}
                                </Button>
                              </Box>
                            ))}
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6">Amenities</Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              {table.amenities.map((amenity, amenityIndex) => (
                                <Chip
                                  key={amenityIndex}
                                  label={amenity}
                                  onDelete={() =>
                                    handleRemoveAmenity(
                                      capacity,
                                      index,
                                      amenityIndex
                                    )
                                  }
                                />
                              ))}
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <TextField
                                label="New Amenity"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                sx={{ mr: 1 }}
                              />
                              <Button
                                onClick={() =>
                                  handleAddAmenity(capacity, index)
                                }
                              >
                                Add
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>
                )}
              </div>
            ))}
            {Object.values(tables).some(
              (tableArray) => tableArray.length > 0
            ) && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Save Table Information
              </Button>
            )}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
            <Dialog
              open={deleteDialog.open}
              onClose={handleDeleteCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Table Removal"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to remove this table? This action cannot
                  be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel}>Cancel</Button>
                <Button onClick={handleDeleteConfirm} autoFocus color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </MainCard>
    </>
  );
}
