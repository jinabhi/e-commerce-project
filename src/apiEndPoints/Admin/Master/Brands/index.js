const Brands = {
  getBrands: {
    url: "/admin/brand",
    method: "GET",
  },
  updateCommission: (id) => ({
    url: `/admin/brand-commission/${id}`,
    method: "PUT",
  }),
};

export default Brands;
