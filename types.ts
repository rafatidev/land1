export interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
