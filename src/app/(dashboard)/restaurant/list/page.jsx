"use client";
// project import
import MainCard from "../../../components/MainCard";
import { React, useState, useRef, useEffect } from "react";
import { Grid, Avatar, Button, Typography, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../../features/firebaseSlice";
import { useRouter } from "next/navigation";
import { addData } from "../../../features/list";
import { useSession } from "next-auth/react";
import { getMenuData } from "../../../features/firestoreMultipleData";
import { Stack } from "@mui/system";
export default function List() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const menuData = useSelector((state) => state.firestoreMultipleData);
  const [categoriesList, setCategoriesList] = useState([]);
  const [showCheckbox, setShowCheckBox] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        getMenuData({
          email: user.email,
          subCollection: "restaurant",
        })
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (menuData?.status === "succeeded") {
      console.log(menuData.data);
      setCategoriesList(menuData?.data?.categories);
    }
  }, [menuData]);

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
      dispatch(addData(data));
      router.push("list/category");
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

  // console.log(checkedItems);

  return (
    <MainCard>
      {categoriesList && (
        <div>
          <Grid container spacing={2}>
            {categoriesList.map((data, index) => (
              <Grid item xs={6} md={2} lg={2} key={index}>
                {showCheckbox ? (
                  <Checkbox
                    checked={checkedItems[index] || false}
                    onChange={(event) => handleChange(event, index)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                ) : (
                  ""
                )}
                <Stack
                  onClick={() => handleClick(data)}
                  sx={{
                    cursor: "pointer",

                    p: 1,
                    // textAlign: "-webkit-center",
                  }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Avatar
                    sx={{
                      width: { xs: "7rem", md: "5rem", lg: "5rem" },
                      height: { xs: "7rem", md: "5rem", lg: "5rem" },
                      borderRadius: "5px",
                    }}
                    alt="recommended"
                    src={data.categoryLogo}
                    variant="square"
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      p: 1,
                      letterSpacing: 1,
                    }}
                  >
                    {data.name}
                  </Typography>
                </Stack>
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
                  onClick={() => router.push("list/category")}
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
      )}
    </MainCard>
  );
}
