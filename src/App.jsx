import { ProductsProvider } from './context/ProductsProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Carousel from './components/Carousel.jsx';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Navbar />
        <Routes>
          <Route exact
            path='/'
            element={<Main />}
            errorElement={<ErrorPage />}
          />

          <Route
            path='/navbar'
            element={<Navbar />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='/carousel'
            element={<Carousel />}
          />

        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default App;
