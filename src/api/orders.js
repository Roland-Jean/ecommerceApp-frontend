import axiosInstance from "./axios";

export const getAllOrders = () =>{
    return axiosInstance.get('/orders');
}
export const deleteOrder = () =>{
    return axiosInstance.delete('/order/${id}');
}
export const deleteAllOrders = () =>{
    return axiosInstance.delete('/orders')
}
export const addOrder = () =>{
    return axiosInstance.post('/oder')
}
export const editOrder = () =>{
    return axiosInstance.put('/order/${id}')
}