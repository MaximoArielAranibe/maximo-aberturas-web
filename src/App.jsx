import { ProductsProvider } from './context/ProductsProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Category from './components/Category.jsx';
import Cart from './components/Cart.jsx'
import CartProvider from './context/CartProvider.jsx';
import { ToastContainer } from 'react-toastify';
import SvgWhatsapp from './components/icons/SvgWhatsapp.jsx';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <SvgWhatsapp />
          <Routes>
            <Route
              path='/'
              element={<Main />}
            />
            <Route
              path='/categoria/:categoryName'
              element={<Category />}
            />

            <Route
              path='/cart'
              element={<Cart />}
            />

            <Route path="*" element={<ErrorPage />} />

          </Routes>
          <ToastContainer autoClose={1000} />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default App;
