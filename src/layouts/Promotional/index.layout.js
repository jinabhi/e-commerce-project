import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/scss/promotional/frontend.scss";
import { AppLayout } from "..";
import { Footer } from "../../components";
import { routesList } from "../../routes";

function SellerLayout() {
  // Animesh Singh | 07-06-2022 12:45 PM | Added for navigating without reload
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
      <Footer routes={routesList()} />
    </AppLayout>
  );
}

export default SellerLayout;
