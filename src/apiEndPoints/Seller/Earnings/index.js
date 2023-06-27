const Earnings = {
  getAllEarnings: {
    url: "/earning",
    method: "GET",
  },
  getEarningGraphData: {
    url: "earning/graph",
    method: "GET",
  },
  updateStatus: (id) => ({
    url: `earning/status/${id}`,
    method: "PATCH",
  }),
  getEarningDetailsData: (id) => ({
    url: `earning/${id}`,
    method: "GET",
  }),
};
export default Earnings;
