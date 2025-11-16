"use client";

import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    image: 'https://picsum.photos/seed/sale1/1200/500',
    title: 'تخفیف‌های شگفت‌انگیز جمعه سیاه',
    subtitle: 'تا ۷۰٪ تخفیف روی تمام محصولات!',
    link: '#products'
  },
  {
    image: 'https://picsum.photos/seed/sale2/1200/500',
    title: 'جدیدترین گجت‌ها رسیدند',
    subtitle: 'فرصت را برای خرید بهترین‌های تکنولوژی از دست ندهید.',
    link: '#products'
  },
  {
    image: 'https://picsum.photos/seed/sale3/1200/500',
    title: 'ارسال رایگان برای تمام سفارش‌ها',
    subtitle: 'فقط برای مدت محدود. همین حالا خرید کنید!',
    link: '#products'
  },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[50vh] max-h-[500px] rounded-lg overflow-hidden shadow-2xl mb-12">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-down">{slide.title}</h2>
                <p className="text-lg md:text-2xl mb-8 drop-shadow-md animate-fade-in-up">{slide.subtitle}</p>
                 <a href={slide.link} className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105">
                  مشاهده محصولات
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-yellow-400' : 'bg-gray-400/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
