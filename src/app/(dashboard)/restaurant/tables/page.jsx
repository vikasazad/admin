// "use client";
// import { React } from "react";
// import { Grid, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Box, Chip, Table, TableBody, TableCell, TableHead, TableRow   } from "@mui/material";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// // project import
// import MainCard from "../../../components/MainCard";
// import { borderRadius } from "@mui/system";

// export default function TableInfo() {
//   const tableStatus = [
//     "Available", //color = rgb(255, 255, 255), background-color: rgb(22, 119, 255),
//     "Reserved", //color: rgb(255, 255, 255);background-color:rgb(255, 77, 79);
//     "Occupied",//color: rgb(255, 255, 255);background-color:rgb(82, 196, 26);
//   ];

//   const orderStatus = [
//     "Ordering",//color = rgb(19, 194, 194), background-color: rgb(230, 255, 251),border-color: rgb(92, 219, 211);
//     "Order Placed",//rgb(194, 194, 19), background-color: rgb(255, 251, 230),border-color: rgb(219, 211, 92);
//     "In Progress",//color = rgb(140, 19, 194), background-color: rgb(251, 230, 255),border-color: rgb(166, 92, 219);
//     "Served",//color = rgb(82, 196, 26), background-color: rgb(246, 255, 237),border-color: rgb(149, 222, 100);
//     "Billed",//color = rgb(250, 173, 20), background-color: rgb(255, 251, 230),border-color: rgb(255, 214, 102);
//     "Payment Pending",//color = rgb(194, 19, 140), background-color: rgb(255, 230, 244) ,border-color: rgb(219, 92, 166);
//     "Paid",//color = rgb(255, 255, 255), background-color: rgb(22, 119, 255),border-color: rgb(92, 219, 211);
//     " ",//color = rgb(255, 77, 79), background-color: rgb(255, 241, 240),border-color: rgb(255, 163, 158);
//   ];

