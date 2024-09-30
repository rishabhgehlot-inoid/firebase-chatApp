import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const handlePhoneNumbers = () => {
    const starCountRef = ref(database, "phones/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPhoneNumbers(Object.keys(data).map((key) => data[key]));
      // console.log(phoneNumbers);
    });
  };
  useEffect(() => {
    handlePhoneNumbers();
  }, []);
  const handleChange = () => {};

  return (
    <div className=" w-96 h-screen bg-orange-400 pt-[90px]">
      {phoneNumbers.map((num, index) => (
        <div className=" w-full shadow-xl" key={index} onClick={handleChange}>
          <h3 className=" text-white font-semibold text-xl p-5">{num.phone}</h3>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
