export const Common = {
  /**
   *Common
   */
  countries: {
    url: "/country",
    method: "GET",
  },
  states: {
    url: "/state",
    method: "GET",
  },
  cities: {
    url: "/city",
    method: "GET",
  },
  categoryPublic: {
    url: "/category",
    method: "GET",
  },
  getAdminAndSeller: {
    url: "/admin/seller",
    method: "GET",
  },
  getNotification: {
    url: "/notification",
    method: "GET",
  },
  getNotificationCount: {
    url: "/notification-count",
    method: "GET",
  },
  getNotificationMark: {
    url: "/notification/unread-mark",
    method: "GET",
  },

  /**
   *ManageCms
   */

  getManageCmsList: {
    url: "/cms",
    method: "GET",
  },
  getManageCmsModule: (id) => ({
    url: `/cms/${id}`,
    method: "GET",
  }),
  ManageCmsModuleUpdate: (id) => ({
    url: `/admin/cms/${id}`,
    method: "PUT",
  }),

  /**
   Rating And Review API End Points
   */
  getAllReviewRating: {
    url: "/product/review-rating",
    method: "GET",
  },
};
