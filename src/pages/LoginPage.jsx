import React, { useEffect } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { loginSchema } from '../schemas/auth';


const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const { signin, errors: loginErrors, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuthenticated) navigate("/");
      }, [isAuthenticated]);
    
    return (
        <div className="container">
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='form-group row'>
                <legend>Login</legend>
                <fieldset>
                {loginErrors.map((error, i) => (
                    <p key={i} className="text-danger">{error}</p>
                    ))}
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
                    <div className='col-sm-10 p-4'>
                        <button type='submit' className='btn btn-secondary'>
                            Enter
                        </button>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>        
)};

export default LoginPage