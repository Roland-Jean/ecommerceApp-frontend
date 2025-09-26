import axiosInstance from "./axios";

export const createUser = () =>{
    return axiosInstance.post('/user');
}
export const getUserById = () =>{
    return axiosInstance.get('/user/${id}');
}
export const editUser = () =>{
    return axiosInstance.put('/user')
}