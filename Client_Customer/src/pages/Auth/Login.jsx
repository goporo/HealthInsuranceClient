import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthWrapper from './AuthWrapper';
import axios from 'axios';
import { loginSuccess } from '../../app/authSlice';
import { LOCAL_STORAGE } from '../../utils/storageConstants';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Send login request to your backend API
            // const response = await axios.post('YOUR_BACKEND_LOGIN_API_URL', data);
            const token = 'sample_token';

            localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, token);

            dispatch(loginSuccess());

            navigate("/");
        } catch (error) {
            console.error('Login failed', error);
        }
    };


    return (
        <AuthWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-6 font-semibold text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        className={`w-full px-3 py-2 border rounded ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                        className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </AuthWrapper>
    );
};

export default Login;
