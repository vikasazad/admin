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
import StatusChip from "../../utils/StatusChip";

const CollapsibleRestaurantTable = ({ data }) => {
  // console.log("DiningTable", data);
  const [openRows, setOpenRows] = React.useState({});

  const toggleRow = (orderId) => {
    setOpenRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const Row = ({ order }) => {
    const isOpen = openRows[order.orderId] || false;

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
          onClick={() => toggleRow(order.orderId)}
        >
          <TableCell component="th" scope="row">
            {order.orderId}
          </TableCell>
          <TableCell align="right">
            <IconButton
              size="small"
              style={{ transition: "transform 0.3s ease" }}
              sx={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            {order.items.length} items
          </TableCell>
          <TableCell align="right">{order.attendant}</TableCell>
          <TableCell align="right">
            <StatusChip value={order.status} />
          </TableCell>
          <TableCell align="right">${order.payment.price}</TableCell>
          <TableCell align="right">${order.payment.discount.amount}</TableCell>
          <TableCell align="right">
            ${order.payment.priceAfterDiscount}
          </TableCell>
          <TableCell align="right">
            <StatusChip value={order.payment.paymentStatus} />
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
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Portion</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Request Time</TableCell>
                      <TableCell align="right">Fulfillment Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => {
                      return (
                        <TableRow key={item.itemId}>
                          <TableCell component="th" scope="row">
                            {item.itemId}
                          </TableCell>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell align="right">
                            {item.portionSize}
                          </TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">
                            {new Date(
                              order.timeOfRequest
                            ).toLocaleTimeString() || "N/A"}
                          </TableCell>
                          <TableCell align="right">
                            {new Date(
                              order.timeOfFullfilment
                            ).toLocaleTimeString() || "N/A"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
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
                        {order.payment.paymentId}
                      </TableCell>
                      <TableCell>{order.payment.mode}</TableCell>
                      <TableCell align="right">
                        {new Date(
                          order.payment.timeOfTransaction
                        ).toLocaleTimeString()}
                      </TableCell>
                      <TableCell align="right">
                        ${order.payment.price}
                      </TableCell>
                      <TableCell align="right">
                        ${order.payment.priceAfterDiscount}
                      </TableCell>
                      <TableCell align="right">
                        {order.payment.discount.type}
                      </TableCell>
                      <TableCell align="right">
                        ${order.payment.discount.amount}
                      </TableCell>
                      <TableCell align="right">
                        {order.payment.discount.code}
                      </TableCell>
                      <TableCell align="right">
                        <StatusChip value={order.payment.paymentStatus} />
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
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Attendant</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Final Amount</TableCell>
            <TableCell align="right">Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <Row key={order.orderId} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleRestaurantTable;
