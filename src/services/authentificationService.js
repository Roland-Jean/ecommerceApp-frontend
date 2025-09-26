import { loginUser } from "../api/auth"

export const loginService = (user) =>{
    return loginUser(user.email,user.password)
}
export const logoutService=()=>{
    return 
}
export const registerUserService = () =>{
    return 
}