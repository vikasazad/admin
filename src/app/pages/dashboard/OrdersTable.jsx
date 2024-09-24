"use client";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NumericFormat } from "react-number-format";
import Dot from "../../components/@extended/Dot";
import { useEffect } from "react";

function createData(
  id,
  name,
  locationUnit,
  people,
  price,
  status,
  attendent,
  paymentid,
  startTime,
  EndTime,
  paymentStatus,
  specialRequirements
) {
  return {
    id,
    name,
    locationUnit,
    people,
    price,
    status,
    attendent,
    paymentid,
    startTime,
    EndTime,
    paymentStatus,
    specialRequirements,
  };
}

function processData(data) {
  const rows = [];

  // Process hotel rooms
  if (data.hotel && data.hotel.rooms) {
    data.hotel.rooms.forEach((room) => {
      if (room.status !== "available") {
        rows.push(
          createData(
            room.bookingId,
            room.customer.name,
            room.roomNumber,
            room.customer.noOfGuests,
            room.payment?.priceAfterDiscount || 0,
            room.status,
            room.diningDetails?.orders[0]?.attendant || "",
            room.payment?.paymentId || "",
            new Date(JSON.parse(room.customer.checkIn)).toLocaleDateString(),
            new Date(JSON.parse(room.customer.checkOut)).toLocaleDateString(),
            room.payment?.paymentStatus || "",
            room.customer.specialRequirements
          )
        );
      }
    });
  }

  // Process restaurant tables
  if (data.restaurant && data.restaurant.tables) {
    data.restaurant.tables.forEach((table) => {
      if (table.status !== "available") {
        const diningDetails = table.customer?.diningDetails;
        rows.push(
          createData(
            diningDetails.orderId,
            table.customer?.name || "",
            table.tableNumber,
            table.capacity,
            diningDetails?.payment?.priceAfterDiscount || 0,
            table.status,
            diningDetails?.attendant || "",
            diningDetails?.payment?.paymentId || "",
            new Date(JSON.parse(diningDetails?.timeSeated)).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            ),
            "",
            diningDetails?.payment?.paymentStatus || "",
            diningDetails?.specialRequirements
          )
        );
      }
    });
  }

  // Process hotel services
  if (data.hotel && data.hotel.rooms) {
    data.hotel.rooms.forEach((room) => {
      if (room.servicesUsed) {
        Object.values(room.servicesUsed).forEach((service) => {
          console.log(service);
          if (service.status !== "closed") {
            const [Shour, Sminute] = JSON.parse(service.startTime).split(":");
            const [Ehour, Eminute] = JSON.parse(service.endTime).split(":");
            rows.push(
              createData(
                service.serviceId,
                service.type,
                room.roomNumber,
                room.customer.noOfGuests,
                service.payment?.priceAfterDiscount || 0,
                service.status,
                service.attendant,
                service.payment?.paymentId || "",
                `${Shour}:${Sminute}`,
                `${Ehour}:${Eminute}`,
                service.payment?.paymentStatus || "",
                service.specialRequirement || ""
              )
            );
          }
        });
      }
    });
  }

  // Process issues reported
  const processIssues = (issues, locationUnit, people) => {
    if (issues) {
      Object.values(issues).forEach((issue) => {
        if (issue.status !== "closed") {
          rows.push(
            createData(
              issue.issueId,
              issue.name,
              locationUnit,
              people,
              "",
              issue.status,
              issue.attendant,
              "",
              new Date(JSON.parse(issue.reportTime)).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              new Date(JSON.parse(issue.reportTime)).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
                ? new Date(JSON.parse(issue.reportTime)).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "",
              "",
              issue.description
            )
          );
        }
      });
    }
  };

  if (data.hotel && data.hotel.rooms) {
    data.hotel.rooms.forEach((room) => {
      processIssues(
        room.issuesReported,
        room.roomNumber,
        room.customer.noOfGuests
      );
    });
  }

  if (data.restaurant && data.restaurant.tables) {
    data.restaurant.tables.forEach((table) => {
      processIssues(table.issuesReported, table.tableNumber, table.capacity);
    });
  }

  return rows;
}

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", align: "left", disablePadding: false, label: "Id" },
  { id: "name", align: "left", disablePadding: true, label: "Name" },
  {
    id: "locationUnit",
    align: "left",
    disablePadding: true,
    label: "Location",
  },
  { id: "people", align: "left", disablePadding: true, label: "People" },
  { id: "price", align: "right", disablePadding: false, label: "Price" },
  { id: "status", align: "left", disablePadding: false, label: "Status" },
  { id: "attendent", align: "left", disablePadding: false, label: "Attendant" },
  {
    id: "paymentid",
    align: "right",
    disablePadding: false,
    label: "Payment ID",
  },
  {
    id: "startTime",
    align: "right",
    disablePadding: false,
    label: "Start Time",
  },
  { id: "EndTime", align: "right", disablePadding: false, label: "End Time" },
  {
    id: "paymentStatus",
    align: "right",
    disablePadding: false,
    label: "Payment Status",
  },
  {
    id: "specialRequirements",
    align: "left",
    disablePadding: false,
    label: "Sp. Req.",
  },
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case "pending":
    case "Upcomming":
      color = "warning";
      title = "Pending";
      break;
    case "occupied":
      color = "success";
      title = "Occupied";
      break;
    case "ongoing":
      color = "success";
      title = "Ongoing";
      break;
    case "reserved":
    case "Assigned":
    case "complete":
      color = "success";
      title = "Active";
      break;
    case "closed":
      color = "error";
      title = "Closed";
      break;
    default:
      color = "primary";
      title = status;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

export default function OrderTable({ data }) {
  console.log(data);
  const order = "asc";
  const orderBy = "id";

  const rows = processData(data);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <Link color="secondary">{row.id}</Link>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.locationUnit}</TableCell>
                    <TableCell>{row.people}</TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.price}
                        displayType="text"
                        thousandSeparator
                        prefix="&#8377; "
                      />
                    </TableCell>
                    <TableCell>
                      <OrderStatus status={row.status} />
                    </TableCell>
                    <TableCell>{row.attendent}</TableCell>
                    <TableCell>{row.paymentid}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.EndTime}</TableCell>
                    <TableCell>
                      {row.paymentStatus && (
                        <OrderStatus status={row.paymentStatus} />
                      )}
                    </TableCell>
                    <TableCell>{row.specialRequirements}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderStatus.propTypes = { status: PropTypes.string };
OrderTable.propTypes = { data: PropTypes.object.isRequired };
