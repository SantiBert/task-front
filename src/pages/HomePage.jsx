import React, { useEffect, useState } from 'react';

import { getTasksListService } from '../services/task';
import TaskForm from '../components/TaskForm ';
import TaskList from '../components/TaskList';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTaskList = async () => {
    setLoading(true);
    const response = await getTasksListService();
    if (response.status === 200) {
      setData(response.data.tasks);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
    setSelectedTask(null); 
  }, []);

  const refreshTaskList = () => {
    getTaskList();
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(null); 
    setSelectedTask(task);
  };

  const resetForm = () => {
    setSelectedTask(null); 
  };


  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-5 text-center">
          <div className="card">
            <div className="card-body">
            <TaskForm
              refreshTaskList={refreshTaskList} 
              task={selectedTask} 
              clearTask={resetForm}
              loading={loading} />
            </div>
          </div>

        </div>
        <TaskList
          tasks={data}
          refreshTaskList={refreshTaskList}
          onEditTask={handleTaskEdit}
          loading={loading} />
      </div>
    </div>
  )
};

export default HomePage