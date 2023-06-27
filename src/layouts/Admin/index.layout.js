import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "..";
import "../../styles/scss/admin/admin.scss";
import { decodeQueryData, navigateWithParam } from "../../utils";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [redirectpath, setRedirectPath] = useState("");

  useEffect(() => {
    let pathPattern = /[\/]$/g;
    if (pathPattern.test(pathname)) {
      navigate(pathname.replace(pathPattern, ""), { replace: true });
    }
  }, [pathname]);

  useEffect(() => {
    if (redirectpath) {
      if (search) {
        let newParams = decodeQueryData(search);
        navigateWithParam(newParams, navigate, redirectpath);
      } else {
        navigate(redirectpath);
      }
    }
  }, [redirectpath]);
  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <Outlet />
    </AppLayout>
  );
}

export default AdminLayout;
