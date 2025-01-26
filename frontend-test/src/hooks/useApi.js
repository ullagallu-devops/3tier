const API_URL = process.env.REACT_APP_API_URL;

const useApi = () => {
  const fetchEntries = async (setEntries) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const addEntry = async (entry) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const deleteEntry = async (id, fetchEntries) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return { fetchEntries, addEntry, deleteEntry };
};

export default useApi;
