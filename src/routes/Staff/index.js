import { AdminPublicLayout, AdminPrivateLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";

export const staffRoutes = () => {
  return [
    {
      element: <AdminPublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <AdminPrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