//   return (
//     <MainCard
//       sx={{
//         backgroundColor: "#f2f2f2",
//         padding: "0",
//         ".css-1v9be3b-MuiCardContent-root": { padding: "10px" },
//         overflowX: { xs: "auto", md: "auto" },
//         whiteSpace: { xs: "nowrap", md: "nowrap" },
//       }}
//     >
//       <Box sx={{ overflowX: "auto" }}>
//         <Grid
//           container
//           sx={{
//             backgroundColor: "white",
//             padding: "1rem",
//             borderRadius: "10px",
//             minWidth: "800px",
//           }}
//         >
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//               Table No.
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Order No
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Status
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Occupancy
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Waitstaff
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Duration
//             </Typography>
//           </Grid>
//           <Grid item lg={1.7} xs={1.7}>
//             <Typography variant="h6" sx={{ fontWeight: "700" }}>
//             Order Status
//             </Typography>
//           </Grid>
//         </Grid>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: "700", margin: "2rem 0 1rem 1rem", color: "#6a6666" }}
//         >
//           New Booking ( 1 )
//         </Typography>
//         <Stack spacing={2} sx={{ minWidth: "800px",borderRadius:'10px'}}>
//           <Accordion square={true} sx={{ borderRadius: "10px", boxShadow:'none'  }}>
//             <AccordionSummary aria-controls="panel1-content" id="panel1-header">
//               <Grid container>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     1
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     #2256
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='Available' sx={{
//                             color:"rgb(255, 255, 255)",
//                             backgroundColor:"rgb(22, 119, 255)",
//                             borderColor:"",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             '&hover':{
//                               backgroundColor:"black",
//                              }}
//                              }/>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                 <Stack direction="row" sx={{ alignItems: "center" }}>
//                     <PermIdentityOutlinedIcon fontSize="small" />
//                     <Typography variant="subtitle1" >
//                       2
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>

//                     <Typography variant="subtitle1" >
//                       Vikram
//                     </Typography>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                  <div >
//                  <Typography variant="subtitle1" >
//                     00:00:00
//                   </Typography>
//                   <Typography variant="caption" >
//                     02:30 PM
//                   </Typography>
//                  </div>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='Ordering' sx={{
//                             color:"rgb(19, 194, 194)",
//                             backgroundColor:"rgb(230, 255, 251)",
//                             borderColor:"rgb(92, 219, 211)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis" }}
//                             />
//                 </Grid>
//               </Grid>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Box sx={{ margin: 1 }}>
//               <Typography variant="h5" gutterBottom component="div">
//                   History
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "700",
//                     margin: "1rem 0 1rem 1rem",
//                     color: "#6a6666",
//                   }}
//                 >
//                   Food
//                 </Typography>
//                 <Table size="small" aria-label="purchases">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Time</TableCell>
//                       <TableCell>Special Req.</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Amount</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Chicken Curry with apple juice
//                       </TableCell>
//                       <TableCell>02:50 PM</TableCell>
//                       <TableCell>with cold water</TableCell>
//                       <TableCell>
//                         <Chip label='Order Placed'
//                           sx={{
//                             color:"rgb(194, 194, 19)",
//                             backgroundColor:"rgb(255, 251, 230)",
//                             borderColor:"rgb(219, 211, 92)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}/>
//                       </TableCell>
//                       <TableCell>$199.66</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Pineapple and enchove pizza with cheese
//                       </TableCell>
//                       <TableCell>03:44 PM</TableCell>
//                       <TableCell>with cold water</TableCell>

//                       <TableCell>
//                         <Chip label='In Progress'
//                           sx={{
//                             color:"rgb(140, 19, 194)",
//                             backgroundColor:"rgb(251, 230, 255)",
//                             borderColor:"rgb(166, 92, 219)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}/>
//                       </TableCell>
//                       <TableCell>$99.66</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion square={true} sx={{ borderRadius: "10px" , boxShadow:'none' }}>
//             <AccordionSummary aria-controls="panel1-content" id="panel1-header">
//               <Grid container>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     1
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     #2256
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='Reserved' sx={{
//                             color:"rgb(255, 255, 255)",
//                             backgroundColor:"rgb(255, 77, 79)",
//                             borderColor:"",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis"
//                             }}/>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                 <Stack direction="row" sx={{ alignItems: "center" }}>
//                     <PermIdentityOutlinedIcon fontSize="small" />
//                     <Typography variant="subtitle1" >
//                       2
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>

//                     <Typography variant="subtitle1" >
//                       Vikram
//                     </Typography>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                  <div >
//                  <Typography variant="subtitle1" >
//                     00:00:00
//                   </Typography>
//                   <Typography variant="caption" >
//                     02:30 PM
//                   </Typography>
//                  </div>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='Payment Pending' sx={{
//                             color:"rgb(19, 34, 94)",
//                             backgroundColor:"rgb(230, 230, 251)",
//                             borderColor:"rgb(92, 102, 158)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis" }}
//                             />
//                 </Grid>
//               </Grid>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Box sx={{ margin: 1 }}>
//               <Typography variant="h5" gutterBottom component="div">
//                   History
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "700",
//                     margin: "1rem 0 1rem 1rem",
//                     color: "#6a6666",
//                   }}
//                 >
//                   Food
//                 </Typography>
//                 <Table size="small" aria-label="purchases">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Time</TableCell>
//                       <TableCell>Special Req.</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Amount</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Chicken Curry with apple juice
//                       </TableCell>
//                       <TableCell>02:50 PM</TableCell>
//                       <TableCell>with cold water</TableCell>
//                       <TableCell>
//                         <Chip label='Served'
//                           sx={{
//                             color:"rgb(82, 196, 26)",
//                             backgroundColor:"rgb(246, 255, 237)",
//                             borderColor:"rgb(149, 222, 100)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }
//                           }/>
//                       </TableCell>
//                       <TableCell>$199.66</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Pineapple and enchove pizza with cheese
//                       </TableCell>
//                       <TableCell>03:44 PM</TableCell>
//                       <TableCell>with cold water</TableCell>

//                       <TableCell>
//                         <Chip label='Billed'
//                           sx={{
//                             color:"rgb(250, 173, 20)",
//                             backgroundColor:"rgb(255, 251, 230)",
//                             borderColor:"rgb(255, 214, 102)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }
//                           }/>
//                       </TableCell>
//                       <TableCell>$99.66</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion square={true} sx={{ borderRadius: "10px" , boxShadow:'none' }}>
//             <AccordionSummary aria-controls="panel1-content" id="panel1-header">
//               <Grid container>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     1
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Typography variant="subtitle1" >
//                     #2256
//                   </Typography>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='Occupied' sx={{
//                             color:"rgb(255, 255, 255)",
//                             backgroundColor:"rgb(82, 196, 26)",
//                             borderColor:"",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis" }}
//                             />
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                 <Stack direction="row" sx={{ alignItems: "center" }}>
//                     <PermIdentityOutlinedIcon fontSize="small" />
//                     <Typography variant="subtitle1" >
//                       2
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>

//                     <Typography variant="subtitle1" >
//                       Vikram
//                     </Typography>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                  <div >
//                  <Typography variant="subtitle1" >
//                     00:00:00
//                   </Typography>
//                   <Typography variant="caption" >
//                     02:30 PM
//                   </Typography>
//                  </div>

//                 </Grid>
//                 <Grid item lg={1.7} xs={1.7}>
//                   <Chip label='View' sx={{
//                             color:"black",
//                             backgroundColor:"rgb(246, 255, 237)",
//                             borderColor:"rgb(149, 222, 100)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis" }}
//                             />
//                 </Grid>
//               </Grid>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Box sx={{ margin: 1 }}>
//               <Typography variant="h5" gutterBottom component="div">
//                   History
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "700",
//                     margin: "1rem 0 1rem 1rem",
//                     color: "#6a6666",
//                   }}
//                 >
//                   Food
//                 </Typography>
//                 <Table size="small" aria-label="purchases">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Time</TableCell>
//                       <TableCell>Special Req.</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Amount</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Chicken Curry with apple juice
//                       </TableCell>
//                       <TableCell>02:50 PM</TableCell>
//                       <TableCell>with cold water</TableCell>
//                       <TableCell>
//                         <Chip label='Paid'
//                           sx={{
//                             color:"rgb(19, 94, 19) ",
//                             backgroundColor:"rgb(230, 251, 230) ",
//                             borderColor:"rgb(92, 158, 92)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }
//                           }/>
//                       </TableCell>
//                       <TableCell>$199.66</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th" scope="row">
//                         Pineapple and enchove pizza with cheese
//                       </TableCell>
//                       <TableCell>03:44 PM</TableCell>
//                       <TableCell>with cold water</TableCell>

//                       <TableCell>
//                         <Chip label='Cancelled'
//                           sx={{
//                             color:"rgb(255, 77, 79)",
//                             backgroundColor:"rgb(255, 241, 240)",
//                             borderColor:"rgb(255, 163, 158)",
//                             fontSize: "0.8rem",
//                             height: "24px",
//                             whiteSpace: "nowrap",
//                             transition:
//                               "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
//                             borderRadius: "4px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}

//                         />
//                       </TableCell>
//                       <TableCell>$99.66</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         </Stack>
//       </Box>
//     </MainCard>
//   );
// }

"use client";
import { React, useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LiveTable from "./liveTable";
import HistoryTable from "./historyTable";
import MainCard from "../../../components/MainCard";
import View from "./view";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRoomInformation,
  handleTablesInformation,
} from "../../../features/firestoreMultipleData";
import { useSession } from "next-auth/react";

export default function RoomInfo() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const dispatch = useDispatch();
  const info = useSelector((state) => state.firestoreMultipleData);
  const [value, setValue] = useState(0);
  const [tableInfo, setTableInfo] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        handleTablesInformation({
          email: user.email,
        })
      );
    }
  }, [dispatch, user, status]);

  // if (status === "loading") return <div>Loading...</div>;
  // if (status === "failed") return <div>Error loading data</div>;
  useEffect(() => {
    if (info?.status === "succeeded") {
      setTableInfo(info.data);
      // console.log(info.data);
    }
  }, [info]);
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {tableInfo && (
        <MainCard>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Live" {...a11yProps(1)} />
                <Tab label="History" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <View data={tableInfo.overview} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LiveTable data={tableInfo.live} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <HistoryTable data={tableInfo.history} />
            </CustomTabPanel>
          </Box>
        </MainCard>
      )}
    </>
  );
}
