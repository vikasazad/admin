import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
const Hotel = Loadable(lazy(() => import('pages/hotel/hotel')));
const Service = Loadable(lazy(() => import('pages/hotel/service')));
const Serviceinfo = Loadable(lazy(() => import('pages/hotel/serviceInfo')));
const Restaurant = Loadable(lazy(() => import('pages/restaurant/restaurant')));
const List = Loadable(lazy(() => import('pages/restaurant/list')));
const Category = Loadable(lazy(() => import('pages/restaurant/category')));
const Concierge = Loadable(lazy(() => import('pages/concierge/concierge')));
const Payment = Loadable(lazy(() => import('pages/payment/payment')));
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'hotel',
      element: <Hotel />
    },
    {
      path: 'service',
      element: <Service />
    },
    {
      path: 'serviceinfo',
      element: <Serviceinfo />
    },
    {
      path: 'restaurant',
      element: <Restaurant />
    },
    {
      path: 'list',
      element: <List />
    },
    {
      path: 'category',
      element: <Category />
    },
    {
      path: 'concierge',
      element: <Concierge />
    },
    {
      path: 'payment',
      element: <Payment />
    },

    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
