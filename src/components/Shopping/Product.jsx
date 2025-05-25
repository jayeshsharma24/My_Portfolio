import React from 'react'
import { products } from '../../assets/Products'
import ProductCards from '../Shopping/ProductCards'

const Product = () => {
 
  
  return (
    <div>
      <h1 name='Products' className='text-2xl sm:text-3xl my-5 lg:text-5xl font-bold text-white flex justify-center'>List Products</h1>
      <div className=' grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-5 justify-items-center'>
          {products.map((product, key) => 
              <ProductCards key={key} data={product}/>
          )}
      </div>
  </div>
  )
}

export default Product
