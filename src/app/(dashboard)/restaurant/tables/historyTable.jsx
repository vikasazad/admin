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
import CollapsibleRestaurantTable from "../../../pages/table/CollapsibleRestaurantTable";
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
    id: "tableNo",
    numeric: false,
    disablePadding: true,
    label: "Table No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "timeSeated",
    numeric: true,
    disablePadding: false,
    label: "Time Seated",
  },
  {
    id: "timeLeft",
    numeric: true,
    disablePadding: false,
    label: "Time Left",
  },
  {
    id: "attendant",
    numeric: false,
    disablePadding: false,
    label: "attendant",
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
          {row.tableNo}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">
          {new Date(row.timeSeated).toLocaleTimeString()}
        </TableCell>
        <TableCell align="right">
          {new Date(row.timeLeft).toLocaleTimeString()}
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
              <CollapsibleRestaurantTable data={row.diningDetails} />
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

  function createData(
    tableNo,
    name,
    timeSeated,
    timeLeft,
    attendant,
    people,
    amount,
    status,
    diningDetails,
    issuesReported
  ) {
    return {
      tableNo,
      name,
      timeSeated,
      timeLeft,
      attendant,
      people,
      amount,
      status,
      diningDetails,
      issuesReported,
    };
  }

  const rows = [];

  data.forEach((booking) => {
    const tableNo = booking.diningDetails.location; // Room number
    const name = booking.diningDetails.customer.name; // Customer name
    const timeSeated = booking.diningDetails.timeSeated; // Check-in date
    const timeLeft = booking.diningDetails.timeLeft; // Check-out date
    const attendant = booking.diningDetails.attendant || "N/A"; // Attendant
    const people = booking.diningDetails.noOfGuests; // Number of guests
    const amount = booking.diningDetails.payment.priceAfterDiscount; // Payment amount after discount
    const status = booking.diningDetails.status; // Booking status
    const diningDetails = booking.diningDetails.orders;
    const issuesReported = booking.issuesReported;

    rows.push(
      createData(
        tableNo,
        name,
        timeSeated,
        timeLeft,
        attendant,
        people,
        amount,
        status,
        diningDetails,
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
