import React from 'react'
import "./FeacturedProducts.css"
import ProductCard from '../Products/ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from '../Products/ProductCardSkeleton'
const FeacturedProducts = () => {
 const{data,error,isLoading}= useData("/products/featured")
 const  skeletons =[1,2,3]
 return (
   <section className="featured_products">
    <h2>Featured Products</h2>
    <div className='align_center featured_products_list'>
        {error && <em className="form_error">{error}</em>}
         {data &&
          data.map((product) => (
            <ProductCard
              key={product._id}
              
             product={product}
            />
          ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}

    </div>
   </section>
  )
}

export default FeacturedProducts
