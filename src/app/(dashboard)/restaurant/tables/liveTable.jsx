"use client";
import { React, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Box,
  Divider,
} from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MainCard from "../../../components/MainCard";
import CollapsibleRestaurantTable from "../../../pages/table/CollapsibleRestaurantTable";
import CollapsibleServicesTable from "../../../pages/table/CollapsibleServicesTable";
import CollapsibleIssuesTable from "../../../pages/table/CollapsibleIssuesTable";
import StatusChip from "../../../utils/StatusChip";

export default function LiveTable({ data }) {
  const table = data.tables;
  // console.log("live", table);

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
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Table No.
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Aggregator
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Name
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Time Seated
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Time Left
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Attendant
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              People
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Amount
            </Typography>
          </Grid>
          <Grid item lg={1.3} xs={1.3}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Status
            </Typography>
          </Grid>
        </Grid>

        {table.map((item) => {
          return (
            <Stack spacing={2} sx={{ minWidth: "800px", margin: "1rem 0" }}>
              <Accordion square={false} sx={{ borderRadius: "20px" }}>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Grid container>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.diningDetails.location}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.diningDetails.aggregator}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.diningDetails.customer.name}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {new Date(
                          item.diningDetails.timeSeated
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {new Date(
                          item.diningDetails.timeLeft
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.diningDetails.attendant}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <PermIdentityOutlinedIcon fontSize="small" />
                        <Typography variant="subtitle1">
                          {item.diningDetails.noOfGuests}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <Typography variant="subtitle1">
                        {item.diningDetails.payment.priceAfterDiscount}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.3} xs={1.3}>
                      <StatusChip value={item.diningDetails.status} />
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ margin: 1 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "#7d7d7d" }}
                    >
                      History
                    </Typography>
                    <Divider sx={{ m: 1 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Food
                    </Typography>
                    <CollapsibleRestaurantTable
                      data={item.diningDetails.orders}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
                      }}
                    >
                      Issues
                    </Typography>
                    <CollapsibleIssuesTable data={item.issuesReported} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        margin: "1rem 0",
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
                      <Typography variant="h6">
                        {/* {item.bookingDetails.specialRequirements} */}
                      </Typography>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Stack>
          );
        })}
      </Box>
    </MainCard>
  );
}
