"use client";
// project import
import MainCard from "../../components/MainCard";
import { React, useState, useRef, useEffect } from "react";
import { Grid, Avatar, Button, Typography, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../features/firebaseSlice";
import { useRouter } from "next/navigation";

export default function List() {
  const dispatch = useDispatch();
  const router = useRouter();
  const firebaseData = useSelector((state) => state.firebaseData);
  const [categoriesList, setCategoriesList] = useState([]);
  const [showCheckbox, setShowCheckBox] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    dispatch(fetchDataFromFirestore());
  }, [dispatch]);

  useEffect(() => {
    if (firebaseData?.status === "succeeded") {
      console.log(firebaseData.data);
      setCategoriesList(firebaseData?.data?.categories);
    }
  }, [firebaseData]);

  const handleChange = (event, index) => {
    setCheckedItems((prevCheckedItems) => {
      if (event.target.checked) {
        return {
          ...prevCheckedItems,
          [index]: true,
        };
      } else {
        const { [index]: removedItem, ...rest } = prevCheckedItems;
        return rest;
      }
    });
  };

  const handleClick = (data) => {
    console.log(data);
    if (data) {
      // navigate("/category", { state: { data: data } });
      router.push("/category");
    }
  };

  const handleDelete = () => {
    if (showCheckbox === false) {
      setShowCheckBox(true);
    } else {
      if (Object.keys(checkedItems).length === 0) {
        alert("No category selected");
      } else {
        if (window.confirm("Do you want to delete?")) {
          const indicesToDelete = Object.keys(checkedItems).map(Number);
          const filteredCategories = categoriesList.filter(
            (_, index) => !indicesToDelete.includes(index)
          );
          setCategoriesList(filteredCategories);
          setCheckedItems({});
          setShowCheckBox(false);
        }
      }
    }
  };

  console.log(checkedItems);

  return (
    <MainCard>
      <div>
        <Grid container spacing={2}>
          {categoriesList.map((data, index) => (
            <Grid item xs={6} md={2.5} lg={2.5} key={index}>
              {showCheckbox ? (
                <Checkbox
                  checked={checkedItems[index] || false}
                  onChange={(event) => handleChange(event, index)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              ) : (
                ""
              )}
              <div
                onClick={() => handleClick(data)}
                style={{
                  cursor: "pointer",
                  textAlign: "-webkit-center",
                  boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: "7rem", md: "5rem", lg: "5rem" },
                    height: { xs: "7rem", md: "5rem", lg: "5rem" },
                  }}
                  alt="recommended"
                  src={data.categoryLogo}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    letterSpacing: 1,
                  }}
                >
                  {data.name}
                </Typography>
              </div>
            </Grid>
          ))}
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "3rem", textAlign: "left", padding: "0 16px" }}
          >
            <Grid item xs={6} md={3} lg={3}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<DeleteOutlinedIcon />}
                sx={{
                  lineHeight: 0,
                  letterSpacing: "1px",
                  color: "black",
                  borderColor: "black",
                  "&:hover": { color: "grey", borderColor: "grey" },
                }}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<AddCircleOutlineOutlinedIcon />}
                sx={{
                  lineHeight: 0,
                  letterSpacing: "1px",
                  color: "black",
                  borderColor: "black",
                  "&:hover": { color: "grey", borderColor: "grey" },
                }}
                onClick={() => router.push("/category")}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Button
                disabled={!showCheckbox}
                variant="outlined"
                size="large"
                endIcon={<CancelOutlinedIcon />}
                sx={{
                  lineHeight: 0,
                  letterSpacing: "1px",
                  color: "black",
                  borderColor: "black",
                  "&:hover": { color: "grey", borderColor: "grey" },
                }}
                onClick={() => {
                  setShowCheckBox(false);
                  setCheckedItems({});
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
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
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MainCard>
  );
}
