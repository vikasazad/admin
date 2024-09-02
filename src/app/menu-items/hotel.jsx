// assets
 
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
// icons
const icons = {
  HomeWorkOutlinedIcon,
  BedOutlinedIcon,
  RoomServiceIcon,
  PaymentOutlinedIcon
}



// ==============================|| MENU ITEMS - HOTEL ||============================== //

const hotel = {
  id: 'group-hotel',
  title: 'Hotel Information',
  type: 'group',
  children: [
    {
      id: 'hotel',
      title: 'Hotel Information',
      type: 'item',
      url: '/hotel',
 
      icon: icons.HomeWorkOutlinedIcon,
 
      breadcrumbs: true
    },
    {
      id: 'services',
      title: 'Services Information',
      type: 'item',
 
      url: '/hotel/service',
      icon: icons.RoomServiceIcon,
      breadcrumbs: true
    },
    {
      id: 'Rooms',
      title: 'Rooms Information',
      type: 'item',
      url: '/hotel/rooms',
      icon: icons.BedOutlinedIcon,
      breadcrumbs: true
    },
    {
      id: 'HotelTransctions',
      title: 'Transactions',
      type: 'item',
      url: '/hotel/transctions',
      icon: icons.PaymentOutlinedIcon,
      breadcrumbs: true,

      url: '/service',
      icon: icons.RoomServiceIcon,
      breadcrumbs: true
 
    }
  ]
};

export default hotel;
