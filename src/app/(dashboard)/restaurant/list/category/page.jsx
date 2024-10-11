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
  FormHelperText,
  Box,
  FormControl,
  Fab,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirestore } from "../../../../features/firebaseSlice";
import { addData } from "../../../../features/list";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../../DB/firebase";
import { v4 } from "uuid";

// import { useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";

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

export default function MenuInfo() {
  const dispatch = useDispatch();
  // const location = useLocation();
  const router = useRouter();
  const nature = ["Veg", "Non-Veg"];
  const discount = ["Percentage", "Price"];
  const portion = ["Single", "Half/Full", "Medium/Large", "Regular/Large"];
  const uploadLogoInputRef = useRef(null);
  const uploadMenuImageInputRef = useRef(null);
  const timer = useRef();

  const listData = useSelector((state) => state.listData.listData);

  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [selectedCategoryLogo, setSelectedCategoryLogo] = useState(null);
  const [categoryLogoError, setCategoryLogoError] = useState("");
  const [FDRestaurantLogo, setFDRestaurantLogo] = useState(null);
  const [menuCount, setMenuCount] = useState(0);
  const [imageUploadSuccess, setImageUploadSuccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [FDRestaurantImg, setFDRestaurantImg] = useState({});
  const [uploadedData, setUploadedData] = useState({});
  const [selectedPortion, setSelectedPortion] = useState("");
  const [formMenuData, setFormMenuData] = useState({
    menuItems: [
      {
        name: "",
        description: "",
        portion: "Single",
        price: { Single: "" },
        cuisineName: "",
        categoryName: "",
        nature: "",
        discountType: "",
        discountAmount: "",
        images: [],
      },
    ],
  });
  const [formMenuErrors, setFormMenuErrors] = useState({
    menuItems: [
      {
        name: "",
        description: "",
        portion: "",
        price: "",
        price1: "",
        cuisineName: "",
        categoryName: "",
        nature: "",
        discountType: "",
        discountAmount: "",
        images: "",
      },
    ],
  });

  useEffect(() => {
    console.log(listData.id);
    if (listData.id) {
      const errorObj = {
        menuItems: [],
      };
      for (let i = 0; i < listData.menuItems.length; i++) {
        errorObj.menuItems.push({
          name: "",
          description: "",
          portion: "",
          price: "",
          price1: "",
          cuisineName: "",
          categoryName: "",
          nature: "",
          discountType: "",
          discountAmount: "",
          images: "",
        });
      }
      console.log(errorObj);
      setUploadedData(listData);
      setFormMenuErrors(errorObj);
      setFormMenuData(listData);
      setCategoryName(listData.name);
      setSelectedCategoryLogo(listData.categoryLogo);
    }
  }, [listData]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  console.log(formMenuData);
  const handleCategoryName = (field, value) => {
    const error = validationFunctions[field](value);
    setCategoryNameError(error);
    setCategoryName(value);
  };
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const menuImgUpload = (e, index) => {
    // console.log(index);
    let images = [];
    let totalUploadedFiles = 0;

    for (let i = 0; i < e.target.files.length; i++) {
      if (totalUploadedFiles >= 3) {
        alert("You can upload a maximum of 3 images.");
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
        setFDRestaurantImg((prevData) => {
          const updatedData = { ...prevData };
          const menuItemName = formMenuData.menuItems[index].name;

          if (!updatedData[menuItemName]) {
            updatedData[menuItemName] = [file];
          } else {
            updatedData[menuItemName] = [...updatedData[menuItemName], file];
          }

          return updatedData;
        });

        setFormMenuData((prevData) => {
          const updatedMenuItems = [...prevData.menuItems];
          const updatedImages = [
            ...updatedMenuItems[index].images,
            {
              id: v4(),
              filename: file.name,
              filetype: file.type,
              fileimage: reader.result,
              datetime: file.lastModifiedDate.toLocaleString("en-IN"),
              filesize: filesizes(file.size),
            },
          ];

          updatedMenuItems[index] = {
            ...updatedMenuItems[index],
            images: updatedImages,
          };

          return { ...prevData, menuItems: updatedMenuItems };
        });
      };

      reader.readAsDataURL(file);

      totalUploadedFiles++;
    }
    validateField("images", images, index);
  };

  const deleteMenuImg = (id, index) => {
    console.log(id, index);
    if (window.confirm("Are you sure you want to delete this Image?")) {
      setFormMenuData((prevData) => {
        const updatedMenuItems = [...prevData.menuItems];
        const updatedImages = updatedMenuItems[index].images.filter(
          (image) => image.id !== id
        );
        updatedMenuItems[index] = {
          ...updatedMenuItems[index],
          images: updatedImages,
        };
        console.log({ ...prevData, menuItems: updatedMenuItems });
        return { ...prevData, menuItems: updatedMenuItems };
      });

      if (uploadMenuImageInputRef.current) {
        uploadMenuImageInputRef.current.value = "";
      }
    } else {
      // Handle the case when the user cancels the deletion
      // alert('No');
    }
  };

  const categoryLogoUpload = (e) => {
    // console.log(e.target.files);
    if (e.target.files.length > 0) {
      if (selectedCategoryLogo) {
        alert("You can only upload one logo.");
        if (uploadLogoInputRef.current) {
          uploadLogoInputRef.current.value = "";
        }
        return;
      }
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        alert("File size cannot exceed 1MB.");
        if (uploadLogoInputRef.current) {
          uploadLogoInputRef.current.value = "";
        }
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () => {
        setFDRestaurantLogo(file);
        setSelectedCategoryLogo({
          id: "1",
          filename: file.name,
          filetype: file.type, // Hardcoded since it's a WebP image
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
        const validatelogo = validationFunctions["logo"](file.name);
        setCategoryLogoError(validatelogo);
      };

      reader.readAsDataURL(file);
    }
  };
  const deleteRestaurantLogo = async () => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      setSelectedCategoryLogo(null);
      if (uploadLogoInputRef.current) {
        uploadLogoInputRef.current.value = "";
      }
    } else {
      // alert('No');
    }
  };
  const isUrlValid = (url) => {
    const urlPattern =
      /^(https?|ftp):\/\/(?:w{3}\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/\S*)?$/;

    return urlPattern.test(url);
  };
  const validationFunctions = {
    categoryName: (value) =>
      value.trim() === "" ? "Category Name is required" : "",
    logo: (value) => (value === null ? "Category logo is required" : ""),
    name: (value) => (value.trim() === "" ? "Name is required" : ""),
    description: (value) =>
      value.trim() === "" ? "Description is required" : "",
    images: (value) => (value.length === 0 ? "Images are required" : ""),
    portion: (value) => (value.trim() === "" ? `Portion is required` : ""),

    price: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    price1: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
    cuisineName: (value) =>
      value.trim() === "" ? `Cuisine Name is required` : "",
    categoryName: (value) =>
      value.trim() === "" ? `Category Name is required` : "",
    nature: (value) => (value.trim() === "" ? `Nature is required` : ""),
    discountType: (value) => (value.trim() === "" ? `Type is required` : ""),
    discountAmount: (value) => {
      if (!value.trim()) {
        return "Please enter a value";
      } else if (isNaN(value)) {
        return "Please enter a valid number";
      } else {
        return "";
      }
    },
  };
  const validateField = (field, value, index) => {
    console.log(field, value, index);
    const error = validationFunctions[field](value);
    // console.log(error);
    const updatedErrorMenuItems = formMenuErrors.menuItems;
    updatedErrorMenuItems[index] = {
      ...updatedErrorMenuItems[index],
      [field]: error,
    };
    setFormMenuErrors((prevErrors) => ({
      ...prevErrors,
      ["menuItems"]: updatedErrorMenuItems,
    }));
  };

  const handleChange = (field, value, index) => {
    console.log(field, value, index);
    if (field === "discountAmount") {
      if (formMenuData.menuItems[index].discountType === "") {
        validateField(
          "discountType",
          formMenuData.menuItems[index].discountType,
          index
        );
      }
    }
    setFormMenuData((prevData) => ({
      ...prevData,
      menuItems: prevData.menuItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    validateField(field, value, index);
  };

  const handleCouponChange = (field, value, index) => {
    // console.log(field, value, index);
    if (field === "discountType") {
      if (formMenuData.menuItems[index].discountAmount === "") {
        validateField(
          "discountAmount",
          formMenuData.menuItems[index].discountAmount,
          index
        );
      }
    }

    const updatedMenuItems = [...formMenuData.menuItems];
    // console.log(updatedMenuItems);
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      [field]: value,
    };
    // console.log(updatedMenuItems[index]);
    setFormMenuData((prevData) => ({
      ...prevData,
      menuItems: updatedMenuItems,
    }));
    validateField(field, value, index);
  };

  const handlePortionChange = (field, value, index) => {
    console.log(field, value, index);
    const currentItem = formMenuData.menuItems[index];
    let updatedPrice = {};
    if (typeof currentItem.price === "object" && currentItem.price !== null) {
      const portions = value.split("/");
      portions.forEach((portion) => {
        updatedPrice[portion] = "";
      });
    } else {
      updatedPrice = {};
    }
    console.log(updatedPrice);
    const updatedMenuItems = [...formMenuData.menuItems];
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      portion: value,
      price: updatedPrice,
    };

    setFormMenuData((prevData) => ({
      ...prevData,
      menuItems: updatedMenuItems,
    }));
    setSelectedPortion(value);
    validateField(field, value, index);
  };

  const handlePriceChange = (field, value, index) => {
    const currentItem = formMenuData.menuItems[index];
    console.log("Current Item:", currentItem);
    const indexToUpdate = field === "price" ? 0 : 1;
    const keyName = currentItem.portion.split("/")[indexToUpdate];
    let updatedPrice = {};
    if (keyName !== "Single") {
      validateField("price", Object.values(currentItem.price)[0], index);
      validateField("price1", Object.values(currentItem.price)[1], index);
    }

    console.log(keyName);

    updatedPrice = {
      ...currentItem.price,
      [keyName]: value,
    };

    // console.log("Updated Price:", updatedPrice);

    const updatedMenuItems = [...formMenuData.menuItems];
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      price: updatedPrice,
    };

    // console.log("Updated Menu Items:", updatedMenuItems);

    // Update state
    setFormMenuData((prevData) => ({
      ...prevData,
      menuItems: updatedMenuItems,
    }));
    validateField(field, value, index);
  };

  console.log(formMenuData.menuItems);
  const sendLogo = async () => {
    try {
      console.log(FDRestaurantLogo);
      if (FDRestaurantLogo === null) {
        const check = isUrlValid(selectedCategoryLogo);
        if (check) {
          return true;
        } else {
          return false;
        }
      }
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
        `restaurantCode1/Images/Categories/${categoryName}/Logo/${FDRestaurantLogo.name}`
      );
      const snapshot = await uploadBytes(imageRef, data);
      const url = await getDownloadURL(snapshot.ref);
      setFDRestaurantLogo(url);

      return true; // Return true on success
    } catch (error) {
      console.error("Error uploading logo:", error);
      return false; // Return false on error
    }
  };

  const sendRestaurantImages = async () => {
    console.log(FDRestaurantImg);
    await Promise.all(
      Object.entries(FDRestaurantImg).map(
        async ([dishName, imgFiles], index) => {
          console.log(imgFiles, dishName);
          try {
            let imgArr = [];
            await Promise.all(
              imgFiles.map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch(
                  "http://localhost:5000/uploadImage",
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.blob();
                const imageRef = ref(
                  storage,
                  `restaurantCode1/Images/Categories/${categoryName}/menuItems/${dishName}/${v4()}`
                );
                const snapshot = await uploadBytes(imageRef, data);
                const url = await getDownloadURL(snapshot.ref);
                imgArr.push(url);
              })
            );
            setFormMenuData((prevData) => {
              const updatedMenuItems = [...prevData.menuItems];
              const existingImages =
                updatedMenuItems[index].images?.slice(0, -imgFiles.length) ||
                [];
              updatedMenuItems[index] = {
                ...updatedMenuItems[index],
                images: [...existingImages, ...imgArr],
              };
              return { ...prevData, menuItems: updatedMenuItems };
            });
            if (imgArr.length > 0) {
              const updatedImageUploadSuccess = [...imageUploadSuccess];
              updatedImageUploadSuccess[index] = true;
              setImageUploadSuccess(updatedImageUploadSuccess);
            }
          } catch (error) {
            console.error("Error uploading image:", error);
            return false;
          }
        }
      )
    );
    return true;
  };

  const addAnotherDishItem = () => {
    try {
      const isCategoryName = validationFunctions["categoryName"](categoryName);
      const isLogouploaded = validationFunctions["logo"](selectedCategoryLogo);
      setCategoryNameError(isCategoryName);
      setCategoryLogoError(isLogouploaded);
      // console.log(menuCount);
      // console.log(formMenuData.menuItems);
      // console.log(formMenuData.menuItems[menuCount]);
      const newItem = formMenuData.menuItems[menuCount];

      const excludedFields = ["discountType", "discountAmount", "id", "tags"];
      Object.keys(newItem).forEach((field) => {
        if (!excludedFields.includes(field)) {
          console.log("here");
          if (field === "price" && newItem["portion"] === "Single") {
            validateField("price", newItem[field].Single, menuCount);
          } else if (newItem["portion"] !== "Single" && field === "price") {
            const fr = newItem["portion"].split("/");
            console.log("1", field);
            console.log("2", newItem[field][fr[0]]);
            console.log("3", newItem["portion"]);
            console.log("4", newItem);
            validateField("price", newItem[field][fr[0]], menuCount);
            validateField("price1", newItem[field][fr[1]], menuCount);
          } else {
            validateField(field, newItem[field], menuCount);
          }
        }
      });
      const isDiscountTypeFilled = newItem.discountType.trim() !== "";
      const isDiscountAmountFilled = newItem.discountAmount.trim() !== "";
      if (
        (isDiscountTypeFilled || isDiscountAmountFilled) &&
        (!isDiscountTypeFilled || !isDiscountAmountFilled)
      ) {
        console.log(
          "Both discountType and discountAmount should be filled together."
        );
        return;
      }

      const newItemErrors = formMenuErrors.menuItems[menuCount];
      let newItemHasErrors = false;
      Object.keys(newItemErrors).forEach((key) => {
        if (newItemErrors[key] && !excludedFields.includes(key)) {
          newItemHasErrors = true;
        }
      });
      if (!newItem.images.length || newItemHasErrors) {
        alert("Cannot add another dish item due to errors.");
        return;
      }
      setFormMenuData((prevData) => ({
        ...prevData,
        menuItems: [
          ...prevData.menuItems,
          {
            name: "",
            description: "",
            portion: "Single",
            price: { Single: "" },
            cuisineName: "",
            categoryName: "",
            nature: "",
            discountType: "",
            discountAmount: "",
            images: [],
          },
        ],
      }));
      setFormMenuErrors((prevErrors) => ({
        ...prevErrors,
        menuItems: [
          ...prevErrors.menuItems,
          {
            name: "",
            description: "",
            images: "",
            portion: "",
            price: "",
            price1: "",
            cuisineName: "",
            categoryName: "",
            nature: "",
            discountType: "",
            discountAmount: "",
          },
        ],
      }));
      setMenuCount(menuCount + 1);
      console.log(formMenuData.menuItems.length);
    } catch (error) {
      console.error("An error occurred:", error);

      // Handle the error here, maybe display a user-friendly message or log it.
    }
  };

  const removeLastDishItem = () => {
    setMenuCount(menuCount - 1);
    if (formMenuData.menuItems.length > 1) {
      setFormMenuData((prevData) => ({
        ...prevData,
        menuItems: prevData.menuItems.slice(0, -1),
      }));
      setFormMenuErrors((prevErrors) => ({
        ...prevErrors,
        menuItems: prevErrors.menuItems.slice(0, -1),
      }));
    }
  };
  // console.log(formMenuData);
  const finishCategory = async () => {
    if (
      window.confirm("Do you want to finish this category and move on to next?")
    ) {
      console.log(formMenuData);
      setLoading(true);
      const categoryNameError =
        validationFunctions["categoryName"](categoryName);
      setCategoryNameError(categoryNameError);
      const logoError = validationFunctions["logo"](selectedCategoryLogo);
      setCategoryLogoError(logoError);

      let formErrorsExist = false;
      const excludedFields = [
        "discountType",
        "discountAmount",
        "id",
        "tags",
        "price",
        "position",
      ];
      formMenuData.menuItems.map((data, i) => {
        console.log(data);
        Object.keys(data).forEach((field) => {
          if (!excludedFields.includes(field)) {
            console.log("here");
            console.log("1", field);
            console.log("2", data[field]);
            const error = validationFunctions[field](data[field]);
            console.log(error);
            if (error) {
              console.log("herekjhasldkj");
              formErrorsExist = true;
              const updatedErrorMenuItems = formMenuErrors.menuItems;
              updatedErrorMenuItems[i] = {
                ...updatedErrorMenuItems[i],
                [field]: error,
              };
              setFormMenuErrors((prevErrors) => ({
                ...prevErrors,
                ["menuItems"]: updatedErrorMenuItems,
              }));
            }
          }
        });
      });

      const uploadlogo = await sendLogo();
      const uploadimgs = await sendRestaurantImages();

      if (
        categoryNameError !== "Category Name is required" &&
        logoError !== "Category logo is required" &&
        formErrorsExist === false &&
        uploadlogo === true &&
        uploadimgs === true
      ) {
        console.log("No errors. Proceeding further...");
        if (uploadlogo && uploadimgs) {
          setSuccess(true);
        }
      } else {
        console.log(
          "cne",
          categoryNameError,
          "le",
          logoError,
          "fee",
          formErrorsExist,
          "ul",
          uploadlogo,
          "ui",
          uploadimgs
        );
        setLoading(false);
        setSuccess(false);
        setEnableSubmit(true);
        alert("There are errors. Cannot proceed further.");
        return;
      }
    }
  };

  useEffect(() => {
    if (success) {
      const data = {
        name: categoryName,
        categoryLogo: FDRestaurantLogo,
        menuItems: formMenuData.menuItems,
      };
      dispatch(addData({ catInfo: data }));
      console.log(data);
      setCategoryName("");
      setSelectedCategoryLogo(null);
      setFormMenuData({
        menuItems: [
          {
            name: "",
            description: "",
            portion: "Single",
            price: { Single: "" },
            cuisineName: "",
            categoryName: "",
            nature: "",
            discountType: "",
            discountAmount: "",
            images: [],
          },
        ],
      });
      setFormMenuErrors({
        menuItems: [
          {
            name: "",
            description: "",
            portion: "",
            images: "",
            price: "",
            cuisineName: "",
            categoryName: "",
            nature: "",
            discountType: "",
            discountAmount: "",
          },
        ],
      });
      setSuccess(false);
      setLoading(false);
      setEnableSubmit(false);
      setCategoryNameError("");
      setCategoryLogoError("");
      setSelectedCategoryLogo(null);
      setFDRestaurantLogo(null);
      setFDRestaurantImg({});
      setImageUploadSuccess([]);
      setMenuCount(0);
      router.push("/restaurant/list");
    }
  }, [success]);
  return (
    <MainCard title={categoryName}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              label="Category Name"
              value={categoryName}
              onChange={(e) =>
                handleCategoryName("categoryName", e.target.value)
              }
              error={!!categoryNameError}
              helperText={categoryNameError}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    margin: "0 1rem 0 0",
                  }}
                >
                  Upload Category Logo*
                  {categoryLogoError ? (
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: "400",
                        margin: "3px 14px 0 14px",
                        color: "#ff4d4f",
                        lineHeight: "1.66",
                      }}
                    >
                      {categoryLogoError}
                    </span>
                  ) : (
                    ""
                  )}
                </Typography>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{}}
                  size="small"
                >
                  Upload Logo
                  <VisuallyHiddenInput
                    ref={uploadLogoInputRef}
                    type="file"
                    id="fileupload"
                    onChange={categoryLogoUpload} //function restaurantLogoUpload
                  />
                </Button>
              </div>
              <div style={{ textDecoration: "none" }}>
                {selectedCategoryLogo ? (
                  isUrlValid(selectedCategoryLogo) ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        key={selectedCategoryLogo}
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
                            src={selectedCategoryLogo}
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
                              onClick={() => setSelectedCategoryLogo(null)}
                            >
                              Delete
                            </button>
                            <a
                              href={selectedCategoryLogo}
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                        key={selectedCategoryLogo.id}
                      >
                        {selectedCategoryLogo.filename.match(
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
                              src={selectedCategoryLogo.fileimage}
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
                              fontSize: "13px",
                              fontWeight: 500,
                              lineHeight: "20px",
                              marginBottom: "8px",
                            }}
                          >
                            {selectedCategoryLogo.filename}
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
                            <span>Size : {selectedCategoryLogo.filesize}</span>
                          </p>
                          <div
                            cstyle={{
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
                                deleteRestaurantLogo(selectedCategoryLogo.id)
                              }
                            >
                              Delete
                            </button>
                            <a
                              href={selectedCategoryLogo.fileimage}
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
                              download={selectedCategoryLogo.filename}
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            marginBottom: "1rem",
          }}
        >
          Menu Information
        </Typography>
        {formMenuData.menuItems.map((menuItem, index) => (
          <div key={index}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  sx={{ width: "100%" }}
                  required
                  label="Name"
                  value={menuItem.name}
                  onChange={(e) => handleChange("name", e.target.value, index)}
                  error={!!formMenuErrors.menuItems[index].name}
                  helperText={formMenuErrors.menuItems[index].name}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  sx={{ width: "100%" }}
                  required
                  label="Description"
                  value={menuItem.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value, index)
                  }
                  error={!!formMenuErrors.menuItems[index].description}
                  helperText={formMenuErrors.menuItems[index].description}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  sx={{ width: "100%" }}
                  required
                  label="Cuisine Name"
                  value={menuItem.cuisineName}
                  onChange={(e) =>
                    handleChange("cuisineName", e.target.value, index)
                  }
                  error={!!formMenuErrors.menuItems[index].cuisineName}
                  helperText={formMenuErrors.menuItems[index].cuisineName}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  sx={{ width: "100%" }}
                  required
                  label="Category Name"
                  value={menuItem.categoryName}
                  onChange={(e) =>
                    handleChange("categoryName", e.target.value, index)
                  }
                  error={!!formMenuErrors.menuItems[index].categoryName}
                  helperText={formMenuErrors.menuItems[index].categoryName}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl
                  fullWidth
                  error={!!formMenuErrors.menuItems[index].nature}
                >
                  <InputLabel id={`demo-simple-select-label-${index}`}>
                    Nature of food
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label-${index}`}
                    id={`demo-simple-select-${index}`}
                    value={menuItem.nature}
                    label="Nature of food"
                    onChange={(e) =>
                      handleCouponChange("nature", e.target.value, index)
                    }
                  >
                    {nature.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>

                  {formMenuErrors.menuItems[index].nature ? (
                    <FormHelperText>
                      {formMenuErrors.menuItems[index].nature}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <div>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  margin: "1rem 0",
                }}
              >
                Portion & Price*
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <FormControl
                    fullWidth
                    error={!!formMenuErrors.menuItems[index].portion}
                  >
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      Portion
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={menuItem.portion}
                      label="Type of discount"
                      onChange={(e) =>
                        handlePortionChange("portion", e.target.value, index)
                      }
                    >
                      {portion.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>

                    {formMenuErrors.menuItems[index].portion ? (
                      <FormHelperText>
                        {formMenuErrors.menuItems[index].portion}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    label={
                      menuItem.portion === "Single"
                        ? "Price for Single"
                        : `Price for ${menuItem.portion.split("/")[0]}`
                    }
                    value={
                      menuItem.price.Single ||
                      menuItem.price[menuItem.portion.split("/")[0]]
                    }
                    onChange={(e) =>
                      handlePriceChange("price", e.target.value, index)
                    }
                    error={!!formMenuErrors.menuItems[index].price}
                    helperText={formMenuErrors.menuItems[index].price}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    label={
                      menuItem.portion === "Single" || ""
                        ? "Price for "
                        : `Price for ${menuItem.portion.split("/")[1]}`
                    }
                    value={
                      menuItem.portion === "Single"
                        ? ""
                        : menuItem.price[menuItem.portion.split("/")[1]] || ""
                    }
                    onChange={(e) =>
                      handlePriceChange("price1", e.target.value, index)
                    }
                    error={!!formMenuErrors.menuItems[index].price1}
                    helperText={formMenuErrors.menuItems[index].price1}
                    disabled={menuItem.portion === "Single"}
                  />
                </Grid>
              </Grid>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  margin: "1rem 0",
                }}
              >
                Discount on the item (if any)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl
                    fullWidth
                    error={!!formMenuErrors.menuItems[index].discountType}
                  >
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      Type of discount
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={menuItem.discountType}
                      label="Type of discount"
                      onChange={(e) =>
                        handleCouponChange(
                          "discountType",
                          e.target.value,
                          index
                        )
                      }
                    >
                      {discount.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>

                    {formMenuErrors.menuItems[index].discountType ? (
                      <FormHelperText>
                        {formMenuErrors.menuItems[index].discountType}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    label="Discount amount"
                    value={menuItem.discountAmount}
                    onChange={(e) =>
                      handleChange("discountAmount", e.target.value, index)
                    }
                    error={!!formMenuErrors.menuItems[index].discountAmount}
                    helperText={formMenuErrors.menuItems[index].discountAmount}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <div
                    style={{
                      margin: "2rem 0 1rem 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      Upload Dish Images (Max 3)*
                      {formMenuErrors.menuItems[index].images ? (
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "400",
                            margin: "3px 14px 0 14px",
                            color: "#ff4d4f",
                            lineHeight: "1.66",
                          }}
                        >
                          {formMenuErrors.menuItems[index].images}
                        </span>
                      ) : (
                        ""
                      )}
                    </Typography>

                    <div className="fileupload-view">
                      <div>
                        <div style={{ padding: "4px" }}>
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
                            Upload Images
                            <VisuallyHiddenInput
                              multiple
                              ref={uploadMenuImageInputRef}
                              type="file"
                              id="fileupload"
                              onChange={(event) => menuImgUpload(event, index)} //function restaurantLogoUpload
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {imageUploadSuccess.length !== 0 ? (
                    <div style={{ textDecoration: "none" }}>
                      {menuItem.images.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between ",
                          }}
                        >
                          {menuItem.images.map((data, k) => {
                            const fileimage = data;
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "15px",
                                }}
                                key={k}
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
                                    src={fileimage.fileimage || fileimage}
                                    alt=""
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div style={{ textDecoration: "none" }}>
                      {menuItem.images.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between ",
                          }}
                        >
                          {menuItem.images.map((data, k) => {
                            if (isUrlValid(data)) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  key={k}
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
                                          setFormMenuData((prevData) => {
                                            const updatedMenuItems = [
                                              ...prevData.menuItems,
                                            ];
                                            const updatedImages = [
                                              ...updatedMenuItems[index].images,
                                            ];
                                            updatedImages.splice(k, 1);
                                            updatedMenuItems[index] = {
                                              ...updatedMenuItems[index],
                                              images: updatedImages,
                                            };
                                            return {
                                              ...prevData,
                                              menuItems: updatedMenuItems,
                                            };
                                          });
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
                              );
                            } else {
                              const {
                                id,
                                filename,
                                filetype,
                                fileimage,
                                datetime,
                                filesize,
                              } = data;

                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  key={k}
                                >
                                  {filename.match(
                                    /.(jpg|jpeg|png|gif|svg)$/i
                                  ) || fileimage.match(/googleapis\.com/i) ? (
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
                                      {filename || ""}
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
                                      <span>Size : {filesize || ""}</span>
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
                                        onClick={() => deleteMenuImg(id, index)}
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
                              );
                            }
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
            {index < formMenuData.menuItems.length - 1 && (
              <hr style={{ margin: "2rem 0" }} />
            )}{" "}
            {/* Add hr if not the last item */}
          </div>
        ))}
        <hr style={{ margin: "2rem 0" }} />
        <Grid
          container
          spacing={2}
          sx={{ margin: "2rem 0", textAlign: "left", padding: "0 16px" }}
        >
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
              onClick={addAnotherDishItem}
            >
              Add Another Item
            </Button>
          </Grid>
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
              onClick={removeLastDishItem}
            >
              Remove Last Item
            </Button>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<RemoveCircleOutlineOutlinedIcon />}
              sx={{
                lineHeight: 0,
                letterSpacing: "1px",
                color: "black",
                borderColor: "black",
                "&:hover": { color: "grey", borderColor: "grey" },
              }}
              onClick={() => {
                dispatch(addData({}));
                router.back();
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
              onClick={finishCategory}
            >
              Finish & Save
            </Button>
          </Grid>
        </Grid>
      </div>
    </MainCard>
  );
}
