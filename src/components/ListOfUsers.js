import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDelete } from "../useDelete";
import Confirmation from "../models/Confirmation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confirm from "../models/Confirm";

export default function ListOfUsers() {
  const [deletedItems, setDeletedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const AfterDelete = (isSuccess, result) => {
    if (isSuccess) {
      toast.success("User deleted successfully");
    } else {
      toast.error("Error deleting user");
    }
  };
  const deleteFunction = async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const deletedUser = users.find((user) => user.id === id);
    setDeletedItems((prevDeletedItems) => [...prevDeletedItems, deletedUser]);
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    return response;
  };

  const {
    showConfirmation,
    handleCancel,
    deleteById,
    deletefinally,
    idToDelete,
    loading,
    error,
    isSuccess,
    result,
  } = useDelete(deleteFunction, true, AfterDelete);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      });
  }, []);

  return (
    <>
      <div>
        <h2>User List</h2>
        <div>
          {users.length > 0 &&
            users.map((user) => (
              <div key={user?.id}>
                {user?.name && <p>{user.name}</p>}
                {showConfirmation ? (
                  <button
                    onClick={() => (deleteById(user.id), handleShow())}
                    className="btn btn-primary"
                    disabled={loading} // Disable the button during loading and error
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => deleteById(user.id)}
                    className="btn btn-primary"
                    disabled={loading} // Disable the button during loading and error
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {showConfirmation && (
        <Confirm
          onClick={() => deletefinally(idToDelete)}
          handleCancel={handleCancel}
          show={show}
        />
      )}

      <div>
        <h2>Deleted Users</h2>
        <div>
          {deletedItems.length > 0 &&
            deletedItems.map((user) => <p key={user?.id}>{user?.name}</p>)}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
