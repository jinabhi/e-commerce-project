const SellerProduct = {
  /**
   *Product
   */
  addProduct: {
    url: "/seller/product",
    method: "POST",
  },
  updateProduct: (id) => ({
    url: `/seller/product/${id}`,
    method: "PUT",
  }),
  getAllProduct: {
    url: "/product",
    method: "GET",
  },
  getProductDetail: (id) => ({
    url: `/product/${id}`,
    method: "GET",
  }),
  deleteProduct: (id) => ({
    url: `/seller/product/${id}`,
    method: "DELETE",
  }),
  bulkUploadProduct: {
    url: `/product/upload`,
    method: "POST",
  },
  bulkUploadSampleFile: {
    url: `/product/sample-file`,
    method: "GET",
  },
  statusUpdate: (id) => ({
    url: `/seller/product/status/${id}`,
    method: "PUT",
  }),
};
export default SellerProduct;
