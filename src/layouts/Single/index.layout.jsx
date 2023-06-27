import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";

// import { AppLayout } from "..";

function SingleLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    let pathPattern = /[\/]$/g;
    if (pathPattern.test(pathname)) {
      navigate(pathname.replace(pathPattern, ""), { replace: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     function updateSize() {
  //       const parent = document.getElementsByClassName("main-content")[0];
  //       const header = document.getElementsByClassName("midasHeader")[0];
  //       const footer = document.getElementsByClassName("footerSec")[0];
  //       // const space = document.getElementsByClassName('spaceGroup')[0];
  //       if (parent) {
  //         parent.style.minHeight = `${
  //           window.innerHeight - footer?.offsetHeight
  //         }px`;
  //         // space.style.minHeight = `${
  //         //   window.innerHeight - footer?.offsetHeight - header?.offsetHeight
  //         // }px`;
  //       }
  //       document.body.style.paddingTop = `${header.offsetHeight}px`;
  //     }
  //     window.addEventListener("resize", updateSize);
  //     updateSize();
  //     return () => window.removeEventListener("resize", updateSize);
  //   }
  //   return null;
  // }, []);

  let pageClass = {
    home: "home",
    about: "about",
    "privacy-policy": "privacy-policy",
    faq: "faq",
    "terms-conditions": "privacy-policy",
    accessibility: "privacy-policy",
  };
  let path = pathname.replace("/", "");
  path = path === "" ? "home" : path;

  return (
    <>
      <main className={`main-content ${pageClass[path]}`}>
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default SingleLayout;
