import React, { useState, useEffect } from "react";
import axios from "axios";
import usePostApi from "../hooks/usePostApi";

const PostList = () => {
  // const [data,PostData] = usePostApi('https://jsonplaceholder.typicode.com/users',{})
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );
      const newUser = {
        id: users.length + 1,
        name: response.data.name,
        email: response.data.email,
      };

      setUsers((prevUsers) => [newUser, ...prevUsers]);
      setFormData((prevFormData) => ({ ...prevFormData, id: newUser.id })); // Set the id in formData
      console.log(newUser);
      resetFormData();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async () => {
    try {
      // let p = {name:formData.name,email:formData.email}
      await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${formData.id}`,
        formData
      );
      const updatedUsers = users.map((user) =>
        user.id === formData.id ? formData : user
      );
      setUsers(updatedUsers);
      resetFormData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // Assuming you have a function to set the formData object

      updateUser();
    } else {
      createPost();
      // const newUser = {
      //     id: users.length + 1,
      //     name: formData.name,
      //     email: formData.email,
      //   }
      // PostData('https://jsonplaceholder.typicode.com/users',newUser )
      //   setUsers(prevUsers => [newUser, ...prevUsers]);
      //   setFormData({
      //     name: '',
      //     email: '',
      //     })
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
  };

  const resetFormData = () => {
    setFormData({
      id: null,
      name: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>{formData.id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit">{formData.id ? "Update" : "Submit"}</button>
      </form>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ listStyle: "none", padding: "10px" }}>
            {user.name}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
