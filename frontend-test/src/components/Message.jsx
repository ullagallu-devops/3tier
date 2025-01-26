import React from "react";

const Message = ({ message, type }) => {
  if (!message) return null;

  const getStyles = () => {
    return type === "success"
      ? "bg-green-100 border border-green-400 text-green-700"
      : "bg-red-100 border border-red-400 text-red-700";
  };

  return (
    <div
      className={`p-4 rounded-md shadow-md my-4 ${getStyles()}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Message;
