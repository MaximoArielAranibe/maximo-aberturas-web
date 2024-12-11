import React, { createContext, useContext, useState } from "react";
import data from "../mocks/data.json"; // Asegúrate de que la ruta sea correcta

const ProductsContext = createContext([]);

const ProductsProvider = ({ children }) => {
  // Inicializa el estado con los productos del JSON directamente
  const [products, setProducts] = useState(data);


  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
