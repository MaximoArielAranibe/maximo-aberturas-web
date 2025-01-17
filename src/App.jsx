import { ProductsProvider } from './context/ProductsProvider.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Category from './components/Category.jsx';
import Cart from './components/Cart.jsx';
import CartProvider from './context/CartProvider.jsx';
import { ToastContainer } from 'react-toastify';
import SvgWhatsapp from './components/icons/SvgWhatsapp.jsx';
import Footer from './components/Footer.jsx';
import { useEffect } from 'react';

// Componente que maneja el scroll al principio de la página
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });// Desplazarse al top cada vez que la ruta cambia
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <SvgWhatsapp />

          <ScrollToTop /> {/* Agregamos el componente ScrollToTop aquí */}

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/categoria/:categoryName' element={<Category />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <Footer />
          <ToastContainer autoClose={1000} />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
