import { Outlet } from "react-router-dom";

import {
  ManageCustomers,
  ManageSellers,
  SellerDetails,
  ManageStaff,
  CustomerDetails,
  StaffDetails,
} from "../../../pages";

import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.USERS.path,
      private: true,
      name: "Users",
      key: routesMap.USERS.path,
      belongsToSidebar: true,
      icon: routesMap.USERS.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.MANAGE_SELLERS.path,
          private: true,
          name: "Manage Sellers",
          key: routesMap.MANAGE_SELLERS.path,
          belongsToSidebar: true,
          icon: routesMap.MANAGE_SELLERS.icon,
          element: <ManageSellers />,
        },

        {
          path: `${routesMap.SELLER_DETAILS.path}/:id`,
          private: true,
          name: "Manage Sellers",
          key: `${routesMap.SELLER_DETAILS.path}/:id`,
          belongsToSidebar: false,
          element: <SellerDetails />,
        },
        {
          path: routesMap.MANAGE_CUSTOMERS.path,
          private: true,
          name: "Manage Customers",
          key: routesMap.MANAGE_CUSTOMERS.path,
          belongsToSidebar: true,
          icon: routesMap.MANAGE_CUSTOMERS.icon,
          element: <ManageCustomers />,
        },
        {
          path: routesMap.MANAGE_STAFF.path,
          private: true,
          name: "Manage Staff",
          key: routesMap.MANAGE_STAFF.path,
          belongsToSidebar: true,
          icon: routesMap.MANAGE_STAFF.icon,
          element: <ManageStaff />,
        },
        {
          path: `${routesMap.STAFF_DETAILS.path}/:id`,
          private: true,
          name: "Manage Staff",
          key: `${routesMap.STAFF_DETAILS.path}/:id`,
          belongsToSidebar: false,
          icon: routesMap.MANAGE_STAFF.icon,
          element: <StaffDetails />,
        },

        {
          path: `${routesMap.CUSTOMER_DETAILS.path}/:id`,
          private: true,
          name: "Manage Staff",
          key: `${routesMap.CUSTOMER_DETAILS.path}/:id`,
          belongsToSidebar: false,
          icon: routesMap.CUSTOMER_DETAILS.icon,
          element: <CustomerDetails />,
        },
      ],
    },
  ];
}
