import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './pages/routing/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { useState } from 'react';

function App() {
  const[searchItem,setSearchItem]=useState([]);
  const[addCart,setAddCart] = useState([]);
  const[allProducts,setAllProducts] =useState([]);
  return (
    <div>
      <BrowserRouter basename="/ecommerceApp-frontend">
        <Header setSearchItem={setSearchItem} addCart={addCart} setAllProducts={setAllProducts} />
        <AppRoutes
          searchItem={searchItem}
          setAddCart={setAddCart}
          addCart={addCart}
          allProducts={allProducts}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
