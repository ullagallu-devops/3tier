import React, { useEffect, useState } from 'react';
import { fetchEntries, deleteEntry } from '../utils/api';

function EntryList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadEntries = async () => {
    setLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEntry(id);
      loadEntries();
      setMessage('Record deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete record. Please try again.');
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className="entries-container">
      <h2>Entries</h2>
      {loading && <div className="loading">Loading...</div>}
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.amount}</td>
                <td>{entry.description}</td>
                <td><button onClick={() => handleDelete(entry.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EntryList;
