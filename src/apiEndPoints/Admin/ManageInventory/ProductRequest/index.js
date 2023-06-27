const ProductRequest = {
  getProduct: {
    url: "admin/product-request",
    method: "GET",
  },
  rejectProductRequest: (id) => ({
    url: `admin/product-request/reject/${id}`,
    method: "PUT",
  }),
  approveProductRequest: (id) => ({
    url: `admin/product-approve/${id}`,
    method: "PUT",
  }),
};

export default ProductRequest;
