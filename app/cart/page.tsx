"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 flex-wrap">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-400">{formatPrice(item.price)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
        <div className="flex items-center border border-gray-600 rounded-md">
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-700 transition-colors">+</button>
          <span className="px-4">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-700 transition-colors">-</button>
        </div>
        <p className="font-bold text-lg w-32 text-center">{formatPrice(item.price * item.quantity)}</p>
        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { items, totalPrice, totalItems } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="text-center text-xl">در حال بارگذاری سبد خرید...</div>;
  }

  if (totalItems() === 0) {
    return (
      <div className="text-center bg-gray-800 p-10 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">سبد خرید شما خالی است</h1>
        <p className="text-gray-400 mb-6">به نظر می‌رسد هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.</p>
        <Link href="/" className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }
  
  const formatTotalPrice = new Intl.NumberFormat('fa-IR').format(totalPrice()) + ' تومان';

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold mb-6 border-b border-gray-700 pb-4">سبد خرید</h1>
      <div>
        {items.map(item => <CartItemRow key={item.id} item={item} />)}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>جمع کل:</span>
            <span>{formatTotalPrice}</span>
          </div>
          <Link href="/checkout" className="block w-full text-center bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 transition-colors">
            ادامه فرآیند خرید
          </Link>
        </div>
      </div>
    </div>
  );
};
