import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigation = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        localStorage.setItem("token", "");
        navigation("/signup");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <header className=" w-screen h-[90px] bg-orange-500 p-5 text-white font-bold absolute left-0 right-0 top-0">
      <ul className=" flex gap-3 justify-between items-center px-5">
        <li className=" text-2xl">ChatApp</li>
        <button
          className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg font-bold"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </ul>
    </header>
  );
};

export default Header;
