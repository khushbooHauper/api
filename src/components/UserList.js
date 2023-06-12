import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editedData, setEditedData] = useState({ name: '', year: '' });
  const [newUser, setNewUser] = useState({ name: '', year: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/unknown');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditedData(user);
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`https://reqres.in/api/unknown/${editedData.id}`, editedData);
      const updatedUsers = users.map(user =>
        user.id === editedData.id ? editedData : user
      );
      setUsers(updatedUsers);
      setEditedData({});
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelClick = () => {
    setEditedData({});
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/unknown', newUser);
      const x = response.data;
      setUsers(prevUsers => [...prevUsers, x]);
      setNewUser({ name: '', year: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevEditedData => ({
      ...prevEditedData,
      [name]: value
    }));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevNewUser => ({
      ...prevNewUser,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{editedData.id === user.id ? <input type="text" name="name" value={editedData.name || user.name} onChange={handleChange} /> : user.name}</td>
              <td>{editedData.id === user.id ? <input type="year" name="year" value={editedData.year || user.year} onChange={handleChange} /> : user.year}</td>
              <td>
                {editedData.id === user.id ? (
                  <>
                    <button onClick={handleUpdateClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" name="name" value={newUser.name} onChange={handleNewUserChange} /></td>
            <td><input type="year" name="year" value={newUser.year} onChange={handleNewUserChange} /></td>
            <td><button onClick={handleAddUser}>Add User</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
