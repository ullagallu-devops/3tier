import React, { useState } from "react";
import useApi from "../hooks/useApi";

const EntryForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { addEntry, fetchEntries } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEntry({ amount, description });
    setAmount("");
    setDescription("");
    fetchEntries();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
