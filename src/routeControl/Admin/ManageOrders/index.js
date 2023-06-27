const accessRoute = {
  MANAGE_ORDERS: {
    path: "/admin",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-cart" />
      </span>
    ),
  },
  ACTIVE_ORDER: {
    path: "/admin/active-order",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-truck" />
      </span>
    ),
  },
  ACTIVE_ORDER_Details: {
    path: "/admin/active-order-details",
  },
  COMPLETE_ORDER: {
    path: "/admin/complete-order",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-check-c" />
      </span>
    ),
  },
  CANCELLED_ORDER: {
    path: "/admin/cancelled-order",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-cross-c" />
      </span>
    ),
  },
  CANCELLED_ORDER_DETAILS: {
    path: "/admin/cancel-order-details",
  },
  COMPLETED_ORDER_DETAILS: {
    path: "/admin/complete-order-details",
  },
};

export default accessRoute;
