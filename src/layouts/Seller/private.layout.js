import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { SellerHeader } from "../../components";
import { getLocalStorageToken } from "../../utils/common.util";

function SellerPrivateLayout() {
  const location = useLocation();
  const [state, setState] = useState("");
  const { id } = useParams();
  const { pathname } = location;
  const node = useRef("");
  const token = getLocalStorageToken();

  let path = pathname.replace("/brand/", "");
  path = path === "" ? "dashboard" : path;

  const pageClass = {
    dashboard: "dashboardPage",
    products: "productPage",
    "my-store": "mystore",
    "mor-inventory": "inventoryPage",
    earnings: "earningPage",
    orders: "ordersPage",
    [`reviews-ratings/${id}`]: "reviewPage",
    "privacy-policy": "",
    "about-us": "",
    faqs: "",
    "terms-conditions": "",
  };

  useEffect(() => {
    setState("");
  }, [pathname]);

  const handingRef = () => {
    setState("");
    // node.current.classList.remove("dropOpen");
  };

  const headerDropdown = document.querySelectorAll(
    '.mainHeader [data-bs-toggle="dropdown"]'
  );
  headerDropdown.forEach((dropdownItem) => {
    dropdownItem?.addEventListener("show.bs.dropdown", function () {
      document.querySelector(".main-content").classList.add("dropOpen");
      setTimeout(() => {
        document.querySelector(".main-content").classList.add("dropOpen");
      }, 50);
    });
    dropdownItem.addEventListener("hide.bs.dropdown", function () {
      document.querySelector(".main-content").classList.remove("dropOpen");
    });
  });

  return (
    <>
      {[
        "about-us",
        "privacy-policy",
        "terms-conditions",
        "how-it-works",
        "faqs",
        "returns-refund-policy",
        "cancellation-policy",
      ].includes(path) && !token ? (
        <></>
      ) : (
        <SellerHeader setState={setState} />
      )}

      <div
        ref={node}
        onClick={handingRef}
        className={`main-content pb ${pageClass?.[path]}  ${state}  `}
      >
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SellerPrivateLayout;
