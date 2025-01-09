export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  rating: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: 'shoes' | 'clothing' | 'accessories' | 'electronics';
  year?: number;
  seller: string;
  registrationDate: Date;
  description: string;
  comments: Comment[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

