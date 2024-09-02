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
  Chip,
  MenuItem,
  Avatar,
  FormHelperText,
  Box,
  OutlinedInput,
  FormControl,
  ListSubheader,
  Paper,
  Card,
  CardHeader,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
import avatar1 from "../../assets/images/users/avatar-1.png";
import avatar2 from "../../assets/images/users/avatar-2.png";
import avatar3 from "../../assets/images/users/avatar-3.png";
import avatar4 from "../../assets/images/users/avatar-4.png";
import avatar5 from "../../assets/images/users/avatar-5.png";
export default function Member() {

  function createData(id, name, email, role, status) {
    return {
      id,
      name,
      email,
      role,
      status,
    };
  }

  const rows = [
    createData(1, "Freed", "freed@gamail.com", "Owner", "Joined"),
    createData(2, "Willion", "Willion@gamail.com", "Manager", "Joined"),
    createData(3, "Tison", "Tison@gamail.com", "Staff", "Invited"),
    createData(4, "Goerge", "Goerge@gamail.com", "Helper", "Invited"),
    createData(5, "Jackson", "Jackson@gamail.com", "Staff", "Invited"),
  ];

  const avatarMap = [avatar1, avatar2, avatar3, avatar4, avatar5];

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Member",
    },
    {
      id: "Role",
      numeric: false,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "Status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "button",
      numeric: false,
      disablePadding: false,
      label: "",
    },
  ];
  return (
    <MainCard >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <Typography variant="subtitle1" sx={{ padding: "20px" }}>
              Invite Team Members
            </Typography>
            <Divider />

            <Stack sx={{ padding: "20px" }}>
              <Typography variant="h4">
                5/10 member available in your plan
              </Typography>
              <Divider sx={{ margin: "20px 0" }} />
              <Stack direction="row" spacing={4}>
                <Stack spacing={1} sx={{ width: "50%" }}>
                  <InputLabel htmlFor="email-address">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-address"
                    type="email"
                    // value={values.email}
                    value=""
                    name="email"
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    // error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                <div style={{ alignSelf: "end" }}>
                  <Button variant="contained" sx={{ padding: "8px 22px" }}>
                    Send
                  </Button>
                </div>
              </Stack>
            </Stack>

            <Box sx={{ width: "100%" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                  >
                    <TableHead sx={{ backgroundColor: "rgb(250, 250, 250)" }}>
                      <TableRow>
                        <TableCell align="left" sx={{ padding: "10px 22px" }}>
                          Members
                        </TableCell> 
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="left" sx={{width:'10%'}}> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => {
                        return (
                          <TableRow hover tabIndex={-1} key={row.id} sx={{}}>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ padding: "10px 22px" }}
                            >
                              <Stack direction="row" spacing={2}>
                                <Avatar
                                  alt="profile user"
                                  src={avatarMap[index % avatarMap.length].src}
                                  sx={{ width: 40, height: 40 }}
                                />
                                <Stack>
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {row.name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {row.email}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <Chip
                                label={row.role}
                                sx={{
                                  color:
                                    row.role === "Owner"
                                      ? "rgb(255, 255, 255)"
                                      : row.role === "Manager"
                                      ? "rgb(19, 194, 194)"
                                      : row.role === "Staff"
                                      ? "rgb(250, 173, 20)"
                                      : row.role === "Helper"
                                      ? "rgb(82, 196, 26)"
                                      : "blue", // Fallback color if none match,
                                  backgroundColor:
                                    row.role === "Owner"
                                      ? "rgb(22, 119, 255)"
                                      : row.role === "Manager"
                                      ? "rgb(230, 255, 251)"
                                      : row.role === "Staff"
                                      ? "rgb(255, 251, 230)"
                                      : row.role === "Helper"
                                      ? "rgb(246, 255, 237)"
                                      : "rgb(246, 255, 237)",
                                  borderColor:
                                    row.role === "Owner"
                                      ? ""
                                      : row.role === "Manager"
                                      ? "rgb(92, 219, 211)"
                                      : row.role === "Staff"
                                      ? "rgb(255, 214, 102)"
                                      : row.role === "Helper"
                                      ? "rgb(149, 222, 100)"
                                      : "rgb(149, 222, 100)",
                                  fontSize: "0.8rem",
                                  height: "24px",
                                  whiteSpace: "nowrap",
                                  transition:
                                    "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              {row.status === "Invited" ? (
                                <Button
                                  variant="test"
                                  sx={{
                                    color: "rgb(168, 7, 26)",
                                    fontSize: "0.8rem",
                                    "&:hover": { backgroundColor: "#efe4e5" },
                                    marginRight: "1rem",
                                  }}
                                >
                                  Resend
                                </Button>
                              ) : (
                                ""
                              )}
                              <Chip
                                label={row.status}
                                sx={{
                                  color:
                                    row.status === "Joined"
                                      ? "white"
                                      : row.status === "Invited"
                                      ? "rgb(19, 194, 194)"
                                      : "rgb(82, 196, 26)",
                                  backgroundColor:
                                    row.status === "Joined"
                                      ? "rgb(82, 196, 26)"
                                      : row.status === "Invited"
                                      ? "transparent"
                                      : "rgb(246, 255, 237)",
                                  borderColor:
                                    row.status === "Joined"
                                      ? ""
                                      : row.status === "Invited"
                                      ? "#59d4d4"
                                      : "rgb(149, 222, 100)",
                                  border: "1px solid",
                                  fontSize: "0.8rem",
                                  height: "24px",
                                  whiteSpace: "nowrap",
                                  transition:
                                    "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              />
                            </TableCell>
                            <TableCell align="center" >
                              <MoreHorizIcon
                                sx={{
                                  width: 18,
                                  height: 18,
                                  color: "rgb(140, 140, 140)",
                                  cursor: "pointer",
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>

          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
}
