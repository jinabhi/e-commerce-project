const SellerAccount = {
  getSellerAccount: {
    url: "/account/me",
    method: "GET",
  },
  getSellerDetail: (id) => ({
    url: `/seller/${id}`,
    method: "GET",
  }),
  editSellerAccount: {
    url: "/profile",
    method: "PUT",
  },
  editStoreDetails: (id) => ({
    url: `/seller/brand/${id}`,
    method: "PUT",
  }),
  editBankDetails: (id) => ({
    url: `/seller/bank/${id}`,
    method: "PUT",
  }),
  otpVerifyEditNumber: {
    url: "/seller/mobile-number/otp-verify",
    method: "POST",
  },
  sendOtpForNumber: {
    url: "/change-number/otp",
    method: "POST",
  },
};

export default SellerAccount;
