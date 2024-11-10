import React from 'react'
import "./Productspage.css"
import ProductsSidebar from './ProductsSidebar'
import ProductsList from './ProductsList'
const Productspage = () => {
  return (
    <section className='products_page'>
     <ProductsSidebar/>
    <ProductsList/>
    </section>
  )
}

export default Productspage
