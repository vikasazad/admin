// import React from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import CollapsibleBookingTable from "../../../pages/table/CollapsibleBookingTable";
// import CollapsibleDiningTable from "../../../pages/table/CollapsibleDiningTable";
// import CollapsibleServicesTable from "../../../pages/table/CollapsibleServicesTable";
// import CollapsibleIssuesTable from "../../../pages/table/CollapsibleIssuesTable";

// const HistoryRoom = ({ roomData }) => {
//   const {
//     customer,
//     bookingDetails,
//     servicesUsed,
//     diningDetails,
//     issuesReported,
//   } = roomData;

//   return (
//     <Box sx={{ width: "100%", mb: 2 }}>
//       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Customer Information
//         </Typography>
//         <Typography>Name: {customer.name}</Typography>
//         <Typography>Email: {customer.email}</Typography>
//         <Typography>Phone: {customer.phone}</Typography>
//         <Typography>Address: {customer.address}</Typography>
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Booking Details
//         </Typography>
//         <CollapsibleBookingTable bookingDetails={bookingDetails} />
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Services Used
//         </Typography>
//         <CollapsibleServicesTable data={servicesUsed} />
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Dining Details
//         </Typography>
//         <CollapsibleDiningTable data={diningDetails.orders} />
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Issues Reported
//         </Typography>
//         <CollapsibleIssuesTable data={issuesReported} />
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Special Requirements
//         </Typography>
//         <Typography>{bookingDetails.specialRequirements}</Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default HistoryRoom;

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import StatusChip from "../../../utils/StatusChip";
import CollapsibleDiningTable from "../../../pages/table/CollapsibleDiningTable";
import CollapsibleServicesTable from "../../../pages/table/CollapsibleServicesTable";
import CollapsibleIssuesTable from "../../../pages/table/CollapsibleIssuesTable";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "roomNo",
    numeric: false,
    disablePadding: true,
    label: "Room No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "checkIn",
    numeric: true,
    disablePadding: false,
    label: "Check In",
  },
  {
    id: "checkOut",
    numeric: true,
    disablePadding: false,
    label: "Check Out",
  },
  {
    id: "attendant",
    numeric: false,
    disablePadding: false,
    label: "Attendant",
  },
  {
    id: "people",
    numeric: true,
    disablePadding: false,
    label: "People",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        History
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.roomNo}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">
          {new Date(row.checkIn).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">
          {new Date(row.checkOut).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{row.attendant}</TableCell>
        <TableCell align="right">{row.people}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">
          <StatusChip value={row.status} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <CollapsibleDiningTable data={row.diningDetails} />
              <CollapsibleServicesTable data={row.servicesUsed} />
              <CollapsibleIssuesTable data={row.issuesReported} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ data }) {
  // console.log("History", data);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const data = [
  //   {
  //     location: "101",
  //     customer: {
  //       name: "John Doe",
  //       email: "john.doe@email.com",
  //       phone: "+1234567890",
  //       address: "lorem ipsum lipsum lorem",
  //     },
  //     bookingDetails: {
  //       source: "makeMyTrip",
  //       checkIn: "2024-09-20T14:00:00Z",
  //       checkOut: "2024-09-23T11:00:00Z",
  //       noOfGuests: 2,
  //       specialRequirements: "Late check-out requested",
  //       bookingId: "BO:123",
  //       dateOfBooking: "",
  //       attendant: "Mishra",
  //     },
  //     servicesUsed: {
  //       massage: {
  //         serviceId: "SE:123",
  //         status: "in progress",
  //         serviceName: "Swedish Massage",
  //         type: "massage",
  //         requestTime: "2024-09-21T10:00:00Z",
  //         startTime: "2024-09-21T14:00:00Z",
  //         endTime: "2024-09-21T15:00:00Z",
  //         price: 80,
  //         attendant: "Sarah Johnson",
  //         payment: {
  //           transctionId: "XUSie83",
  //           paymentStatus: "pending",
  //           mode: "room charge",
  //           paymentId: "SPA24092101",
  //           price: 80,
  //           priceAfterDiscount: 72,
  //           discount: {
  //             type: "percentage",
  //             amount: 10,
  //             code: "SPAWEEKEND",
  //           },
  //         },
  //       },
  //     },
  //     diningDetails: {
  //       orders: [
  //         {
  //           specialRequirement: "Make pina collada extra sour",
  //           items: [
  //             {
  //               itemId: "kdi2",
  //               itemName: "Club Sandwich",
  //               portionSize: "Regular",
  //               price: 15,
  //             },
  //             {
  //               itemId: "iosn3r3",
  //               itemName: "Caesar Salad",
  //               portionSize: "Large",
  //               price: 12,
  //             },
  //           ],

  //           orderId: "OR:RO24",
  //           attendant: "Michael Brown",
  //           status: "completed",
  //           payment: {
  //             transctionId: "XUSie83",
  //             paymentStatus: "pending",
  //             mode: "room charge",
  //             paymentId: "RO24092101",
  //             price: 27,
  //             priceAfterDiscount: 27,
  //             discount: {
  //               type: "none",
  //               amount: 0,
  //               code: "",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     issuesReported: {
  //       maintenance: {
  //         issueId: "IS:123",
  //         status: "Completed",
  //         category: "maintenance",
  //         name: "Leaky Faucet",
  //         description: "Bathroom sink faucet is dripping",
  //         reportTime: "2024-09-21T20:30:00Z",
  //         resolutionTime: "2024-09-22T09:15:00Z",
  //         attendant: "Robert Lee",
  //       },
  //     },
  //     status: "Checked Out",
  //     payment: {
  //       mode: "credit card",
  //       paymentId: "BOO24092001",
  //       price: 750,
  //       priceAfterDiscount: 675,
  //       discount: {
  //         type: "percentage",
  //         amount: 10,
  //         code: "SUMMER10",
  //       },
  //     },
  //   },
  // ];

  function createData(
    roomNo,
    name,
    checkIn,
    checkOut,
    attendant,
    people,
    amount,
    status,
    diningDetails,
    servicesUsed,
    issuesReported
  ) {
    return {
      roomNo,
      name,
      checkIn,
      checkOut,
      attendant,
      people,
      amount,
      status,
      diningDetails,
      servicesUsed,
      issuesReported,
    };
  }

  const rows = [];

  data.forEach((booking) => {
    const roomNo = booking.bookingDetails.location; // Room number
    const name = booking.bookingDetails.customer.name; // Customer name
    const checkIn = booking.bookingDetails.checkIn; // Check-in date
    const checkOut = booking.bookingDetails.checkOut; // Check-out date
    const attendant = booking.bookingDetails.attendant || "N/A"; // Attendant
    const people = booking.bookingDetails.noOfGuests; // Number of guests
    const amount = booking.bookingDetails.payment.priceAfterDiscount; // Payment amount after discount
    const status = booking.bookingDetails.status; // Booking status
    const diningDetails = booking.diningDetails.orders;
    const servicesUsed = booking.servicesUsed;
    const issuesReported = booking.issuesReported;

    rows.push(
      createData(
        roomNo,
        name,
        checkIn,
        checkOut,
        attendant,
        people,
        amount,
        status,
        diningDetails,
        servicesUsed,
        issuesReported
      )
    );
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: 0 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table aria-label="collapsible table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
