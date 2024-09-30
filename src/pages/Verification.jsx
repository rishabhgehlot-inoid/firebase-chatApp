import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
const Verification = () => {
const [otp, setOtp] = useState('');
  async function handleSignUp(number) {
    console.log(number);

    try {
      if (Window.recaptchaVerifier) {
        Window.recaptchaVerifier.clear();
      }

      Window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("recaptcha resolved..");
          },
        }
      );
      Window.recaptchaVerifier.verify();

      return await signInWithPhoneNumber(
        auth,
        number,
        Window.recaptchaVerifier
      ).then((resu) => console.log(resu));
    } catch (err) {
      if (Window.recaptchaVerifier) {
        Window.recaptchaVerifier.clear();
      }
      console.error("Error:", err);
      return err.code;
    }
  }

  return (
    <div className=" w-screen h-screen bg-gray-500 flex justify-center items-center">
      <div className=" w-full md:max-w-[500px] h-auto p-10 bg-white shadow-xl rounded-3xl flex flex-col justify-start items-center gap-10">
        <h1 className=" text-5xl font-bold shadow-orange-500">Sign Up</h1>
        <div className=" flex flex-col justify-between gap-4 items-center w-full">
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            className=" p-3 outline-none shadow-orange-500 shadow-md rounded-lg w-full"
            placeholder="Enter the Phone Number"
          />
          <button
            className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full font-bold"
            onClick={() => handleSignUp(otp)}
          >
            Sign Up
          </button>
          {/* <Link
            to={"/login"}
            className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full text-center font-bold"
            onClick={handleSignUp}
          >
            Login Now
          </Link> */}
        </div>
        <div id="recaptcha-container" className="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Verification;
