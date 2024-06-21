import 'normalize.css';
import Main from './components/Main.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import Navbar from './components/Navbar.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Navbar />
        <Routes>
          <Route exact
            path='/'
            errorElement={<ErrorPage />}
            element={<Main />}
          />

          <Route
            path='/navbar'
            errorElement={<ErrorPage />}
          />
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default App;
