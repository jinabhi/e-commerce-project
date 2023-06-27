const Register = {
  /**
   *Register
   */
  personalDetail: {
    url: "/seller",
    method: "POST",
  },
  storeDetail: {
    url: "/seller/brand",
    method: "POST",
  },
  selectCategory: {
    url: "/seller/category",
    method: "POST",
  },
  bankDetail: {
    url: "/seller/bank",
    method: "POST",
  },
  otpVerification: {
    url: "/seller/otp-verify",
    method: "POST",
  },
  reSendOtp: {
    url: "/resend-otp",
    method: "POST",
  },
  getBrandDetails: (id) => ({
    url: `/seller/brand/${id}`,
    method: "GET",
  }),
  getSellerDetails: (id) => ({
    url: `/seller/${id}`,
    method: "GET",
  }),
};
export default Register;
