import React, { createContext, useContext, useState } from "react";
import data from "../mocks/data.json"; // Asegúrate de que la ruta sea correcta

const ProductsContext = createContext([]);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(data.flatMap(categoria => {
    const categoriaName = Object.keys(categoria)[0];
    return categoria[categoriaName].map(producto => ({
      ...producto,
      categoria: categoriaName,
    }));
  }));

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
