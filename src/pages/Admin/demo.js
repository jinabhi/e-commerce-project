import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable, ListingHeader } from "../../components";

import { decodeQueryData, getSortType, navigateWithParam } from "../../utils";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [state] = useState([
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
    {
      data1: "demo",
      data2: "demo",
      data3: "demo",
      data4: "demo",
      data5: "demo",
    },
  ]);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage] = useState(10);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name)
      if (data?.sortType) {
        const sortData = [
          {
            dataField: getSortType(data?.sortType),
            order: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort({
          dataField: "",
          order: "",
        });
      }
    }
  }, [location]);

  // const headerSortingClasses = (sortOrder) =>
  //   sortOrder === "asc" ? "sorting_asc" : "sorting_desc";

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
  };

  const columns = [
    {
      dataField: "data1",
      text: "S.No.",
      headerClasses: "w_70 sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "data2",
      text: "Brand Logo",
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "data3",
      text: "Brand Name",
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "data4",
      text: "Store Name",
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "data5",
      text: "No. of Products",
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
  ];
  const breadcrumb = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "#",
      name: "Title",
    },
  ];

  return (
    <>
      <ListingHeader
        breadcrumb={breadcrumb}
        btnText="Create"
        heading="Admin dashboard"
        btnArray={["filter", "create"]}
      />

      <DataTable
        hasLimit
        noOfPage={10}
        sizePerPage={sizePerPage}
        page={page}
        count={100}
        tableData={state}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
      />
    </>
  );
}
