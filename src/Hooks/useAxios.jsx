import axios from "axios";

const userAxios = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return userAxios;
};

export default useAxios;