const Banner = {
  addBanner: {
    url: "/admin/banner",
    method: "POST",
  },
  getBannerlist: {
    url: "/banner",
    method: "GET",
  },
  deleteBanner: (id) => ({
    url: `/admin/banner/${id}`,
    method: "DELETE",
  }),
  updateBannerStatus: (id) => ({
    url: `/admin/banner-status/${id}`,
    method: "PUT",
  }),
};
export default Banner;
