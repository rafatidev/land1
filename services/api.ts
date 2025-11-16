import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'گوشی هوشمند مدل جدید',
    price: 25000000,
    stock_quantity: 15,
    image_url: 'https://picsum.photos/seed/phone/600/600',
    description: 'آخرین مدل گوشی هوشمند با دوربین فوق‌العاده، پردازنده قدرتمند و صفحه نمایش بی‌نظیر. تجربه‌ای متفاوت از تکنولوژی را با این دستگاه شگفت‌انگیز داشته باشید.'
  },
  {
    id: 2,
    name: 'لپ‌تاپ گیمینگ حرفه‌ای',
    price: 78000000,
    stock_quantity: 8,
    image_url: 'https://picsum.photos/seed/laptop/600/600',
    description: 'لپ‌تاپی برای گیمرهای واقعی. با کارت گرافیک RTX سری ۴۰، پردازنده نسل ۱۳ اینتل و ۱ ترابایت حافظه SSD، هیچ بازی‌ای برای شما چالش‌برانگیز نخواهد بود.'
  },
  {
    id: 3,
    name: 'هدفون بی‌سیم با نویز کنسلینگ',
    price: 8500000,
    stock_quantity: 30,
    image_url: 'https://picsum.photos/seed/headphones/600/600',
    description: 'در دنیای موسیقی غرق شوید. این هدفون با قابلیت حذف نویز فعال و کیفیت صدای استثنایی، بهترین همراه شما در سفر و کار خواهد بود.'
  },
  {
    id: 4,
    name: 'ساعت هوشمند ورزشی',
    price: 12000000,
    stock_quantity: 22,
    image_url: 'https://picsum.photos/seed/watch/600/600',
    description: 'سلامتی خود را رصد کنید. این ساعت هوشمند با سنسورهای دقیق ضربان قلب، اکسیژن خون و GPS، تمام فعالیت‌های ورزشی شما را ثبت می‌کند.'
  },
  {
    id: 5,
    name: 'دوربین دیجیتال میرورلس',
    price: 110000000,
    stock_quantity: 5,
    image_url: 'https://picsum.photos/seed/camera/600/600',
    description: 'عکاسی حرفه‌ای در دستان شما. این دوربین بدون آینه با سنسور فول‌فریم و قابلیت فیلم‌برداری 4K، لحظات شما را با کیفیتی بی‌همتا ثبت می‌کند.'
  },
  {
    id: 6,
    name: 'کنسول بازی نسل نهم',
    price: 32000000,
    stock_quantity: 12,
    image_url: 'https://picsum.photos/seed/console/600/600',
    description: 'به نسل جدید بازی‌های ویدیویی خوش آمدید. با قدرت پردازشی فوق‌العاده و زمان بارگذاری صفر، تجربه‌ای بی‌وقفه از سرگرمی را به شما هدیه می‌دهد.'
  }
];

const api = {
  getProducts: (): Promise<Product[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 500);
    });
  },

  getProductById: (id: number): Promise<Product | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  },

  postOrder: (order: { cart: any[], user: any }): Promise<{ success: boolean; orderId: number }> => {
    console.log('Posting order:', order);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, orderId: Math.floor(Math.random() * 10000) });
      }, 1000);
    });
  }
};

export default api;
