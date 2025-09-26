import axiosInstance from "./axios";

 export const createWishList = () =>{
    return axiosInstance.post('/wishlist')
 }

  export const editWishList = () =>{
    return axiosInstance.put('/wish/${id}')
  }

  export const deleteWishList = () =>{
    return axiosInstance.delete('/wish')
  }