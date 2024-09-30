import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        localStorage.setItem("token",user);
        console.log("yoo are logged in");
    navigation('/')
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error message :",errorMessage);
        
        // ..
      });
  };
  return (
    <div className=" w-screen h-screen bg-gray-500 flex justify-center items-center">
      <div className=" w-full md:max-w-[500px] h-auto p-10 bg-white shadow-xl rounded-3xl flex flex-col justify-start items-center gap-10">
        <h1 className=" text-5xl font-bold shadow-orange-500">Login</h1>
        <div className=" flex flex-col justify-between gap-4 items-center w-full">
          <input
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
            type="text"
            className=" p-3 outline-none shadow-orange-500 shadow-md rounded-lg w-full"
            placeholder="Enter the Email"
          />
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type="password"
            className=" p-3 outline-none shadow-orange-500 shadow-md rounded-lg w-full"
            placeholder="Enter the Password"
          />
          <button className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full font-bold" onClick={handleSignUp}>
            Login
          </button>          <Link
            to={"/signup"}
            className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full text-center font-bold"
            onClick={handleSignUp}
          >
            SignUp Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
