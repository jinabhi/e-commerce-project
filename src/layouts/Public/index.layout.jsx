import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "../Auth/index.layout";

function PublicLayout() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      function updateSize() {
        const parent = document.getElementsByClassName("ant-layout-content")[0];
        const header = document.getElementsByClassName("ant-layout-header")[0];
        const footer = document.getElementsByClassName("ant-layout-footer")[0];
        const space = document.getElementsByClassName("spaceGroup")[0];
        if (parent) {
          parent.style.minHeight = `${
            window.innerHeight - footer?.offsetHeight - header?.offsetHeight
          }px`;
          space.style.minHeight = `${
            window.innerHeight - footer?.offsetHeight - header?.offsetHeight
          }px`;
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }
    return null;
  }, []);
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default PublicLayout;
