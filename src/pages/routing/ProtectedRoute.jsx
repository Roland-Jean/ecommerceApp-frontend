import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // or useContext if using Context API

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
