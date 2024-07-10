import React from 'react'
import useProducts from '../hooks/useProducts';

const Items = () => {
  const products = useProducts();

  return (
    <section className="cards">
    {products.map(({ title, price, description, image }, index) => (
      <div className="card" key={index}>
        <img src={image} alt={title} />
        <div className="card-content">
          <h1>{title}</h1>
          <p className="subtitle">Road Running Shoes</p>
          <p className="description">{description}</p>
          <p className="price">${price}</p>
          <div className="buttons">
            <button className="favorite">Favourite ♥</button>
            <button className="add-to-bag">Add to Bag</button>
          </div>
        </div>
      </div>
    ))}
  </section>
  )
}
export default Items;