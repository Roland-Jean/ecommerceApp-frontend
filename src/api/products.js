import axiosInstance from "./axios";

export const getAllProducts = () =>{
    return axiosInstance.get('/products');
}
export const getProductById = () =>{
    return axiosInstance.get('/products/${id}');
}
export const deleteProductById = () =>{
    return axiosInstance.delete('/products/${id}');
}
export const deleteAllProduct = () =>{
    return axiosInstance.delete('/products');
}
export const addProductById = () =>{
    return axiosInstance.post('/products/${id}');
}
export const updateProductById = () =>{
    return axiosInstance.put('/products');
}