import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className=" w-screen h-screen fixed">
      <Header />
      <div className=" flex flex-1">
        <SideBar/>
        <div className=" w-full">
          {localStorage.getItem("token") ? (
            <Navigate to={"/"} />
          ) : (
            <Navigate to={"/signup"} />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
