import React from "react";

export default function CreateButton({ onHandleShow, btnText }) {
  return (
    <>
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addForm"
        onClick={onHandleShow}
      >
        <em className="icon ni ni-plus" />
        <span>{btnText}</span>
      </button>
    </>
  );
}
