import { useTranslation } from "react-i18next";
import { PromotionalPublicLayout, SingleLayout } from "../../layouts";

import publicRoutes from "./public.route";
import singleRoutes from "./single.route";

export const promotionalRoutes = () => {
  const { t } = useTranslation();
  return [
    {
      element: <PromotionalPublicLayout />,
      children: [...publicRoutes(t)],
    },
    {
      element: <SingleLayout />,
      children: [...singleRoutes(t)],
    },
  ];
};

// export const routesList = () => {
//   let routeArr = [...routes()[0].children];
//   return [...routeArr];
// };

// export const getCompletePathList = () => {
//   return routesList().reduce((prev, curr) => {
//     prev.push(curr);
//     if (curr.children) {
//       prev.push(...curr.children);
//     }
//     return prev;
//   }, []);
// };
