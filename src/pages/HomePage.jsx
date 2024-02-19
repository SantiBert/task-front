import React, { useEffect, useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { createTaskService, getTasksListService } from '../services/task';
import { taskSchema } from '../schemas/task';


const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTaskList = async () => {
    setLoading(true);
    const response = await getTasksListService();
    if (response.status === 200) {
      setData(response.data.tasks);
      setLoading(false);
    }else{
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const response = await createTaskService(data);
    if (response.status === 200) {
      getTaskList()
    }
  }

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <main className='container'>
      { loading ? <h1>Loading...</h1> : (
        <>
           <div className='bg-body-tertiary p-5 rounded mt-3'>
        <form
          className="d-flex"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <legend>Name</legend>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              placeholder='Task Name'
            />
            {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
          </div>
          <div className="form-group">
            <legend>Description:</legend>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <button className="btn btn-secondary" type="submit">Create a Task</button>
        </form>
      </div>

      <div>
        {data && (
          <div>
            <div className='row'>
              {data.map((item, index) => (
                <div className="col-md-4 p-2" key={item.id}>
                  <div className="card border-light mb-3">
                    <div className="card-body">
                      <h4 className="card-title text-center">{item.name}</h4>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-warning">Edit</button>
                      <button type="button" className="btn btn-danger">Danger</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
        </>
      ) }
    </main>
  )
};

export default HomePage