import React, { useContext } from "react";
import Todo from "./Todo";
import { TodoContext } from "../context/TodoContext";

function TodoList() {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos().map((todo) => (
          <Todo key={todo.text} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
