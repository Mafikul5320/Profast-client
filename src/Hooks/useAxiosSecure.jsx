import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {User}=
    axiosSecure.interceptors.request.use((config) => {

        return config;
    }, (error) => {
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;