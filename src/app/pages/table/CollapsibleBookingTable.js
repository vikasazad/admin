import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CollapsibleBookingTable = ({ bookingDetails }) => {
  return (
    <TableContainer>
      <Table aria-label="booking details table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Check-in</TableCell>
            <TableCell align="right">Check-out</TableCell>
            <TableCell align="right">Guests</TableCell>
            <TableCell align="right">Date of Booking</TableCell>
            <TableCell align="right">Attendant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {bookingDetails.bookingId}
            </TableCell>
            <TableCell align="right">{bookingDetails.source}</TableCell>
            <TableCell align="right">
              {new Date(bookingDetails.checkIn).toLocaleString()}
            </TableCell>
            <TableCell align="right">
              {new Date(bookingDetails.checkOut).toLocaleString()}
            </TableCell>
            <TableCell align="right">{bookingDetails.noOfGuests}</TableCell>
            <TableCell align="right">
              {bookingDetails.dateOfBooking || "N/A"}
            </TableCell>
            <TableCell align="right">
              {bookingDetails.attendant || "N/A"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleBookingTable;
