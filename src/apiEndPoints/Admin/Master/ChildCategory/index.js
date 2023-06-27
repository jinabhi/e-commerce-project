export const ChildCategory = {
  getAllChildCategory: {
    url: "/admin/child-category",
    method: "GET",
  },
  addNewChildCategory: {
    url: "/admin/child-category",
    method: "POST",
  },
  updateChildCategory: (id) => ({
    url: `/admin/child-category/${id}`,
    method: "PUT",
  }),
  getChildCategoryById: (id) => ({
    url: `/admin/child-category/${id}`,
    method: "GET",
  }),
  deleteChildCategory: (id) => ({
    url: `/admin/child-category/${id}`,
    method: "DELETE",
  }),
};
