import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExportButton from "../../Button/Export/index.btn";
import { FilterButton, CreateButton } from "../../UiElement";

function ListingHeader({
  btnText,
  btnArray,
  onHandleShow,
  popover,
  setVisible,
  visible,
  csvData = [],
  fileName = "",
}) {
  const [filterToggle, setFilterToggle] = useState(false);
  return (
    <>
      {/* <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between"> */}
      <div className="nk-block-head-content">
        <div className="toggle-wrap nk-block-tools-toggle">
          <Link
            to="#"
            className="btn btn-icon btn-trigger toggle-expand mr-n1"
            data-target="more-options"
            onClick={() => setFilterToggle(!filterToggle)}
          >
            <em className="icon ni ni-more-v" />
          </Link>
          <div
            className={`toggle-expand-content ${
              filterToggle ? "expanded" : ""
            }`}
            // className="toggle-expand-content"
            data-content="more-options"
          >
            <ul className="nk-block-tools g-3 ">
              {btnArray.includes("csvExport") && (
                <li>
                  <ExportButton
                    data={csvData}
                    fileName={fileName}
                    extraClassName={`btn btn-white btn-outline-light ${
                      csvData?.length > 0 ? "" : "disabled"
                    } `}
                  >
                    <em className="icon ni ni-download-cloud" />
                    <span> Export CSV </span>
                  </ExportButton>
                </li>
              )}
              {btnArray.includes("filter") && (
                <li>
                  <FilterButton
                    className="bg-black border-transparent"
                    popover={popover}
                    setVisible={setVisible}
                    visible={visible}
                  />
                </li>
              )}
              {btnArray.includes("create") && (
                <li className="nk-block-tools-opt">
                  <CreateButton onHandleShow={onHandleShow} btnText={btnText} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
}

export default ListingHeader;
