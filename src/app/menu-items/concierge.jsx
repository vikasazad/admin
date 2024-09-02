// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const hotel = {
  id: 'group-concierge',
  title: 'Concierge',
  type: 'group',
  children: [
    {
      id: 'concierge',
      title: 'Concierge',
      type: 'item',
      url: '/concierge',
      icon: icons.UserOutlined,
      breadcrumbs: true
    }
  ]
};

export default hotel;
