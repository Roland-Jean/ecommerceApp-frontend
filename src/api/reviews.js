import axiosInstance from "./axios";
 
export const addReview = ()=>{
    return axiosInstance.post('/review');
}
export const getReviews= () =>{
    return axiosInstance.get('/reviews');
}