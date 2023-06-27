import React from "react";
// import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";

export default function SellerFilterButton({
  popover,
  setVisible,
  visible,
  extraClassName = "btn btn-trigger btn-icon",
}) {
  //   const { t } = useTranslation();
  //   const cancelButton = () => {
  //     setVisible(false);
  //   };
  return (
    <>
      <Dropdown show={visible}>
        <Dropdown.Toggle
          variant="transparent"
          id="dropdown-basic"
          className={`${extraClassName}`}
          onClick={() => setVisible(!visible)}
        >
          <span className="icon-filter" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu filter_dropdownMenu dropdown-menu-end">
          {popover}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
