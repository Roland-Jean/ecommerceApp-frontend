import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AppRoutes from './pages/routing/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter basename='/ecommerceApp-frontend'>
    <Header/>
    <main>
      <AppRoutes/>
    </main>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
