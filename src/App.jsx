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
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [matchNumber, setMatchNumber] = useState("");
  useEffect(() => {
    console.log(matchNumber);
  }, [setMatchNumber, matchNumber]);

  return (
    <div className=" w-screen h-screen fixed">
      <Header />
      <div className=" flex flex-1">
        <SideBar setMatchNumber={setMatchNumber} matchNumber={matchNumber} />
        <div className=" w-full">
          {localStorage.getItem("token") ? (
            <Home matchNumber={matchNumber} />
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
