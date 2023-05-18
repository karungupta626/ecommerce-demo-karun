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


export interface User {
  id: number;
  firstName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  address: Address;
  company: Company;
  image: string;  
}
export interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}
export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}
