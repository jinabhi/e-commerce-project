const accessRoute = {
  LOGIN: {
    path: "/staff",
  },
  FORGOT_PASSWORD: {
    path: "/staff/forget-password",
  },
  RESET_PASSWORD: {
    path: "/staff/reset-password/:token",
  },
  CHANGE_PASSWORD: {
    path: "/staff/change-password",
  },
  PROFILE: {
    path: "/staff/profile",
  },
};

export default accessRoute;
