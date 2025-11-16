
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import api from '../services/api';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setError('لطفاً تمام فیلدها را پر کنید.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      const orderData = {
        cart: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
        user: formData,
        total: totalPrice(),
      };
      
      const response = await api.postOrder(orderData);
      
      if (response.success) {
        alert(`سفارش شما با شماره ${response.orderId} با موفقیت ثبت شد!`);
        clearCart();
        navigate('/');
      } else {
        setError('خطایی در ثبت سفارش رخ داد. لطفاً دوباره تلاش کنید.');
      }
    } catch (err) {
      setError('خطای سرور. لطفاً بعداً تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) {
      return (
          <div className="text-center p-10">
              <h1 className="text-2xl">سبد خرید شما برای پرداخت خالی است.</h1>
              <button onClick={() => navigate('/')} className="mt-4 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded">بازگشت به فروشگاه</button>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div className="lg:col-span-3 bg-gray-800 p-8 rounded-lg">
        <h1 className="text-3xl font-extrabold mb-6">اطلاعات پرداخت</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">نام و نام خانوادگی</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-yellow-500 focus:border-yellow-500" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">شماره تماس</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-yellow-500 focus:border-yellow-500" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">آدرس کامل</label>
            <textarea id="address" name="address" rows={4} value={formData.address} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-yellow-500 focus:border-yellow-500" required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-400 transition-colors disabled:bg-gray-600">
            {isSubmitting ? 'در حال ثبت سفارش...' : 'پرداخت و ثبت نهایی'}
          </button>
        </form>
      </div>
      <div className="lg:col-span-2 bg-gray-800 p-8 rounded-lg self-start">
        <h2 className="text-2xl font-bold mb-6">خلاصه سفارش</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-gray-300">
              <span>{item.name} <span className="text-xs text-gray-400">(x{item.quantity})</span></span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex justify-between text-xl font-bold">
          <span>جمع کل</span>
          <span>{formatPrice(totalPrice())}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
