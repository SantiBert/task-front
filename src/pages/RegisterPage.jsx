import React, { useEffect, useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { signupService } from '../services/auth';
import { registerSchema } from "../schemas/auth";

const RegisterPage = () => {
    const [error, setError] = useState();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        let data = {
            "username": values.username,
            "password": values.password,
          }
        setError(null);
        let response = await signupService(data);
        if (response.status === 201) {
            navigate("/login");
          }
        else{
            setError(response.data.message);
        }
      };
    
    useEffect(() => {
        if (isAuthenticated) navigate("/");
      }, [isAuthenticated]);

    return (
        <div className="container">
            <form
                onSubmit={handleSubmit(async (values) => {
                    onSubmit(values);
                })}
            >
                <div className='form-group row'>
                    <legend>Create Account</legend>
                    <fieldset>
                        {error ? (
                            <div className="alert alert-dismissible alert-danger">
                                {error}
                            </div>
                        ) : null}
                        <label className="col-sm-2 col-form-label">User Name</label>
                        <div className='col-sm-10'>
                            <input
                                type="text"
                                {...register("username", { required: true })}
                                className="form-control"
                                placeholder='User Name'
                            />
                            {errors.username?.message && (<p className="text-danger">{errors.username?.message}</p>)}
                        </div>
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className='col-sm-10'>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="form-control"
                                placeholder='Password'
                            />
                            {errors.password?.message && (<p className="text-danger">{errors.password?.message}</p>)}
                        </div>
                        <label className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className='col-sm-10'>
                            <input
                                type="password"
                                {...register("confirmPassword", { required: true })}
                                className="form-control"
                                placeholder='Confirm Password'
                            />
                            {errors.confirmPassword?.message && (<p className="text-danger">{errors.confirmPassword?.message}</p>)}
                        </div>
                        <div className='col-sm-10 p-3'>
                            <button type='submit' className='btn btn-secondary'>
                                Enter
                            </button>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>        
    );
}

export default RegisterPage