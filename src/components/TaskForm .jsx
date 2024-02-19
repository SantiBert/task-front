import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskService, editTaskService } from '../services/task';
import { taskSchema } from '../schemas/task';

const TaskForm = ({ refreshTaskList, task, clearTask, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(taskSchema)
  });

  const resetForm = () =>{
    clearTask()
    reset()
  }

  const onSubmit = async (data) => {
    if (task){
      const response = await editTaskService(task.id, data);
      if (response.status === 200) {
        refreshTaskList();
      }
    }else{
      const response = await createTaskService(data);
      if (response.status === 200) {
        refreshTaskList();
        reset()
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <input
          type="text"
          className="form-control mb-4"
          {...register("name", { required: true })}
          defaultValue={task ? task.name : ""}
          placeholder='Task Name'
          disabled={loading}
        />
        {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
      </div>
      <div className="form-group mb-4">
        <textarea 
          name="description"
          cols="30"
          rows="10"
          className="form-control"
          placeholder="Task Description"
          disabled={loading}
          {...register("description", { required: true })} 
          defaultValue={task ? task.description : ""}>
          </textarea>
        {errors.description?.message && (<p className="text-danger">{errors.description?.message}</p>)}
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <button type="submit" className="btn btn-primary btn-block">{task ? "Update" : "Create"}</button>
        </div>
        <div className="col-md-6 mb-2">
          <button className="btn btn-secondary" onClick={() => resetForm()}>Reset</button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm