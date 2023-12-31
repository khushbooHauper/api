import { useEdit } from "../hooks/useEdit";
import UserCard from "./UserCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmEdit from "../models/ConfirmEdit";
import { useDelete } from "../useDelete";
import Confirm from "../models/Confirm";

export default function EditUsersList() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const AfterDelete = (isSuccess, resultDelete) => {
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
   
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    return response;
  };

  const AfterEdit = (isSuccess, result) => {
    if (isSuccess) {
      toast.success("User updated successfully");
      // Update the users state with the modified user data
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === idToEdit ? result : user))
      );
      handleCancel(); // Close the modal after successful update
    } else {
      toast.error("Error updating user");
    }
  };

  const EditFunction = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedData
      );
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const {
    EditById,
    showConfirmation,
    editFinally,
    handleCancel,
    loading,
    error,
    isSuccess,
    idToEdit,
    updatedData,
  } = useEdit(EditFunction, AfterEdit);
  const {
    deleteById,
    deletefinally,
    showConfirmationDelete,
    handleCancelDelete,
    idToDelete,
    loadingDelete,
    } = useDelete(deleteFunction, true, AfterDelete);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching users");
      });
  }, []);

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      const initialData = {
        name: userToEdit.name,
        email: userToEdit.email,
        company: userToEdit.company,
      };

      EditById(id, initialData);
    }
  };

  const handleEditConfirmation = (updatedData) => {
    editFinally(idToEdit, updatedData);
  };
 
  const handleDelete =(id)=>{
    deleteById(id)
    handleShow()
  }

  return (
    <>
    <h1 className="text-center mb-3"> Users List</h1>
      <div>
        <UserCard users={users} onEdit={handleEdit} disabled={loading || loadingDelete}  onDelete={handleDelete}/>
        {showConfirmation && (
          <ConfirmEdit
            idToEdit={idToEdit}
            onEditConfirm={handleEditConfirmation}
            handleCancel={handleCancel}
            show={showConfirmation}
            initialData={updatedData}
            disabled={loading || loadingDelete}
          />
        )}
        {showConfirmationDelete && (
        <Confirm
          onClick={() => deletefinally(idToDelete)}
          handleCancel={handleCancelDelete}
          show={show}
          disabled={loading || loadingDelete}
        />
      )}
      </div>
      <ToastContainer />
    </>
  );
}
