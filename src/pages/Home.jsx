import { useEffect, useRef, useState } from "react";
import { onValue, push, ref } from "firebase/database";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [phone, setPhone] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: messagesEndRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  const handleNewMessage = () => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.phoneNumber);
          setPhone(user.phoneNumber);
        } else {
          // User is signed out
          // ...
        }
      });
      // setMessages([...messages, newMessage]);
      writeUserData(phone, phone, newMessage);
      const starCountRef = ref(database, "chats/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setMessages(Object.keys(data).map((key) => data[key]));
        console.log(Object.keys(data).map((key) => data[key]));
      });
      scrollToBottom();
      console.log(messages);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const starCountRef = ref(database, "chats/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(Object.keys(data).map((key) => data[key]));
    });
    return;
  }, []);

  function writeUserData(chatId, phone, message) {
    const messageData = {
      phone: phone,
      message: message,
      timestamp: Date.now(), // Use timestamp to track when the message was sent
    };

    // Get a reference to the chat room, and push a new message to it
    const messageRef = ref(database, `chats/`);

    // Push adds a new unique key for each message
    push(messageRef, messageData);
  }
  return (
    <div className=" bg-slate-600 h-full pt-[90px] w-[100%] flex flex-col justify-between">
      <main
        className=" w-full h-[800px] bg-orange-300 p-3 overflow-scroll"
        ref={messagesEndRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={` flex ${
              msg.phone === phone ? "justify-end" : "justify-start"
            }`}
          >
            <div className=" bg-orange-500 w-fit p-2 rounded-xl m-1 items-end">
              {msg.message}
              <p className=" text-[10px]">{msg.phone}</p>
            </div>
          </div>
        ))}
      </main>
      <div className=" w-full bg-orange-600 p-5 flex gap-2 absolute bottom-0">
        <input
          type="text"
          className=" shadow-2xl border w-full p-3 rounded-lg outline-none"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          placeholder="Messaging..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNewMessage();
          }}
        />
        <button
          className="shadow-2xl border p-3 rounded-lg font-bold text-white w-fit"
          onClick={handleNewMessage}
        >
          Sumbit
        </button>
      </div>
    </div>
  );
};

export default Home;
