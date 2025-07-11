import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { User } = useAuth()
    axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${User?.accessToken}`
        return config;
    }, (error) => {
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;