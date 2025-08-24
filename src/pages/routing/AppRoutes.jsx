import { Route,Routes } from "react-router-dom";
import Home from '../Home';
import Pagnie from "../Pagnie";
import Checkout from '../Checkout';
import Login from '../Login';
import Register from '../Register';
import ResetPassword from '../ResetPassword';
import ProductDetails from "../ProductDetail";

export default function AppRoutes(){
     return(
             <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/ecommerceApp-frontend/" element={<Home />} />  {/* Add this */}
                 <Route path="/cart" element={<Pagnie />} />
                 <Route path="/checkout" element={<Checkout />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                 <Route path="/details" element={<ProductDetails />} />
                 <Route path="/resetpassword" element={<ResetPassword />} />
             </Routes>
     );
}