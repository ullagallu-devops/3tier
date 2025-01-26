import React, { useState } from "react";
import EntryForm from "./components/EntryForm";
import EntriesTable from "./components/EntriesTable";
import Message from "./components/Message";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000); // Hides the message after 3 seconds
  };

  return (
    <div className="app">
      <header>CRUD Application</header>
      <div className="container">
        <EntryForm showMessage={showMessage} />
        <EntriesTable showMessage={showMessage} />
      </div>
      <Message message={message} type={messageType} />
      <footer>&copy; 2025 CRUD App. All rights reserved.</footer>
    </div>
  );
};

export default App;
