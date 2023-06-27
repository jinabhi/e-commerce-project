import React from "react";

function FormContainer({ children, extraClassName }) {
  return (
    <div className="border customerDetail card">
      <div className="card-aside-wrap ">
        <div className="card-content w-100">
          <div className={`card-inner ${extraClassName}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
