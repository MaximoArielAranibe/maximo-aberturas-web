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
import Description from './components/Description.jsx';
import { Analytics } from "@vercel/analytics/react"

// Componente que maneja el scroll al principio de la página
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Rutas específicas donde no queremos scroll suave
    const ignoreSmoothScroll = ['/categoria/ventanas', '/categoria/portones', '/categoria/puertas'];
    const isSmooth = !ignoreSmoothScroll.includes(location.pathname);

    // Si la navegación incluye "ignoreScroll", no hacemos scroll al top
    if (location.state?.ignoreScroll) return;

    window.scrollTo({
      top: 0,
      behavior: isSmooth ? 'smooth' : 'auto', // Determina el tipo de scroll según la ruta
    });
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
            <Route path="/descripcion/:id" element={<Description />} />
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
