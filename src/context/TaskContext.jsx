import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { v4 as uuidv4 } from "uuid"; 

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = useCallback((text) => {
    setTasks(prev => [...prev, { id: uuidv4(), text, completed: false }]);
  }, [setTasks]);

  const toggleComplete = useCallback((id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const reorderTasks = useCallback((newTasks) => {
    setTasks(newTasks);
  }, [setTasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
