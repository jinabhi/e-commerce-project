const ManageCustomer = {
  getAllCustomerList: {
    url: "/admin/customer",
    method: "GET",
  },
  customerStatusUpdate: (id) => ({
    url: `/admin/customer/status/${id}`,
    method: "PUT",
  }),
  getCustomerDetails: (id) => ({
    url: `/admin/customer/${id}`,
    method: "GET",
  }),
};
export default ManageCustomer;
