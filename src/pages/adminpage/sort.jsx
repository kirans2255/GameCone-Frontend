import React, { useState, useEffect } from 'react';
import {sort} from '../../services/admin/login'

const ProductPages = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('priceLowToHigh'); 

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  const fetchProducts = async () => {
    try {
      const response = await sort() ;
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <h1>Products</h1>
      <select onChange={handleSortChange} value={sortOrder}>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="nameAtoZ">Name: A-Z</option>
        <option value="nameZtoA">Name: Z-A</option>
      </select>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPages;
