import { RatingReviews } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: `${routesMap.RATINGS_REVIEWS.path}/:id`,
      private: true,
      name: "Ratings & Reviews",
      key: `${routesMap.RATINGS_REVIEWS.path}/:id`,
      belongsToHeader: false,
      element: <RatingReviews />,
    },
  ];
}
