export const ManageSeller = {
  rejectSeller: (id) => ({
    url: `admin/seller-request/rejection/${id}`,
    method: "PUT",
  }),
  getManageSeller: {
    url: "/admin/seller",
    method: "GET",
  },
  activeAndDeactivateSeller: (id) => ({
    url: `/admin/seller/status/${id}`,
    method: "PUT",
  }),
  getSellerDetails: (id) => ({
    url: `/seller/${id}`,
    method: "GET",
  }),
};
