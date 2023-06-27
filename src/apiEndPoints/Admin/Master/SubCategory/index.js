const SubCategory = {
  getAllSubCategoryList: {
    url: "/admin/sub-category",
    method: "GET",
  },
  addNewSubCategory: {
    url: "/admin/sub-category",
    method: "POST",
  },
  updateSubCategory: (id) => ({
    url: `/admin/sub-category/${id}`,
    method: "PUT",
  }),
  getSubCategoryById: (id) => ({
    url: `/admin/sub-category/${id}`,
    method: "GET",
  }),
};
export default SubCategory;
