const ContactedUs = {
  userQueries: {
    url: "/admin/contact-us",
    method: "GET",
  },
  deleteUserQueries: (id) => ({
    url: `/admin/contact-us/${id}`,
    method: "DELETE",
  }),
  getProductComplaints: {
    url: "/admin/product-complaint",
    method: "GET",
  },
  getProductComplaintsDetails: (id) => ({
    url: `/admin/product-complaint/${id}`,
    method: "GET",
  }),
  addProductComplaintCredit: {
    url: "/admin/product-complaint/credit",
    method: "POST",
  },
  changeComplainStatus: (id) => ({
    url: `/admin/product-complaint/status/${id}`,
    method: "PUT",
  }),
  getEarlyAccess: {
    url: "/promotion/early-access",
    method: "GET",
  },
  getPromotionalContactus: {
    url: "/promotion/contact-us/enquiry",
    method: "GET",
  },
};
export default ContactedUs;
