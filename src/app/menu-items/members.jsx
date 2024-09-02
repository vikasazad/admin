// assets
import GroupsIcon from '@mui/icons-material/Groups';

// icons
const icons = {
  GroupsIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-member",
  title: "Members",
  type: "group",
  children: [
    {
      id: "Members",
      title: "Members",
      type: "item",
      url: "/member",
      icon: icons.GroupsIcon,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
