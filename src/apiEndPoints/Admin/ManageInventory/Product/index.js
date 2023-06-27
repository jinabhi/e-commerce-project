const Product = {
  getProduct: {
    url: "/Product",
    method: "GET",
  },
  productStatusUpdate: (id) => ({
    url: `/seller/product/status/${id}`,
    method: "PUT",
  }),
  getProductDetail: (id) => ({
    url: `/product/${id}`,
    method: "GET",
  }),
};

export default Product;
