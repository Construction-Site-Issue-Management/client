import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";
import Navbar from "./components/section/Navbar";
import ButtonAddIssue from "./components/ui/ButtonAddIssue";

function ProtectedRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

function Root({ isAuth }) {
  console.log(isAuth);
  return (
    <>
      {isAuth ? (
        <>
        <Navbar />
        <ButtonAddIssue />
        </>
      ) : <Navigate to={"login"} />}
      <Outlet />
    </>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* Public Routes */}
        <Route element={isAuth ? <Navigate to={"/welcomepage"} /> : <Outlet />}>
          <Route
            index
            path="login"
            lazy={async () => ({
              Component: (await import("./components/pages/publicPages/Login"))
                .default,
            })}
          />
        </Route>

        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route
            path="welcomepage"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/WelcomePage")
              ).default,
            })}
          />

          {/* Private Routes */}
          <Route
            path="Professions"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/AllProfessions")
              ).default,
            })}
          />
          <Route
            path="addissue"
            lazy={async () => ({
              Component: (await import("./components/pages/forms/AddIssueForm"))
                .default,
            })}
          />
          <Route
            path="allissues"
            lazy={async () => ({
              Component: (await import("./components/cards/CardIssues"))
                .default,
            })}
          />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
