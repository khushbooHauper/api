import { useEdit } from "../hooks/useEdit";
import UserCard from "./UserCard";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmEdit from "../models/ConfirmEdit";

export default function EditUsersList() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [users, setUsers] = useState([]);
  const [idToEdit, setIdToEdit] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const AfterEdit = (isSuccess, result) => {
    if (isSuccess) {
      toast.success("User updated successfully");
      // Update the users state with the modified user data
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === idToEdit ? result : user))
      );
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
    editFinally,
    handleCancel,
    loading,
    error,
    isSuccess
  } = useEdit(EditFunction, true, AfterEdit);

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
        company: userToEdit.company
      };
      setIdToEdit(id);
      setUpdatedData(initialData);
      setShowConfirmation(true);
    }
  };

  const handleEditConfirmation = (updatedData) => {
    editFinally(idToEdit, updatedData);
    setShowConfirmation(false);
  };

  return (
    <div>
      <UserCard users={users} onEdit={handleEdit} />
      {showConfirmation && (
        <ConfirmEdit
          idToEdit={idToEdit}
          onEditConfirm={handleEditConfirmation}
          handleCancel={handleCancel}
          show={showConfirmation}
          initialData={updatedData}
        />
      )}
    </div>
  );
}
