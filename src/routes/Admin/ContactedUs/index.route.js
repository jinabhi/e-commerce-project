import { Outlet } from "react-router-dom";
import {
  ProductComplaintDetails,
  ProductComplaints,
  UserQueries,
} from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.CONTACTED_US.path,
      private: true,
      name: "Contacted Us",
      key: routesMap.CONTACTED_US.path,
      belongsToSidebar: true,
      icon: routesMap.CONTACTED_US.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.USER_QUERIES.path,
          private: true,
          name: "User Queries",
          key: routesMap.USER_QUERIES.path,
          belongsToSidebar: true,
          icon: routesMap.USER_QUERIES.icon,
          element: <UserQueries />,
        },
        {
          path: routesMap.PRODUCT_COMPLAINTS.path,
          private: true,
          name: "Product Complaints",
          key: routesMap.PRODUCT_COMPLAINTS.path,
          belongsToSidebar: true,
          icon: routesMap.PRODUCT_COMPLAINTS.icon,
          element: <ProductComplaints />,
        },
        {
          path: `${routesMap.PRODUCT_COMPLAINTS_DETAILS.path}/:id`,
          private: true,
          name: "Product Complaints Details",
          key: `${routesMap.PRODUCT_COMPLAINTS_DETAILS.path}/:id`,
          belongsToSidebar: false,
          element: <ProductComplaintDetails />,
        },
      ],
    },
  ];
}
