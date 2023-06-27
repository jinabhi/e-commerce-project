const FAQs = {
  getFAQsList: {
    url: "/faq",
    method: "GET",
  },
  addNewFAQ: {
    url: "/admin/faq",
    method: "POST",
  },

  deleteFAQs: (id) => ({
    url: `/admin/faq/${id}`,
    method: "DELETE",
  }),
  updateFAQ: (id) => ({
    url: `/admin/faq/${id}`,
    method: "PUT",
  }),
  getSingleFAQs: (id) => ({
    url: `faq/${id}`,
    method: "GET",
  }),
};

export default FAQs;
