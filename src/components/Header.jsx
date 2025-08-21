import { Link } from "react-router-dom";
export default function Header(){
    return(
        <>
        <header>
          <div>
            <div><h1>Ecommerce App</h1></div>
            <div>
              <input type="text" placeholder="Search products..." />
            </div>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
          </div>
          <div>
            
          </div>
        </header>
        </>
    );
}