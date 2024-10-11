import MainCard from "../../../components/MainCard";
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
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import BedroomParentOutlinedIcon from "@mui/icons-material/BedroomParentOutlined";
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import BabyChangingStationOutlinedIcon from "@mui/icons-material/BabyChangingStationOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";

export default function Service() {
  const colors = [
    "#ffafcc",
    "#cdb4db",
    "#f08080",
    "#e9ff70",
    "#ff9770",
    "#7bf1a8",
    "#7161ef",
    "#e8d1c5",
    "#fe5d9f",
    "#9cadce",
    "#f4f482",
    "#ff9b85",
    "#e27396",
    "#f7aef8",
  ];
  return (
    <MainCard>
      <div>
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05)" },
              }}
            >
              <Link
                href="service/roomupgrades"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <BedroomParentOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                    }}
                  >
                    Room Upgrades
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/wellness"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <SelfImprovementOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Wellness
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/recreational"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <FitnessCenterOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Recreational
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/transportation"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <LocalTaxiOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Transportation
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/personalshopping"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <ShoppingBasketOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Personal Shopping
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/laundry"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <DryCleaningOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Laundry and Dry Cleaning
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/tours"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <TourOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tours
                  </span>
                </div>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                boxShadow: " 0 1px 2px rgba(0,0,0,0.15)",
                borderRadius: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05, 1.05) " },
              }}
            >
              <Link
                href="service/business"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    padding: "0.2rem 1rem",
                  }}
                >
                  <div>
                    <PrintOutlinedIcon
                      sx={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Business
                  </span>
                </div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </MainCard>
  );
}
