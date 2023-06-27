import { Link } from "react-router-dom";

import { PhoneNumber } from "../../utils";
import { AntTooltip } from "../Antd";
// import { EditCommissionForm } from "../Form";
import { ActionButton } from "../UiElement";

export const imageFormatter = (cell, text) => {
  return (
    <>
      {cell ? (
        <img className="category-img rounded-3" src={cell} alt="img" />
      ) : (
        text
      )}
    </>
  );
};

export const logoFormatter = (path, text) => {
  return (
    <>
      {path ? (
        <div className="category-img">
          <img src={path} alt="Category1" />
        </div>
      ) : (
        text
      )}
    </>
  );
};

function getButton(data) {
  let element;
  if (data.action === "redirect") {
    element = (
      <li className="action_list">
        <Link to={data.path}>
          <em className={data.icon} /> {data.name}
        </Link>
      </li>
    );
  } else if (data.action === "modal") {
    element = (
      <li className="action_list">
        <a data-toggle="modal" href={data.path}>
          <em className={data.icon} /> {data.name}
        </a>
      </li>
    );
  } else if (data.action === "confirm") {
    element = (
      <li>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            data.onClickHandle();
          }}
        >
          <em className={data.icon} /> {data.name}
        </Link>
      </li>
    );
  }

  return element;
}

function getButtonForSeller(data) {
  let element;
  if (data.action === "redirect") {
    element = (
      <li className="action_list" key={data.name}>
        <Link className="action_link" to={data.path}>
          {data.name}
        </Link>
      </li>
    );
  } else if (data.action === "modal") {
    element = (
      <li key={data.name}>
        <a data-toggle="modal" href={data.path}>
          <em className={data.icon} /> {data.name}
        </a>
      </li>
    );
  } else if (data.action === "confirm") {
    element = (
      <li className="action_list" key={data.name}>
        <Link
          to="#"
          className="action_link"
          onClick={(e) => {
            e.preventDefault();
            data.onClickHandle();
          }}
        >
          <em className={data.icon} /> {data.name}
        </Link>
      </li>
    );
  }

  return element;
}

