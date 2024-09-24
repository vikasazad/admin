// assets

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

// icons
const icons = {
  PeopleOutlineIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-staffs",
  title: "Staff",
  type: "group",
  children: [
    {
      id: "staff",
      title: "Staff",
      type: "item",
      url: "/staff",
      icon: icons.PeopleOutlineIcon,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
