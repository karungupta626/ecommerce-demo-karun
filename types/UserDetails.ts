export interface User {
  id: number;
  username: string;
  password: string;
}
export interface ITypes {
  productId: number;
  sold: any;
  data: any;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: (string)[] | null;
}
