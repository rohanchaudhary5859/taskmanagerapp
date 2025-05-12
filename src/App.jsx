import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [filter, setFilter] = useState("all");

  return (
    <TaskProvider>
      <div className="app">
        <ThemeToggle />
        <h1 className="heading">Task Manager</h1>
        <TaskForm />
        <FilterBar filter={filter} setFilter={setFilter} />
        
        <div role="region" aria-live="polite" aria-labelledby="task-list">
          <TaskList filter={filter} />
        </div>
      </div>
    </TaskProvider>
  );
}
