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

const CollapsibleIssuesTable = ({ data }) => {
  const Row = ({ issue }) => {
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
        >
          <TableCell component="th" scope="row">
            {issue.issueId}
          </TableCell>
          <TableCell align="right">{issue.category}</TableCell>
          <TableCell align="right">{issue.attendant}</TableCell>
          <TableCell align="right">{issue.name}</TableCell>
          <TableCell align="right">{issue.description}</TableCell>
          <TableCell align="right">
            {new Date(issue.reportTime).toLocaleTimeString()}
          </TableCell>
          <TableCell align="right">
            {new Date(issue.resolutionTime).toLocaleTimeString() || "Pending"}
          </TableCell>
          <TableCell align="right">
            <StatysChip value={issue.status} />
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
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Attendant</TableCell>
            <TableCell align="right">Issue</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Report</TableCell>
            <TableCell align="right">Resolution</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data).map((issue) => (
            <Row key={issue.issueId} issue={issue} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleIssuesTable;
