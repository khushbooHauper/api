import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserList = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    job: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users/2');
      setUserData(response.data.data);
      setEditedData({
        name: response.data.data.first_name,
        job: response.data.data.job
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData({
      name: userData.first_name,
      job: userData.job
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put('https://reqres.in/api/users/2', {
        name: editedData.name,
        job: editedData.job
      });
      setUserData((prevUserData) => ({
        ...prevUserData,
        first_name: editedData.name,
        job: editedData.job
      }));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>User Data</h2>
      {userData ? (
        <div>
          {!editMode ? (
            <>
              <p>ID: {userData.id}</p>
              <p>Name: {userData.first_name}</p>
              <p>Job: {userData.job}</p>
              <button onClick={handleEditClick}>Edit</button>
            </>
          ) : (
            <>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Job:</label>
                <input
                  type="text"
                  name="job"
                  value={editedData.job}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UpdateUserList;
