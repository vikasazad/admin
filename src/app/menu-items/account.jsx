// assets
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
// icons
const icons = {
    AccountBoxOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const account = {
  id: 'group-account',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.AccountBoxOutlinedIcon,
      breadcrumbs: true
    }
  ]
};

export default account;
