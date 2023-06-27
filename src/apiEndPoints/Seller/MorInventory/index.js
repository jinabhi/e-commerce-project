const MorInventory = {
  getAllInventory: {
    url: "/product",
    method: "GET",
  },
  addToMor: {
    url: "/seller/inventory/shipping-log",
    method: "POST",
  },
  getShippingLogs: {
    url: "/inventory/shipping-log",
    method: "GET",
  },
};
export default MorInventory;
