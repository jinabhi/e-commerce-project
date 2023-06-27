const accessRoute = {
  CONTACTED_US: {
    path: "/admin",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-emails" />
      </span>
    ),
  },
  USER_QUERIES: {
    path: "/admin/user-queries",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-mail" />
      </span>
    ),
  },
  PRODUCT_COMPLAINTS: {
    path: "/admin/product-complaints",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-file-text" />
      </span>
    ),
  },
  PRODUCT_COMPLAINTS_DETAILS: {
    path: "/admin/product-complaints-details",
  },
};

export default accessRoute;
