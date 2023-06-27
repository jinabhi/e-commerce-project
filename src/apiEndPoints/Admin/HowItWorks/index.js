const HowItWorks = {
  getHowItWorksList: {
    url: "/how-it-works",
    method: "GET",
  },
  addHowItWorks: {
    url: "/admin/how-it-works",
    method: "POST",
  },
  deleteHowItWorks: (id) => ({
    url: `/admin/how-it-works/${id}`,
    method: "DELETE",
  }),
  updateHowItWorks: (id) => ({
    url: `/admin/how-it-works/${id}`,
    method: "PUT",
  }),
  getSingleHowItWorks: (id) => ({
    url: `how-it-works/${id}`,
    method: "GET",
  }),
};

export default HowItWorks;
