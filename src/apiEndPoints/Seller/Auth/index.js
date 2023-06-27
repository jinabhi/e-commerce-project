const SellerAuth = {
  sellerResetPassword: {
    url: "/reset-password",
    method: "POST",
  },

  forgetPassword: {
    url: "/forget-password",
    method: "POST",
  },
  changePassword: {
    url: "/password",
    method: "POST",
  },
  accountLogin: {
    url: "/seller/login",
    method: "POST",
  },
  logout: {
    url: "/logout",
    method: "GET",
  },
};

export default SellerAuth;
