import { ProductsProvider } from './context/ProductsProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Category from './components/Category.jsx';
import Cart from './components/Cart.jsx'
import CartProvider from './context/CartProvider.jsx';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>

        <Navbar />
        <Routes>
          <Route exact
            path='/'
            element={<Main />}
            errorElement={<ErrorPage />}
            />
          <Route
            path='/categoria/:categoryName'
            element={<Category />}
            errorElement={<ErrorPage />}
            />

          <Route
            path='/cart'
            element={<Cart />}
            errorElement={<ErrorPage />}
            />
        </Routes>
            </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default App;
