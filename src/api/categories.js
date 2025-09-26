import axiosInstance from "./axios";

export const getAllCategories = () =>{
    return axiosInstance.get('/categories');
}