import React from "react";

function PageHeading({ heading }) {
  return (
    <>
      <section className="pageHeading text-center ">
        <h1 className="pageHeading-text-2">{heading}</h1>
      </section>
    </>
  );
}

export default PageHeading;
