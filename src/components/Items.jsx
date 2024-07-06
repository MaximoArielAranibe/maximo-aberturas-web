import React from 'react'
import useProducts from '../hooks/useProducts';

const Items = () => {
  const products = useProducts();

  return (
    <section>
      {products.map(({title,measure,description,price, avaiable,thumbnail}, index) => (

        <div key={index}>
          <h1>{title}</h1>
          <p>{measure}</p>
          <p>{description}</p>
          <p>{price}</p>
          <p>{avaiable}</p>
          <img src={thumbnail} />

        </div>
      ))}
    </section>
  )
}
export default Items;