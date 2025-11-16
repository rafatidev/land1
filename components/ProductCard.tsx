
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <img src={product.image_url} alt={product.name} className="w-full h-56 object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2 flex-grow">
          <Link to={`/products/${product.id}`} className="hover:text-yellow-400 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-xl font-bold text-yellow-400 mb-4">{formatPrice(product.price)}</p>
        <button
          onClick={() => addItem(product)}
          className="mt-auto w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
