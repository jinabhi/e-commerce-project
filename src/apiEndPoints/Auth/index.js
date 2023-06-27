const Auth = {
  /**
   *Account
   */
  accountLogin: {
    url: "/admin/login",
    method: "POST",
  },

  accountResetPassword: {
    url: "/reset-password",
    method: "POST",
  },
  forgetPassword: {
    url: "/forget-password",
    method: "POST",
  },
};
export default Auth;
