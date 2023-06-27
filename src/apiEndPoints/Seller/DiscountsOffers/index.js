const SellerDiscountOffer = {
  sellerDiscountList: {
    url: "/admin/discount",
    method: "GET",
  },
  statusUpdate: (id) => ({
    url: `/seller/discount/status/${id}`,
    method: "PUT",
  }),
  getDiscountDetail: (id) => ({
    url: `/seller/discount/${id}`,
    method: `GET`,
  }),
  addDiscount: {
    url: `/seller/discount`,
    method: `POST`,
  },
  updateDiscount: (id) => ({
    url: `/seller/discount/${id}`,
    method: `PUT`,
  }),
  deleteDiscount: (id) => ({
    url: `/seller/discount/${id}`,
    method: `DELETE`,
  }),
  productDiscountStatusUpdate: (id, productId) => ({
    url: `/seller/discount/product/status/${id}/${productId}`,
    method: `PUT`,
  }),
  getDiscountedProduct: {
    url: `/product/discounted-product`,
    method: `GET`,
  },
};

export default SellerDiscountOffer;
