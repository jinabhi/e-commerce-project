const accessRoute = {
  MANAGE_INVENTORY: {
    path: "/admin",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-box" />
      </span>
    ),
  },
  PRODUCT_REQUEST: {
    path: "/admin/product-request",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-package-fill" />
      </span>
    ),
  },

  PRODUCT: {
    path: "/admin/product",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-package-fill" />
      </span>
    ),
  },
  SHIPPING_LOG: {
    path: "/admin/shipping-log",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-notes-alt" />
      </span>
    ),
  },
  PRODUCT_DETAILS: {
    path: "/admin/product-details",
  },
};

export default accessRoute;
