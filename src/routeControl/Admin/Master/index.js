const accessRoute = {
  MASTER: {
    path: "/admin",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-view-x3" />
      </span>
    ),
  },
  SUB_CATEGORIES: {
    path: "/admin/sub-categories",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-view-list" />
      </span>
    ),
  },
  DISCOUNT_OFFER: {
    path: "/admin/discount-offers",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-offer" />
      </span>
    ),
  },
  CATEGORY: {
    path: "/admin/category",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-list-round" />
      </span>
    ),
  },
  PRODUCT_VARIANTS: {
    path: "/admin/product-variants",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-layers-fill" />
      </span>
    ),
  },
  CHILD_CATEGORIES: {
    path: "/admin/manage-child-categories",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-view-list" />
      </span>
    ),
  },
  BRANDS: {
    path: "/admin/brands",
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-view-x6" />
      </span>
    ),
  },
};

export default accessRoute;
