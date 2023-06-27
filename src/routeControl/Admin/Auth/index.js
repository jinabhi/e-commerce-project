const accessRoute = {
  LOGIN: {
    path: "/admin",
  },
  FORGOT_PASSWORD: {
    path: "/admin/forget-password",
  },
  RESET_PASSWORD: {
    path: "/admin/reset-password/:token",
  },
  CHANGE_PASSWORD: {
    path: "/admin/change-password",
  },
  PROFILE: {
    path: "/admin/profile",
  },
};

export default accessRoute;
