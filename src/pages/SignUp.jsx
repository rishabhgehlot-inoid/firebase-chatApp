import { signInWithPhoneNumber } from "firebase/auth";
import { auth, database } from "../firebase";
import { useEffect, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { push, ref } from "firebase/database";
const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setuser] = useState("");
  const navigation = useNavigate();
  async function handleSignUp(number) {
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
      ).then((userCredential) => setuser(userCredential));
    } catch (err) {
      if (Window.recaptchaVerifier) {
        Window.recaptchaVerifier.clear();
      }
      console.error("Error:", err);
      return err.code;
    }
  }
  const handleVerification = () => {
    user
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user, "it is my user");
        localStorage.setItem("token", result.user.phoneNumber);
        writeUserData(phoneNumber, phoneNumber);
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigation("/");
    }
  }, []);

  function writeUserData(chatId, phone) {
    // Get a reference to the chat room, and push a new message to it
    const messageRef = ref(database, `phones/`);

    // Push adds a new unique key for each message
    push(messageRef, { phone });
  }

  return (
    <div className=" w-screen h-screen bg-gray-500 flex justify-center items-center">
      <div className=" w-full md:max-w-[500px] h-auto p-10 bg-white shadow-xl rounded-3xl flex flex-col justify-start items-center gap-10">
        <h1 className=" text-5xl font-bold shadow-orange-500">Sign Up</h1>
        {!user ? (
          <div className=" flex flex-col justify-between gap-4 items-center w-full">
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              type="text"
              className=" p-3 outline-none shadow-orange-500 shadow-md rounded-lg w-full"
              placeholder="Enter the Phone Number"
            />
            <button
              className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full font-bold"
              onClick={() => handleSignUp(phoneNumber)}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className=" flex flex-col justify-between gap-4 items-center w-full">
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              className=" p-3 outline-none shadow-orange-500 shadow-md rounded-lg w-full"
              placeholder="Enter the OTP"
            />
            <button
              className=" p-3 outline-none shadow-orange-500 bg-orange-400 shadow-md rounded-lg w-full font-bold"
              onClick={() => handleVerification(phoneNumber)}
            >
              Sign Up
            </button>
          </div>
        )}
        <div id="recaptcha-container" className="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignUp;
