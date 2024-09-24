// assets

import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

// icons
const icons = {
  LocalCafeOutlinedIcon,
  RestaurantMenuOutlinedIcon,
  TableRestaurantIcon,
  PaymentOutlinedIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const hotel = {
  id: "group-restaurant",
  title: "Restaurant",
  type: "group",
  children: [
    {
      id: "restaurant",
      title: "Restaurant Information",
      type: "item",
      url: "/restaurant",

      icon: icons.LocalCafeOutlinedIcon,

      breadcrumbs: true,
    },
    {
      id: "list",
      title: "List Information",
      type: "item",

      url: "/restaurant/list",
      icon: icons.RestaurantMenuOutlinedIcon,
      breadcrumbs: true,
    },
    {
      id: "Tables",
      title: "Tables Information",
      type: "item",
      url: "/restaurant/tables",
      icon: icons.TableRestaurantIcon,
      breadcrumbs: true,
    },
    {
      id: "RestaurantTransctions",
      title: "Transctions",
      type: "item",
      url: "/restaurant/transctions",
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: true,
    },
  ],
};

export default hotel;
