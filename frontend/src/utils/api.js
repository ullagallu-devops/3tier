const API_URL = process.env.REACT_APP_API_URL || '/api/entries';
export const fetchEntries = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch entries');
  return await response.json();
};

export const addEntry = async (amount, description) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, description }),
  });
  if (!response.ok) throw new Error('Failed to add entry');
};

export const deleteEntry = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete entry');
};
