import React, { useMemo } from "react";
import PropTypes from "prop-types"; 
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ filter }) => {
  const { tasks, reorderTasks } = useTasks();

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "pending") return tasks.filter(t => !t.completed);
    return tasks;
  }, [filter, tasks]);

 const onDragEnd = (result) => {
  if (!result.destination) return;

  const newTasks = Array.from(tasks);
  const [moved] = newTasks.splice(result.source.index, 1);
  newTasks.splice(result.destination.index, 0, moved);
  reorderTasks(newTasks);
};


  return (
    <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="taskList">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
        {filteredTasks.map((task, index) => (
          <Draggable key={task.id} draggableId={String(task.id)} index={index}>
            {(provided) => (
              <TaskItem
                task={task}
                innerRef={provided.innerRef}
                dragProps={provided.draggableProps}
                handleProps={provided.dragHandleProps}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

  );
};

TaskList.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default React.memo(TaskList);
