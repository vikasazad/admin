import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StatysChip from "../../utils/StatusChip";

const CollapsibleServicesTable = ({ data }) => {
  const [openRows, setOpenRows] = React.useState({});

  const toggleRow = (serviceId) => {
    setOpenRows((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const Row = ({ service }) => {
    const isOpen = openRows[service.serviceId] || false;

    return (
      <React.Fragment>
        <TableRow
          sx={{
            "& > *": { borderBottom: "unset" },
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={() => toggleRow(service.serviceId)}
        >
          <TableCell component="th" scope="row">
            {service.serviceId}
          </TableCell>
          <TableCell align="right">
            <IconButton
              size="small"
              style={{ transition: "transform 0.3s ease" }}
              sx={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            {service.serviceName}
          </TableCell>
          <TableCell align="right">{service.attendant}</TableCell>
          <TableCell align="right">
            <StatysChip value={service.payment.paymentStatus} />
          </TableCell>
          <TableCell align="right">${service.price}</TableCell>
          <TableCell align="right">
            {new Date(service.requestTime).toLocaleTimeString()}
          </TableCell>
          <TableCell align="right">
            {new Date(service.startTime).toLocaleTimeString()}
          </TableCell>
          <TableCell align="right">
            {new Date(service.endTime).toLocaleTimeString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }}
            colSpan={8}
          >
            <Collapse in={isOpen} timeout={300}>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Payment Details
                </Typography>
                <Table size="small" aria-label="payment details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Mode</TableCell>
                      <TableCell align="right">Txn Time</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Price (Disc)</TableCell>
                      <TableCell align="right">Disc Type</TableCell>
                      <TableCell align="right">Disc Amt</TableCell>
                      <TableCell align="right">Disc Code</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {service.payment.paymentId}
                      </TableCell>
                      <TableCell>{service.payment.mode}</TableCell>
                      <TableCell align="right">
                        {new Date(
                          service.payment.timeOfTransaction
                        ).toLocaleTimeString()}
                      </TableCell>
                      <TableCell align="right">
                        ${service.payment.price}
                      </TableCell>
                      <TableCell align="right">
                        ${service.payment.priceAfterDiscount}
                      </TableCell>
                      <TableCell align="right">
                        {service.payment.discount.type}
                      </TableCell>
                      <TableCell align="right">
                        ${service.payment.discount.amount}
                      </TableCell>
                      <TableCell align="right">
                        {service.payment.discount.code}
                      </TableCell>
                      <TableCell align="right">
                        <StatysChip value={service.payment.paymentStatus} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Attendant</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Req. Time</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data).map((service) => (
            <Row key={service.serviceId} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleServicesTable;
