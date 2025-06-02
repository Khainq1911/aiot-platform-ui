import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {/* {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoutes>
                  <Page />
                </PrivateRoutes>
              }
            />
          );
        })} */}
      </Routes>
    </Router>
  );
}

export default App;
