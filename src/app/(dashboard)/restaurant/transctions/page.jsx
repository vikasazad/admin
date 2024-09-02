"use client";
import * as React from "react";
import MainCard from "../../../components/MainCard";
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
  Container,
  Divider,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Popover from "@mui/material/Popover";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
dayjs;
function createData(
  date,
  room,
  attendant,
  orderId,
  paymentId,
  promotionId,
  discountPercentage,
  discount,
  amount,
  finalAmount
) {
  return {
    date,
    room,
    attendant,
    orderId,
    paymentId,
    promotionId,
    discountPercentage,
    discount,
    amount,
    finalAmount,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3, 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9, 305, 3.7, 67, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0, 305, 3.7, 67, 4.3),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0, 305, 3.7, 67, 4.3),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9, 305, 3.7, 67, 4.3),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5, 305, 3.7, 67, 4.3),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3, 305, 3.7, 67, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0, 305, 3.7, 67, 4.3),
  createData(9, "KitKat", 518, 26.0, 65, 7.0, 305, 3.7, 67, 4.3),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0, 305, 3.7, 67, 4.3),
  createData(11, "Marshmallow", 318, 0, 81, 2.0, 305, 3.7, 67, 4.3),
  createData(12, "Nougat", 360, 19.0, 9, 37.0, 305, 3.7, 67, 4.3),
  createData(13, "Oreo", 437, 18.0, 63, 4.0, 305, 3.7, 67, 4.3),
];

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
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "room",
    numeric: true,
    disablePadding: true,
    label: "Room No.",
  },
  {
    id: "attendant",
    numeric: false,
    disablePadding: false,
    label: "Attendant",
  },
  {
    id: "orderId",
    numeric: false,
    disablePadding: false,
    label: "Order Id.",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "Payment Id.",
  },
  {
    id: "promotionId",
    numeric: false,
    disablePadding: false,
    label: "Promotion Id.",
  },
  {
    id: "discountPercentage",
    numeric: true,
    disablePadding: false,
    label: "Discount %",
  },

  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "Discount",
  },

  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "finalAmount",
    numeric: true,
    disablePadding: false,
    label: "Final Amount",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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

export default function SamplePage() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [filter, setFilter] = React.useState("");
  const [customFilter, setCustomFilter] = React.useState(dayjs(""));
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleTableClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const handleFilter = (filter) => {
    console.log(filter);
    setFilter(filter);
  };
  const handleCustomFilter = (filter) => {
    const formattedDate = dayjs(filter).format("MM/DD/YYYY");
    console.log(formattedDate);
    setCustomFilter(dayjs(filter));
  };

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
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar>
            <Typography sx={{ flex: "1 1  100%" }} variant="h5" id="tableTitle">
              Nutrition
            </Typography>

            {filter === "Custom" ? (
              <DatePicker
                label="Basic date picker"
                value={customFilter}
                onChange={(newValue) => handleCustomFilter(newValue)}
              />
            ) : (
              ""
            )}

            <IconButton sx={{ ml: 5 }}>
              <FilterListIcon onClick={handleClick} />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Container sx={{ p: 2 }}>
                  <Stack sx={{ cursor: "pointer" }}>
                    <Typography
                      variant="h6"
                      sx={{ p: 1 }}
                      onClick={() => handleFilter("today")}
                    >
                      Today
                    </Typography>
                    <Divider />
                    <Typography
                      variant="h6"
                      sx={{ p: 1 }}
                      onClick={() => handleFilter("Tomorrow")}
                    >
                      Tomorrow
                    </Typography>
                    <Divider />
                    <Typography
                      variant="h6"
                      sx={{ p: 1 }}
                      onClick={() => handleFilter("This Month")}
                    >
                      This Month
                    </Typography>
                    <Divider />
                    <Typography
                      variant="h6"
                      sx={{ p: 1 }}
                      onClick={() => handleFilter("Custom")}
                    >
                      Custom
                    </Typography>
                  </Stack>
                </Container>
              </Popover>
            </IconButton>
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleTableClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.date}
                      </TableCell>
                      <TableCell align="right">{row.room}</TableCell>
                      <TableCell align="left">{row.attendant}</TableCell>
                      <TableCell align="left">{row.orderId}</TableCell>
                      <TableCell align="left">{row.paymentId}</TableCell>
                      <TableCell align="left">{row.promotionId}</TableCell>
                      <TableCell align="right">{row.discountPercentage}</TableCell>
                      <TableCell align="right">{row.discount}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.finalAmount}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
    </MainCard>
  );
}
