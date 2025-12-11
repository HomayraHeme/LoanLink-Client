import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://loan-link-server-peach.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;