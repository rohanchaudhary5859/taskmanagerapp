import React, { useState } from "react";
import PropTypes from "prop-types"; 
import { useTasks } from "../context/TaskContext";
import { useLocalStorage } from "../hooks/useLocalStorage"; 

const TaskForm = () => {
  const [text, setText] = useState("");
  const { addTask } = useTasks();
  
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setStoredTasks([...storedTasks, text.trim()]); 
      setText("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Prop Types for validation
TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default React.memo(TaskForm);
