// Todo.js
import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Todo({ todo }) {
  const { removeTodo, toggleComplete, editTodo, showTooltip } =
    useContext(TodoContext);
  const [fall, setFall] = useState(false);

  const handleRemove = (text) => {
    setFall(true);
    const transitionEndHandler = () => {
      removeTodo(text);
      setFall(false);
      document.removeEventListener("transitionend", transitionEndHandler);
    };
    document.addEventListener("transitionend", transitionEndHandler);
  };

  const handleDoubleClick = () => {
    if (todo.completed) {
      showTooltip("Cannot edit completed task!");
      return;
    }
    const originalText = todo.text;

    Swal.fire({
      title: "Edit your task",
      input: "text",
      inputValue: originalText,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newText = result.value;
        editTodo(originalText, newText);
      }
    });
  };

  return (
    <div
      className={`todo ${todo.completed ? "completed" : ""} ${
        fall ? "fall" : ""
      }`}
    >
      <li className="todo-item" onDoubleClick={handleDoubleClick}>
        {todo.text}
      </li>
      <button
        className="complete-btn"
        onClick={() => toggleComplete(todo.text)}
      >
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={() => handleRemove(todo.text)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo;
