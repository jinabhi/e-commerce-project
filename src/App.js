import { Suspense, useEffect } from "react";
// import "./utils/axios.js";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";
import "antd/dist/antd.min.css";

// import "bootstrap/dist/css/bootstrap.min.css";

function RouteLayout({ path }) {
  const element = useRoutes(path);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [element]);

  return element;
}

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="d-flex vh-100 bg-black align-items-center justify-content-center">
            <div className="loader" id="loader-6">
              <span /> <span /> <span /> <span />
            </div>
          </div>
        }
      >
        <RouteLayout path={routes()} />
      </Suspense>
    </div>
  );
}

export default App;
