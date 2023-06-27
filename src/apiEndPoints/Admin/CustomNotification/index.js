const CustomNotification = {
  getCustomNotification: {
    url: "/admin/custom-notification",
    method: "GET",
  },
  addCustomNotification: {
    url: "/admin/custom-notification",
    method: "POST",
  },
  deleteCustomNotification: (id) => ({
    url: `/admin/custom-notification/${id}`,
    method: "DELETE",
  }),
};

export default CustomNotification;
