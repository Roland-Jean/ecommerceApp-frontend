import axiosInstance from "./axios";

export const getAllCart = () =>{
    return axiosInstance.get('/carts');
}
export const getCartById = () =>{
    return axiosInstance.get('/carts/${id}');
}
export const createCart = () =>{
    return axiosInstance.post('/carts');
}