import axiosInstance from "./axios";
 
export const getshipping = () => {
    return axiosInstance.get('/shipping');
}