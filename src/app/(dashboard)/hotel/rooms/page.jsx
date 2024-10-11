"use client";
import { React, useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LiveRoom from "./liveRoom";
import HistoryRoom from "./historyRoom";
import MainCard from "../../../components/MainCard";
import View from "./view";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleRoomInformation } from "../../../features/firestoreMultipleData";
import { useSession } from "next-auth/react";

export default function RoomInfo() {
  const { data: session, status } = useSession();
  const user = session?.user?.personalInfo.contactInfo;
  const dispatch = useDispatch();
  const info = useSelector((state) => state.firestoreMultipleData);
  const [value, setValue] = useState(0);
  const [roomInfo, setRoomInfo] = useState(null);
  const roomData = [
    {
      location: "101",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1234567890",
        address: "lorem ipsum lipsum lorem",
      },
      bookingDetails: {
        source: "makeMyTrip",
        checkIn: "2024-09-20T14:00:00Z",
        checkOut: "2024-09-23T11:00:00Z",
        noOfGuests: 2,
        specialRequirements: "Late check-out requested",
        bookingId: "BO:123",
        dateOfBooking: "",
        attendant: "Mishra",
      },
      servicesUsed: {
        massage: {
          serviceId: "SE:123",
          status: "in progress",
          serviceName: "Swedish Massage",
          type: "massage",
          requestTime: "2024-09-21T10:00:00Z",
          startTime: "2024-09-21T14:00:00Z",
          endTime: "2024-09-21T15:00:00Z",
          price: 80,
          attendant: "Sarah Johnson",
          payment: {
            transctionId: "XUSie83",
            paymentStatus: "pending",
            mode: "room charge",
            paymentId: "SPA24092101",
            price: 80,
            priceAfterDiscount: 72,
            discount: {
              type: "percentage",
              amount: 10,
              code: "SPAWEEKEND",
            },
          },
        },
      },
      diningDetails: {
        orders: [
          {
            specialRequirement: "Make pina collada extra sour",
            items: [
              {
                itemId: "kdi2",
                itemName: "Club Sandwich",
                portionSize: "Regular",
                price: 15,
              },
              {
                itemId: "iosn3r3",
                itemName: "Caesar Salad",
                portionSize: "Large",
                price: 12,
              },
            ],

            orderId: "OR:RO24",
            attendant: "Michael Brown",
            status: "completed",
            payment: {
              transctionId: "XUSie83",
              paymentStatus: "pending",
              mode: "room charge",
              paymentId: "RO24092101",
              price: 27,
              priceAfterDiscount: 27,
              discount: {
                type: "none",
                amount: 0,
                code: "",
              },
            },
          },
        ],
      },
      issuesReported: {
        maintenance: {
          issueId: "IS:123",
          status: "Completed",
          category: "maintenance",
          name: "Leaky Faucet",
          description: "Bathroom sink faucet is dripping",
          reportTime: "2024-09-21T20:30:00Z",
          resolutionTime: "2024-09-22T09:15:00Z",
          attendant: "Robert Lee",
        },
      },
      status: "Checked Out",
      payment: {
        mode: "credit card",
        paymentId: "BOO24092001",
        price: 750,
        priceAfterDiscount: 675,
        discount: {
          type: "percentage",
          amount: 10,
          code: "SUMMER10",
        },
      },
    },
  ];
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        handleRoomInformation({
          email: user.email,
        })
      );
    }
  }, [dispatch, user]);

  // if (status === "loading") return <div>Loading...</div>;
  // if (status === "failed") return <div>Error loading data</div>;
  useEffect(() => {
    if (info?.status === "succeeded") {
      setRoomInfo(info.data);
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
      {roomInfo && (
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
              <View data={roomInfo.overview} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LiveRoom data={roomInfo.live} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <HistoryRoom data={roomInfo.history} />
            </CustomTabPanel>
          </Box>
        </MainCard>
      )}
    </>
  );
}
