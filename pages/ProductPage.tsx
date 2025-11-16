
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.getProductById(parseInt(id, 10));
        setProduct(data || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (loading) {
    return <div className="text-center text-2xl mt-20">در حال بارگذاری...</div>;
  }

  if (!product) {
    return <div className="text-center text-2xl mt-20 text-red-500">محصول مورد نظر یافت نشد.</div>;
  }

  return (
    <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img src={product.image_url} alt={product.name} className="w-full h-auto rounded-lg object-cover shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{product.name}</h1>
          <p className="text-gray-300 text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <p className="text-3xl font-bold text-yellow-400">{formatPrice(product.price)}</p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${product.stock_quantity > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {product.stock_quantity > 0 ? `موجود (${product.stock_quantity} عدد)` : 'ناموجود'}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock_quantity === 0}
            className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {product.stock_quantity > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
