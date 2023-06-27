import React from "react";
import { Helmet } from "react-helmet";

export default function MetaTags({ title }) {
  return (
    <Helmet>
      <title>{title ?? ""}</title>
      {/* <meta name="description" content={description ?? ""} /> */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
