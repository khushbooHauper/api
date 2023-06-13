import { useEdit } from "../hooks/useEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmEdit from "../models/ConfirmEdit";
import TodoCard from "./TodoCard";
import TodoEdit from "../models/TodoEdit";
import { useDelete } from "../useDelete";
import Confirm from "../models/Confirm";

export default function EditTodos() {
  const [todos, settodos] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const AfterDelete = (isSuccess, resultDelete) => {
    if (isSuccess) {
      toast.success("todo deleted successfully");
    } else {
      toast.error("Error deleting todo");
    }
  };
  const deleteFunction = async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
   
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    settodos(filteredTodos);
    return response;
  };

  const AfterEdit = (isSuccess, result) => {
    if (isSuccess) {
      toast.success("todo updated successfully");
      // Update the todos state with the modified todo data
      settodos((prevtodos) =>
        prevtodos.map((todo) => (todo.id === idToEdit ? result : todo))
      );
      handleCancel(); // Close the modal after successful update
    } else {
      toast.error("Error updating todo");
    }
  };

  const EditFunction = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        updatedData
      );
      return response;
    } catch (error) {
      console.error("Error updating todo:", error);
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
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        settodos(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching todos");
      });
  }, []);

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const initialData = {
        title: todoToEdit.title,
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
     <h1 className="text-center mb-3"> Todo List</h1>
      <div>
        <TodoCard todos={todos} onEdit={handleEdit}  disabled={loading || loadingDelete} onDelete={handleDelete}/>
        {showConfirmation && (
          <TodoEdit
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
