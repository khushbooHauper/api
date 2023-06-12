import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoList() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [deleting, setDeleting] = useState(false);
  const addTodo = async () => {
    if (!newTodo) {
      toast.error("Enter todo");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo,
          completed: false,
        }
      );
      console.log(response);
      if (response.status === 201 && response.data.title) {
        setTodos([response.data, ...todos]);
        setLoading(false);
        setNewTodo("");
        toast.success("Post created successfully!");
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      // setTodos([]);
      toast.error(error.message || "Error creating post!");
      setLoading(false);
    }
  };

  const toggleCompleted = (title) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // const deleteTodo = async (title) => {
  //   try {
  //     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${title}`);
  //     const updatedTodos = todos.filter((todo) => todo.title !== title);
  //     setTodos(updatedTodos);
  //     toast.success("Todo deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //   }
  // };

  const deleteTodo = async (title) => {
    try {
      setDeleting(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${title}`);
      const updatedTodos = todos.filter((todo) => todo.title !== title);
      setTodos(updatedTodos);
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div>
      <div>
        <input
          disabled={deleting || loading}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          style={{
            cursor: "pointer",
          }}
          onClick={addTodo}
          disabled={deleting || loading}
        >
          {" "}
          Add Todo
        </button>
      </div>
      <div>
        <h2>Todos list</h2>
        <ul>
          {todos &&
            todos.map((todo) => (
              <li
                key={todo.title}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  listStyle: "none",
                }}
              >
                <div>
                  {todo.title} - {todo.completed ? "" : "pending"}{" "}
                </div>
                <button
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => deleteTodo(todo.title)}
                  disabled={deleting || loading}
                >
                  Delete
                </button>
                <input
                  disabled={deleting || loading}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.title)}
                />
              </li>
            ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
