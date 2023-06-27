const ManageStaff = {
  getAllStaffList: {
    url: "/admin/staff",
    method: "GET",
  },
  addNewStaff: {
    url: "/admin/staff",
    method: "POST",
  },
  getStaffById: (id) => ({
    url: `/admin/staff/${id}`,
    method: "GET",
  }),
  updateStaff: (id) => ({
    url: `/admin/staff/${id}`,
    method: "PUT",
  }),
  changeStaffStatus: (id) => ({
    url: `/admin/staff/status/${id}`,
    method: "PUT",
  }),
  changeStaffPassword: (id) => ({
    url: `/admin/staff/password/${id}`,
    method: "PUT",
  }),
};
export default ManageStaff;
