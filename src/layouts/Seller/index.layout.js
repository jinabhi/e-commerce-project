import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/scss/frontend.scss";
import { AppLayout } from "..";

function SellerLayout() {
  const [redirectpath, setRedirectPath] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (redirectpath) {
      navigate(redirectpath);
    }
  }, [redirectpath]);

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <Outlet />
    </AppLayout>
  );
}

export default SellerLayout;
