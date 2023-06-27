const Orders = {
  getOrders: {
    url: "orders",
    method: "GET",
  },
  updateStatus: (id) => ({
    url: `order/status/${id}`,
    method: "PATCH",
  }),
  getOrdersDetail: (id) => ({
    url: `/order/${id}`,
    method: "GET",
  }),
  getOrdersDetailSeller: (id) => ({
    url: `/sellerOrder/${id}`,
    method: "GET",
  }),
};
export default Orders;
