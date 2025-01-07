import React from 'react'
import { useParams } from 'react-router-dom'
import Products from './Products';

const Category = () => {

  const { categoryName } = useParams();


  return (
    <Products category={categoryName}/>

  )
}

export default Category