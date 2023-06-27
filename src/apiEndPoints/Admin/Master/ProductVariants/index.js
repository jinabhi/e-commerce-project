const ProductVariant = {
  addProductVariant: {
    url: "/admin/product-variant",
    method: "POST",
  },
  getProductVariant: {
    url: "/admin/product-variant",
    method: "GET",
  },
  deleteProductVariant: (id) => ({
    url: `/admin/product-variant/${id}`,
    method: "DELETE",
  }),
  updateProductVariant: (id) => ({
    url: `/admin/product-variant/${id}`,
    method: "PUT",
  }),
  getProductVariantDetail: (id) => ({
    url: `/admin/product-variant/${id}`,
    method: "GET",
  }),
};
export default ProductVariant;
