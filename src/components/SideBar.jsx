import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const SideBar = ({ setMatchNumber, matchNumber }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const handlePhoneNumbers = () => {
    const starCountRef = ref(database, "phones/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // setPhoneNumbers(Object.keys(data).map((key) => data[key].phone));
      // console.log();
      setPhoneNumbers([
        ...new Set(Object.keys(data).map((key) => data[key].phone)),
      ]);
      setMatchNumber(phoneNumbers[0]);

      // console.log(phoneNumbers);
    });
  };
  useEffect(() => {
    handlePhoneNumbers();
  }, []);

  return (
    <div className=" w-96 h-screen bg-orange-400 pt-[90px]">
      {phoneNumbers.map(
        (num, index) =>
          num !== localStorage.getItem("token") && (
            <button
              className={` w-full shadow-xl ${
                num === matchNumber ? " bg-orange-600" : ""
              }`}
              key={index}
              onClick={() => setMatchNumber(num)}
            >
              <h3 className=" text-white font-semibold text-xl p-5">{num}</h3>
            </button>
          )
      )}
    </div>
  );
};

export default SideBar;
