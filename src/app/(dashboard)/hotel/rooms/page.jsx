"use client";
import { React } from "react";
import {
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// project import
import MainCard from "../../../components/MainCard";

const roomStatus = [
  "Available", //color = rgb(255, 255, 255), background-color: rgb(22, 119, 255), 
  "Booked", //color: rgb(255, 255, 255);background-color:rgb(255, 77, 79),
  "Occupied",//color: rgb(255, 255, 255);background-color:rgb(82, 196, 26),
  'Cleaning', //color: rgb(255, 255, 255);background- color:rgb(63 81 181),
  'Checked Out', //color: rgb(255, 255, 255);background- color  :rgb(22, 119, 255),
  'Upgraded', //color: rgb(255, 255, 255);background-color:rgb(205 220 57);
  'Paid', //color: rgb(255, 255, 255);background-color: rgb(233 30 99);
];

const orderStatus = [
  "Ordering",//color = rgb(19, 194, 194), background-color: rgb(230, 255, 251),border-color: rgb(92, 219, 211); 
  "Order Placed",//rgb(194, 194, 19), background-color: rgb(255, 251, 230),border-color: rgb(219, 211, 92); 
  "In Progress",//color = rgb(140, 19, 194), background-color: rgb(251, 230, 255),border-color: rgb(166, 92, 219); 
  "Served",//color = rgb(82, 196, 26), background-color: rgb(246, 255, 237),border-color: rgb(149, 222, 100); 
  "Billed",//color = rgb(250, 173, 20), background-color: rgb(255, 251, 230),border-color: rgb(255, 214, 102); 
  "Payment Pending",//color = rgb(19, 34, 94), background-color: rgb(230, 230, 251) ,border-color: rgb(92, 102, 158); 
  "Paid",//color = rgb(19, 94, 19), background-color: rgb(230, 251, 230),border-color: rgb(92, 158, 92) ; 
  "Cancelled",//color = rgb(255, 77, 79), background-color: rgb(255, 241, 240),border-color: rgb(255, 163, 158); 
];

const services = [
  'Requested', //color = rgb(255, 255, 255), background-color: rgb(22, 119, 255),
  'Accepted', //color = rgb(255, 255, 255), background-color: rgb(63 81 181),
  'Denied',//color: rgb(255, 255, 255);background-color:rgb(255, 77, 79);
  'Completed', //color = rgb(255, 255, 255), background-color: rgb(82, 196, 26),
  'Paid'//color: rgb(255, 255, 255);background-color: rgb(233 30 99);
] 
const Issues = [
  'Opened', //color = rgb(255, 255, 255), background-color: rgb(22, 119, 255),
  'Assigned', //color = rgb(255, 255, 255), background-color: rgb(63 81 181),
  'Fixing Required', //color: rgb(255, 255, 255);background-color:rgb(255, 77, 79);
  'Completed' //color = rgb(255, 255, 255), background-color: rgb(82, 196, 26),
]

export default function RoomInfo() {
  return (
    <MainCard
      sx={{
        backgroundColor: "#f2f2f2",
        padding: "0",
        ".css-1v9be3b-MuiCardContent-root": { padding: "10px" },
        overflowX: { xs: "auto", md: "auto" },
        whiteSpace: { xs: "nowrap", md: "nowrap" },
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "10px",
            minWidth: "800px",
          }}
        >
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Room No.
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Name
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Check In
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Check Out
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              People
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Amount
            </Typography>
          </Grid>
          <Grid item lg={1.7} xs={1.7}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Status
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            margin: "2rem 0 1rem 1rem",
            color: "#6a6666",
          }}
        >
          New Booking ( 1 )
        </Typography>
        <Stack spacing={2} sx={{ minWidth: "800px" }}>
          <Accordion square={false} sx={{ borderRadius: "20px" }}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Grid container>
                <Grid item lg={1.7} xs={1.7}>
                  <Typography variant="subtitle1" >
                    Accordion 1
                  </Typography>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                  <Typography variant="subtitle1" >
                    Super Dulexe
                  </Typography>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                  <Typography variant="subtitle1" >
                    20/11/2012
                  </Typography>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                  <Typography variant="subtitle1" >
                    20/11/2013
                  </Typography>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                  <Stack direction="row" sx={{ alignItems: "center" }}>
                    <PermIdentityOutlinedIcon fontSize="small" />
                    <Typography variant="subtitle1" >
                      2
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                  <Typography variant="subtitle1" >
                    $299
                  </Typography>
                </Grid>
                <Grid item lg={1.7} xs={1.7}>
                <Chip label='Available' sx={{
                            color:"rgb(255, 255, 255)",
                            backgroundColor:"rgb(22, 119, 255)",
                            borderColor:"",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h5" gutterBottom component="div">
                  History
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    margin: "1rem 0 1rem 1rem",
                    color: "#6a6666",
                  }}
                >
                  Food
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Chicken Curry with apple juice
                      </TableCell>
                      <TableCell>02:50 PM</TableCell>
                      <TableCell>
                      <Chip label='Reserved' sx={{
                            color:"rgb(255, 255, 255)",
                            backgroundColor:"rgb(255, 77, 79)",
                            borderColor:"",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$199.66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Oreo Smoothy
                      </TableCell>
                      <TableCell>07:44 PM</TableCell>
                      <TableCell>
                      <Chip label='Occupied' sx={{
                            color:"rgb(255, 255, 255)",
                            backgroundColor:"rgb(82, 196, 26)",
                            borderColor:"",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$19.66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Pineapple and enchove pizza with cheese
                      </TableCell>
                      <TableCell>03:44 PM</TableCell>
                      <TableCell>
                      <Chip label='Ordering' sx={{
                            color:"rgb(19, 194, 194)",
                            backgroundColor:"rgb(230, 255, 251)",
                            borderColor:"rgb(92, 219, 211)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$99.66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Dal Makhni 
                      </TableCell>
                      <TableCell>06:44 PM</TableCell>
                      <TableCell>
                      <Chip label='Order Placed' sx={{
                            color:"rgb(194, 194, 19)",
                            backgroundColor:"rgb(255, 251, 230)",
                            borderColor:"rgb(219, 211, 92)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$49.66</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    margin: "1rem 0 1rem 1rem",
                    color: "#6a6666",
                  }}
                >
                  Services
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Shoe Shining
                      </TableCell>
                      <TableCell>02:50 PM</TableCell>
                      <TableCell>Black hoeshining at 3:00PM</TableCell>
                      <TableCell>Laundry And Dry Cleaning</TableCell>
                      <TableCell>
                      <Chip label='In Progress' sx={{
                            color:"rgb(140, 19, 194)",
                            backgroundColor:"rgb(251, 230, 255)",
                            borderColor:"rgb(166, 92, 219)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$199.66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Yoga
                      </TableCell>
                      <TableCell>02:50 PM</TableCell>
                      <TableCell>
                        Yoga class timing in the morning 6:00 AM
                      </TableCell>
                      <TableCell>Wellness</TableCell>
                      <TableCell>
                      <Chip label='Served' sx={{
                            color:"rgb(82, 196, 26)",
                            backgroundColor:"rgb(246, 255, 237)",
                            borderColor:"rgb(149, 222, 100)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>Free</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Personal tour
                      </TableCell>
                      <TableCell>02:50 PM</TableCell>
                      <TableCell>
                        Personal tour for 3 people at chandani chowk{" "}
                      </TableCell>
                      <TableCell>Tour</TableCell>
                      <TableCell>
                      <Chip label='Billed' sx={{
                            color:"rgb(250, 173, 20)",
                            backgroundColor:"rgb(255, 251, 230)",
                            borderColor:"rgb(255, 214, 102)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                      <TableCell>$999.66</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    margin: "1rem 0 1rem 1rem",
                    color: "#6a6666",
                  }}
                >
                  Issues
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Staff Assigned</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Functionaity
                      </TableCell>
                      <TableCell>LEd not working</TableCell>
                      <TableCell>11:28 AM</TableCell>
                      <TableCell>Vikram</TableCell>
                      <TableCell>
                      <Chip label='Payment Pending' sx={{
                            color:"rgb(19, 34, 94)",
                            backgroundColor:"rgb(230, 230, 251)",
                            borderColor:"rgb(92, 102, 158)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Ameities
                      </TableCell>
                      <TableCell>Bathroom is derty</TableCell>
                      <TableCell>12:28 PM</TableCell>
                      <TableCell>Nilesh</TableCell>
                      <TableCell>
                      <Chip label='Paid' sx={{
                            color:"rgb(19, 94, 19)",
                            backgroundColor:"rgb(230, 251, 230)",  
                            borderColor:"rgb(92, 158, 92) ",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Ameities
                      </TableCell>
                      <TableCell>Mini Bar not working</TableCell>
                      <TableCell>10:28 AM</TableCell>
                      <TableCell>Vikram</TableCell>
                      <TableCell>
                      <Chip label='Cancelled' sx={{
                            color:"rgb(255, 77, 79)",
                            backgroundColor:"rgb(255, 241, 240)",  
                            borderColor:"rgb(255, 163, 158)",
                            fontSize: "0.8rem",
                            height: "24px",
                            whiteSpace: "nowrap",
                            transition:
                              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&hover':{
                              backgroundColor:"black",
                             }}
                             }/>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    margin: "1rem 0 1rem 1rem",
                    color: "#6a6666",
                  }}
                >
                  Special Requirements & Arrangements
                </Typography>
                <div
                  style={{
                    display: "block",
                    overflow: "hidden", // Ensure content does not overflow the div
                    textOverflow: "ellipsis", // Add ellipsis if the text is too long
                    whiteSpace: "normal", // Allow text to wrap within the div
                    wordWrap: "break-word", // Break long words to prevent overflow
                  }}
                >
                  <Typography variant="subtitle2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Corrupti, natus quasi maxime, veniam harum, nesciunt totam
                    reiciendis sequi ipsa pariatur magni doloremque recusandae
                    quo temporibus illo cumque? Eveniet dolor numquam itaque
                    totam excepturi deleniti hic odio corrupti dolores
                    voluptatibus eos nobis sed quod tenetur vero, nisi ullam
                    harum voluptates officia.
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </MainCard>
  );
}
