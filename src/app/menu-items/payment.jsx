// assets
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
// icons
const icons = {
  PaymentOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const hotel = {
  id: 'group-payment',
  title: 'Payment',
  type: 'group',
  children: [
    {
      id: 'payment',
      title: 'Payment Information',
      type: 'item',
      url: '/payment',
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: true
    }
  ]
};

export default hotel;
