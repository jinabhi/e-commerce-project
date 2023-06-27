const ShippingLog = {
  getShippingLog: {
    url: "/inventory/shipping-log",
    method: "GET",
  },
  updateShippingLogStatus: (id) => ({
    url: `/admin/shipping-log/status/${id}`,
    method: "PUT",
  }),
};

export default ShippingLog;
