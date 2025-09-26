import axiosInstance from "./axios";

export const getPayments = () =>{
    return axiosInstance.get('/payments')
}
export const selectPayment = () =>{
    return axiosInstance.get('/payments/${id}')
}