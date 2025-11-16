
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Slider />
      
      <section id="products">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-yellow-400">محصولات ویژه</h2>
        {loading ? (
          <div className="text-center text-xl">در حال بارگذاری محصولات...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
