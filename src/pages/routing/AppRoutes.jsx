import { Route,Routes } from "react-router-dom";
import Home from '../Home';
import Pagnie from "../Pagnie";
import Checkout from '../Checkout';
import Login from '../Login';
import Register from '../Register';
import ResetPassword from '../ResetPassword';
import ProductDetails from "../ProductDetail";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export default function AppRoutes({ searchItem, setAddCart,addCart }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home searchItem={searchItem} setAddCart={setAddCart} />}
      />
      {/* Add this */}
      <Route path="/cart" element={<Pagnie addCart={addCart} />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}