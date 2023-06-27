import React from "react";
// import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FilterButton({ popover, setVisible, visible }) {
  const { t } = useTranslation();
  const cancelButton = () => {
    setVisible(false);
  };
  return (
    <>
      <Dropdown show={visible}>
        <Dropdown.Toggle
          variant="transparent"
          id="dropdown-basic"
          className="btn btn-trigger btn-icon"
          onClick={() => setVisible(!visible)}
        >
          <em className="icon ni ni-filter-alt" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="right" className="filter-wg dropdown-menu-xl">
          <div className="dropdown-head">
            <span className="sub-title dropdown-title">
              {t("text.common.filter")}
            </span>
            <div className="dropdown">
              <Link
                to="/"
                className="link link-light"
                onClick={(e) => {
                  e.preventDefault();
                  cancelButton();
                }}
              >
                <em className="icon ni ni-cross" />
              </Link>
            </div>
          </div>
          {popover}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
