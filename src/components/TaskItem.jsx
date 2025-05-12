import React from "react";
import PropTypes from "prop-types";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task, innerRef, dragProps, handleProps }) => {
  const { toggleComplete, deleteTask } = useTasks();

  const handleToggle = () => {
    toggleComplete(task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent toggleComplete when delete is clicked
    deleteTask(task.id);
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      ref={innerRef}
      {...dragProps}
      {...handleProps}
      onClick={handleToggle} // ✅ Toggle on entire item
    >
      <span>{task.text}</span>
      <button onClick={handleDelete}>✕</button>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  innerRef: PropTypes.object,
  dragProps: PropTypes.object,
  handleProps: PropTypes.object,
};

export default React.memo(TaskItem);
