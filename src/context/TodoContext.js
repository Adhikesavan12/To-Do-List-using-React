import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return storedTodos;
  });
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (isTaskAlreadyExists(todo.text.toLowerCase())) {
      showTooltip("Task already exists!");
      return;
    }
    setTodos([...todos, todo]);
  };

  const isTaskAlreadyExists = (newTaskText) => {
    return todos.some((todo) => todo.text === newTaskText);
  };

  const removeTodo = (text) => {
    setTodos(todos.filter((todo) => todo.text !== text));
  };

  const toggleComplete = (text) => {
    setTodos(
      todos.map((todo) =>
        todo.text === text ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (originalText, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.text === originalText ? { ...todo, text: newText } : todo
      )
    );
  };

  const showTooltip = (message) => {
    Swal.fire({
      title: message,
      icon: "info",
      iconColor: "#ff6f47",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const filteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "uncompleted":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleComplete,
        editTodo,
        showTooltip,
        setFilter,
        filter,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
