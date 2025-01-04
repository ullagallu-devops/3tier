import React, { useState } from 'react';
import { addEntry } from '../utils/api';

function EntryForm({ onAddSuccess }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEntry(amount, description);
      onAddSuccess();  // Fetch entries again
      setAmount('');
      setDescription('');
      setMessage('Record added successfully!');
    } catch (error) {
      setMessage('Failed to add record. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Entry</button>
      </form>
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
    </div>
  );
}

export default EntryForm;