export function actionFormatter(options) {
  return (
    <>
      <div className="text-right">
        <div className="dropdown">
          <Link
            to="#"
            className="text-soft dropdown-toggle btn btn-icon btn-trigger"
            data-toggle="dropdown"
          >
            <em className="icon ni ni-more-h" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-sm wide-xs">
            <ul className="link-list-plain">
              {options.map((item, key) => {
                return <div key={key}> {getButton(item)} </div>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export const actionButtonFormatter = (btnText, status, onHandleAction) => {
  return (
    <>
      {status === "pending" ? (
        <ActionButton
          onHandleAction={() => {
            onHandleAction();
          }}
          btnText={btnText}
        />
      ) : (
        ""
      )}
    </>
  );
};

export const linkFormatter = (cell, link = "#", extraClassName = "") => {
  return (
    <Link className={`${extraClassName}`} to={link}>
      {cell}
    </Link>
  );
};

export const nameImageFormatter = (name, imgPath, path, email) => {
  return (
    <div>
      {name ? (
        <Link to={path} className="user-card">
          <div className="user-avatar">
            <img src={imgPath} alt="UserImage" />
          </div>
          <div className="user-info">
            <span className="user-name fw-medium">{name}</span>
            <span className="d-block">{email}</span>
          </div>
        </Link>
      ) : (
        "-"
      )}
    </div>
  );
};

export const categoryFormatter = (data, showModal) => {
  return (
    <p className="mb-0">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          showModal({ data });
        }}
      >
        {data.length}
      </Link>
    </p>
  );
};

export const statusFormatter = (cell) => {
  const successArr = [
    "active",
    "inStock",
    "delivered",
    "paid",
    "accepted",
    "assigned",
    "completed",
  ];
  const failedArr = [
    "rejected",
    "outOfStock",
    "cancelled",
    "inactive",
    "reject",
    "canceled",
  ];
  const onGoingArr = [
    "scheduled",
    "pending",
    "lowStock",
    "pendingApproval",
    "readyToShip",
    "lowInventory",
    "packed",
    "pickedUp",
  ];
  const pastArr = ["expired"];
  const doneArr = ["shipped"];
  const incompleteArr = ["profileInComplete", "credited", "received", "refund"];

  const statusArr = {
    active: "Active",
    inactive: "Inactive",
    scheduled: "Scheduled",
    expired: "Expired",
    delivered: "Delivered",
    shipped: "Shipped",
    pending: "Pending",
    rejected: "Rejected",
    outOfStock: "Out of Stock",
    lowStock: "Low Stock",
    inStock: "In stock",
    pendingApproval: "Pending Approval",
    paid: "Paid",
    readyToShip: "Ready to Ship",
    cancelled: "Cancelled",
    received: "Received",
    profileInComplete: "Profile Incomplete",
    reject: "Rejected",
    lowInventory: "Low Inventory",
    credited: "Credited",
    accepted: "Accepted",
    assigned: "Assigned",
    packed: "packed",
    pickedUp: "pickedUp",
    completed: "completed",
    canceled: "canceled",
    refund: "Refund",
  };
  let data;

  if (successArr.includes(cell)) {
    data = (
      <span className="badge badge-dot badge-success">{statusArr?.[cell]}</span>
    );
  } else if (failedArr.includes(cell)) {
    data = (
      <span className="badge badge-dot badge-danger">{statusArr?.[cell]}</span>
    );
  } else if (onGoingArr.includes(cell)) {
    data = (
      <span className="badge badge-dot badge-warning">{statusArr?.[cell]}</span>
    );
  } else if (pastArr.includes(cell)) {
    data = (
      <span className="badge badge-dot badge-secondary">
        {statusArr?.[cell]}
      </span>
    );
  } else if (doneArr.includes(cell)) {
    data = (
      <span className="badge badge-dot text-purple">{statusArr?.[cell]}</span>
    );
  } else if (incompleteArr.includes(cell)) {
    data = (
      <span className="badge badge-dot badge-info">{statusArr?.[cell]}</span>
    );
  }

  return data;
};

export const phoneNumberFormatter = (cell, row) => {
  return (
    <PhoneNumber
      countryCode={row.phoneNumberCountryCode}
      contactNumber={row.phoneNumber}
    />
  );
};

export const mobileFormatter = (countryCode, number) => {
  return <>{number ? ` ${countryCode} ${" "} ${number}` : "-"}</>;
};

export const commissionFormatter = (data, changeCommision) => {
  return (
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault();
        changeCommision({ data });
      }}
    >
      <span className="currentCommission">
        {data?.commission ? `${data.commission} %` : "-"}
      </span>
    </Link>
  );
};

export const percentageFormatter = (val) => {
  return <>{val ? `${val} %` : "-"}</>;
};

export const productsImageFormatter = (path, imageName) => {
  return (
    <div className="commontable_image">
      {path ? <img src={path} alt="product" /> : imageName}
    </div>
  );
};

export const sellerActionFormatter = (options) => {
  return (
    <div className="text-end">
      <div className="dropdown actionDropdown">
        {options.length > 0 ? (
          <button
            className="dropdown-toggle d-inline-flex align-items-center justify-content-center"
            type="button"
            id="actionToggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="icon-vertical-toggle" />
          </button>
        ) : (
          ""
        )}
        <div
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="actionToggle"
        >
          <ul className="action">
            {options.map((item) => {
              return getButtonForSeller(item);
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const serialNumberFormatter = (page, sizePerPage, index) => {
  return (page - 1) * sizePerPage + index + 1;
};

export const checkValidData = (data) => {
  return data || "-";
};

export const getProductStatus = (data, minValue = 10) => {
  let status;
  if (data === 0) {
    status = "outOfStock";
  } else if (data < minValue) {
    status = "lowStock";
  } else {
    status = "inStock";
  }

  return status;
};

export const checkValidCount = (data) => {
  return <>{data || 0}</>;
};

export const checkValidPrice = (data) => {
  return <>{data ? `$ ${data}` : "0"}</>;
};

export const currencyFormatter = (dollar, type) => {
  return (
    <>
      {dollar
        ? dollar?.toLocaleString(type === "INR" ? `en-IN` : `en-US`, {
            style: "currency",
            currency: `${type}`,
          })
        : "0"}
    </>
  );
};

export const nameFormatter = (firstName, lastName) => {
  return <>{firstName ? ` ${firstName} ${" "} ${lastName}` : "-"}</>;
};

export const textFormatter = (data) => {
  return data && data?.charAt(0)?.toUpperCase() + data.slice(1);
};

export const productListFormatter = (cell, key, showModal) => {
  return (
    <Link
      to="/"
      className="link"
      onClick={(e) => {
        e.preventDefault();
        showModal(key);
      }}
    >
      {cell}
    </Link>
  );
};
export const quantityFormatter = (status, quantity) => {
  const extraStatusClass = {
    outOfStock: "badge badge-danger bg-transparent",
    lowInventory: "badge badge-warning bg-transparent",
    inStock: "badge badge-success bg-transparent",
    active: "badge badge-success bg-transparent",
    inActive: "badge badge-warning bg-transparent",
  };

  return (
    <>
      <div className={`${extraStatusClass[status]}`}>{quantity}</div>
    </>
  );
};

export const variantFormatter = (data) => {
  return data
    ? data.map((item, key) => {
        if (key + 1 === data.length) {
          return `${checkValidData(
            item?.ProductVariant?.name
          )}, ${checkValidData(item?.ProductVariantAttribute?.attributeNames)}`;
        } else {
          return `${checkValidData(
            item?.ProductVariant?.name
          )}, ${checkValidData(
            item?.ProductVariantAttribute?.attributeNames
          )}, `;
        }
      })
    : "-";
};

export const checkValidDateFormatter = (data, formatter) => {
  return <>{data ? formatter : "-"}</>;
};

export function truncate(source, size) {
  return source.length > size ? `${source.slice(0, size - 1)}…` : source;
}

export const addressFormatter = (cell) => {
  let addressLength = cell.length;
  return (
    <>
      {addressLength > 20 ? (
        <AntTooltip placement="top" promptText={`${cell}`}>
          {truncate(cell, 20)}
        </AntTooltip>
      ) : (
        truncate(cell, 20)
      )}
    </>
  );
};

export function viewLicenseFormatter(showDocument, data) {
  return (
    <>
      {data}{" "}
      <Link
        className="text-primary"
        to="/"
        onClick={(e) => {
          e.preventDefault();
          showDocument();
        }}
      >
        View
      </Link>
    </>
  );
}
export const sellerStatusFormatter = (cell) => {
  const successArr = [
    "active",
    "inStock",
    "delivered",
    "paid",
    "accepted",
    "Delivered",
  ];
  const failedArr = [
    "rejected",
    "outOfStock",
    "cancelled",
    "canceled",
    "reject",
    "expired",
  ];
  const onGoingArr = [
    "pending",
    "lowStock",
    "pendingApproval",
    "readyToShip",
    "lowInventory",
    "inactive",
    "pickedUp",
  ];
  const primary = ["received"];
  const incompleteArr = [
    "received",
    "profileInComplete",
    "credited",
    "shipped",
    "scheduled",
    "incomplete",
    "packed",
    "refund",
  ];

  const statusArr = {
    active: "Active",
    inactive: "Inactive",
    scheduled: "Scheduled",
    expired: "Expired",
    delivered: "Delivered",
    shipped: "Shipped",
    pending: "Pending",
    rejected: "Rejected",
    outOfStock: "Out of Stock",
    lowStock: "Low Stock",
    inStock: "In stock",
    pendingApproval: "Pending Approval",
    paid: "Paid",
    readyToShip: "Ready to Ship",
    cancelled: "Cancelled",
    received: "Received",
    profileInComplete: "Profile Incomplete",
    reject: "Rejected",
    canceled: "Cancelled",
    lowInventory: "Low Inventory",
    credited: "Credited",
    accepted: "Accepted",
    packed: "Packed",
    pickedUp: "Picked Up",
    incomplete: "Incomplete",
    refund: "Refund",
  };
  let data;

  if (successArr.includes(cell)) {
    data = <span className="badge badge-success">{statusArr?.[cell]}</span>;
  } else if (failedArr.includes(cell)) {
    data = <span className="badge badge-danger">{statusArr?.[cell]}</span>;
  } else if (onGoingArr.includes(cell)) {
    data = <span className="badge badge-warning">{statusArr?.[cell]}</span>;
  } else if (primary.includes(cell)) {
    data = <span className="badge badge-primary">{statusArr?.[cell]}</span>;
  } else if (incompleteArr.includes(cell)) {
    data = <span className="badge badge-info">{statusArr?.[cell]}</span>;
  }

  return data;
};

export const checkCount = (data) => {
  return <>{data > 0 ? data : "-"}</>;
};

export const decimalValueFormatter = (cell) => {
  if (Number(cell) >= 0) {
    return Number(cell).toFixed(2);
  } else {
    return ``;
  }
};

export function getText(html) {
  let divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}
export const showLinkFormatter = (data) => {
  if ([undefined, null, false].includes(data)) {
    return <>-</>;
  }
  if (data.length < 30) {
    return (
      <a href={data} target="_blank" rel="noreferrer">
        {data}
      </a>
    );
  }
  return (
    <a href={data} target="_blank" rel="noreferrer">
      {data.substring(0, 30)}...
    </a>
  );
};
