import React from "react";

function ActionButton({ onHandleAction, btnText }) {
  return (
    <>
      <button
        className="btn btn-primary d-none d-md-inline-flex"
        onClick={onHandleAction}
      >
        <span>{btnText}</span>
      </button>
    </>
  );
}

export default ActionButton;
