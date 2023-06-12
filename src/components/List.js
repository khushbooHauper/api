import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDelete, usePost, useToggle } from "../hooks/ListHooks";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const { loading, post } = usePost("https://jsonplaceholder.typicode.com/todos");
  const { deleting, remove } = useDelete("https://jsonplaceholder.typicode.com/todos");
  const [completed, toggleCompleted] = useToggle();

  const addTodo = async () => {
    if (!newTodo) {
      toast.error("Enter todo");
      return;
    }
    try {
      const newTodoData = await post({
        title: newTodo,
        completed: false,
      });
      setTodos([newTodoData, ...todos]);
      setNewTodo("");
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(error.message || "Error creating post!");
    }
  };

 
  const deleteTodo = async (title) => {
    try {
      remove();
      const updatedTodos = todos.filter((todo) => todo.title !== title);
      setTodos(updatedTodos);
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
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
                  checked={completed}
                  onChange={toggleCompleted}
                />
              </li>
            ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
