import React, { useState, useEffect } from "react";
import axios from "axios";

const InlineEdit = () => {
  const [data, setData] = useState([]);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle inline editing
  const handleEdit = (title) => {
    setEditTitle(title);
  };

  // Function to handle canceling editing
  const handleCancelEdit = () => {
   setEditTitle("");
  };

  // Function to handle updating the data
  const handleUpdate = async (title) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${title}`, {
        title: editTitle,
      });
      
      setEditTitle("");
      fetchData(); // Fetch updated data from the API
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <h2>Inline Edit</h2>
      <ul>
        {data.map((item) => (
          <li key={item.title}>
            {editTitle === item.title ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(item.title)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <button onClick={() => handleEdit(item.title)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InlineEdit;
