import { getAllProducts } from "../api/products"

export const getproductsService = async () =>{
    const response= await getAllProducts();
    return response.data;
}