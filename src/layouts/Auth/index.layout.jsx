import { useSelector } from "react-redux";
import { useLocation, generatePath, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getCompletePathList } from "../../routes";
import { AuthDriver as authDriver, modalNotification } from "../../utils";
import { selectUserData } from "../../redux/AuthSlice/index.slice";

function AppLayout({ setRedirectPath, children }) {
  const location = useLocation();
  const params = useParams();
  const userData = useSelector(selectUserData);

  function getGeneratedPath(data) {
    try {
      return generatePath(data, params);
    } catch (error) {
      return data;
    }
  }

  const activeRoute = getCompletePathList().find((e) => {
    const routePath = getGeneratedPath(e.key);
    const browserPath = location.pathname;
    return routePath === browserPath;
  });

  // const activeRoute = getCompletePathList().find(e => e.key === location.pathname);
  // const activeRoute = getCompletePathList().find(e => e.key.search(location.pathname.replace(/[0-9]/g, '')) >=0)
  const isPrivate = activeRoute?.private;
  const isValid = authDriver(activeRoute, userData, location.pathname);

  function checkValid() {
    if (!isValid) {
      let publicPath = "";
      let privatePath = "";
      let path = "";

      if (location.pathname.search("admin") >= 0) {
        path = "admin";
      } else if (location.pathname.search("staff") >= 0) {
        path = "staff";
      } else if (location.pathname.search("brand") >= 0) {
        path = "brand";
      } else {
        path = "promotional";
      }

      let checkData = userData?.userRole ?? path;

      if (checkData === "admin") {
        publicPath = "/admin";
        privatePath = "/admin/dashboard";
      } else if (checkData === "staff") {
        publicPath = "/staff";
        privatePath = "/staff/product-request";
      } else if (checkData === "seller") {
        publicPath = "/brand";
        privatePath = "/brand/dashboard";
      } else {
        publicPath = "/";
        // privatePath = "/dashboard";
      }

      if (isPrivate === true) {
        /** ******* If route type is private but not*****************
         * ******* able to prove their identity as valid entity*****
         * ********* so redirect it to public route******** */
        // Animesh Singh | 07-06-2022 12:45 PM | commented for navigating without reload
        // window.location = publicPath;
        // Animesh Singh | 07-06-2022 12:45 PM | Added for navigating without reload
        modalNotification({
          type: "warning",
          message: "Your Token is expired. Please login again.",
        });
        setRedirectPath(publicPath);
        // return false;
      } else if (isPrivate === false) {
        /** ******* If route type is public but not*****************
         * ******* able to prove their identity as valid entity*****
         * ********* so redirect it to private route******** */
        // Animesh Singh | 07-06-2022 12:45 PM | commented for navigating without reload
        // window.location = privatePath;
        // Animesh Singh | 07-06-2022 12:45 PM | Added for navigating without reload
        setRedirectPath(privatePath);
      }
    } else {
      // Animesh Singh | 07-06-2022 12:45 PM | commented for navigating without reload
      // return children
      // Animesh Singh | 07-06-2022 12:45 PM | Added for navigating without reload
      setRedirectPath(location.pathname);
    }
  }

  // Animesh Singh | 07-06-2022 12:45 PM | Added for navigating without reload
  useEffect(() => {
    checkValid();
  }, [location.pathname]);

  return <>{isValid && children}</>;
}

export default AppLayout;
