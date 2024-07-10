import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo, showTooltip, setFilter } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      showTooltip("Task cannot be empty!");
      return;
    }
    addTodo({
      text: inputValue,
      completed: false,
    });
    setInputValue("");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select className="filter-todo" onChange={handleFilterChange}>
          <option value="all">ALL</option>
          <option value="completed">COMPLETED</option>
          <option value="uncompleted">UNCOMPLETED</option>
        </select>
      </div>
    </form>
  );
}

export default TodoForm;
