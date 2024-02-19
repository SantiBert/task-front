import React from 'react';
import { deleteTaskService } from '../services/task';


const TaskList = ({ tasks, refreshTaskList, onEditTask, loading }) => {
  const handleDeleteClick = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const response = await deleteTaskService(taskId);
      if (response.status === 200) {
        refreshTaskList();
      }
    }
  };

  const handleEditClick = (task) => {
    onEditTask(task);
  };

  return (
    <div className="col-md-7">
      {loading ? <h1>Loading...</h1> : (
        <>
          {tasks.length === 0 ? (
            <div>No tasks</div>
          ):(
            <>
              {tasks.map((task, index) => (
              <div className="card mb-3" key={task.id}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3>{task.name}</h3>
                  <div className="button-group">
                    <button className="btn btn-primary" onClick={() => handleEditClick(task)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteClick(task.id)}>Delete</button>
                  </div>
                </div>
                <div className="card-body">
                  <p>{task.description}</p>
                </div>
              </div>
            ))}
            </>
          )}
          
        </>
      )}
    </div>
  );
};

export default TaskList;