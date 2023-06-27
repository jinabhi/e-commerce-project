const accessRoute = {
  MANAGE_INVENTORY: {
    path: "/staff",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-box" />
      </span>
    ),
  },
  PRODUCT_REQUEST: {
    path: "/staff/product-request",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-package-fill" />
      </span>
    ),
  },

  PRODUCT: {
    path: "/staff/product",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-package-fill" />
      </span>
    ),
  },
  SHIPPING_LOG: {
    path: "/staff/shipping-log",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-notes-alt" />
      </span>
    ),
  },
  PRODUCT_DETAILS: {
    path: "/staff/product-details",
  },
};

export default accessRoute;
